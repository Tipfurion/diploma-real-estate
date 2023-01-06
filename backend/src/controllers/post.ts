import { Request, Response } from 'express'
import * as _ from 'lodash'
import db from '../../db/db'
import mediaService from '../services/media'
import { ExtendedRequest } from '../types/index'
const postController = {
    create: async (req: ExtendedRequest, res: Response) => {
        try {
            const post = JSON.parse(req.body.post)
            const user = req.user!
            const createdMedia = await mediaService.createMedia(Object.values(req.files ?? []))

            const createdPost = await db.post.create({
                data: { ...(_.omit(post, 'files') as any), owner: { connect: { id: user.id } } },
            })
            await db.media.createMany({
                data: createdMedia.map((media) => ({ url: media.url, postId: createdPost.id })) as any,
            })
            return res.json({
                error: null,
                data: createdPost,
            })
        } catch (err) {
            console.error('error', err)
            return res.status(500).json({
                error: {},
                data: null,
            })
        }
    },
    getOne: async (req: Request, res: Response) => {
        const id = Number(req.query.id)
        try {
            mediaService.createMedia([])
            const post = await db.post.findFirst({ where: { id }, include: { owner: true, media: true } })
            if (post) {
                post!.owner = _.omit(post!.owner as any, 'passwordHash') as any
            }
            return res.json({
                error: null,
                data: post,
            })
        } catch (err) {
            console.error('error', err)
            return res.status(500).json({
                error: {},
                data: null,
            })
        }
    },
    createComment: async (req: ExtendedRequest, res: Response) => {
        const user = req.user!
        const { replyToId, text, postId } = req.body
        try {
            if (replyToId) {
                const repliedComment = await db.comment.findFirst({ where: { id: replyToId } })
                if (!repliedComment) {
                    return res.status(400).json({
                        error: { message: 'Replied comment does not exists' },
                        data: null,
                    })
                }
                if (repliedComment.replyToId) {
                    return res.status(400).json({
                        error: { message: 'Cannot reply to reply' },
                        data: null,
                    })
                }
            }
            const createdCommentId = await db.comment
                .create({
                    data: {
                        text,
                        replyToId: replyToId ?? null,
                        post: { connect: { id: postId } },
                        owner: { connect: { id: user.id } },
                    },
                })
                .then((comment) => comment.id)
            const createdComment = await db.comment.findFirst({
                where: { postId, id: createdCommentId },
                include: { owner: { select: { id: true, name: true } } },
            })
            res.json({ data: createdComment, error: null })
        } catch (err) {
            console.error('error', err)
            return res.status(500).json({
                error: { err },
                data: null,
            })
        }
    },
    getComments: async (req: ExtendedRequest, res: Response) => {
        const postId = Number(req.query.postId)
        if (!postId) {
            return res.status(500).json({
                error: { message: 'requried postId' },
                data: null,
            })
        }
        try {
            const unstructuredComments = await db.comment.findMany({
                where: { postId },
                include: { owner: { select: { id: true, name: true } } },
            })
            const structuredComments: any[] = []
            unstructuredComments.forEach((comment) => {
                if (!comment.replyToId) {
                    structuredComments.push({ ...comment, replies: [] } as any)
                }
                if (comment.replyToId) {
                    structuredComments.find((el: any) => el.id === comment.replyToId).replies.push(comment)
                }
            })
            res.json({ data: structuredComments, error: null })
        } catch (err) {
            console.error('error', err)
            return res.status(500).json({
                error: {},
                data: null,
            })
        }
    },
}
export default postController

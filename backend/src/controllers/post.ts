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
            console.log('post', post)
            console.log('user', user)
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
}
export default postController

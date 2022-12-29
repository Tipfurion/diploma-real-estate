import { Request, Response } from 'express'
import * as _ from 'lodash'
import db from '../../db/db'
import { RequestWithUser } from '../types/index'
const postController = {
    create: async (req: RequestWithUser, res: Response) => {
        const post = req.body.post
        const user = req.user
        try {
            const createdPost = await db.post.create({
                data: { ...(_.omit(post, 'files') as any), owner: { connect: { id: user.id } } },
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
            const post = await db.post.findFirst({ where: { id }, include: { owner: true } })
            post!.owner = _.omit(post!.owner as any, 'passwordHash') as any
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

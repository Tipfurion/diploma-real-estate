import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'

import { authUtils } from './utils'

const SALT_ROUNDS = 10

const authService = {
    register: async (req: Request, res: Response) => {
        let { password, email } = req.body
        try {
            email = String(email).toLowerCase()
            if (!authUtils.validateEmail(email)) {
                return res.status(400).json({
                    error: { message: 'Неверный формат эл. почты' },
                    data: null,
                })
            }
            if (!authUtils.validatePassword(password)) {
                return res.status(400).json({
                    error: { message: 'Пароль должен быть больше 6 символов' },
                    data: null,
                })
            }
            const salt = bcrypt.genSaltSync(SALT_ROUNDS)
            const hash = bcrypt.hashSync(password, salt)
            const alreadyExists = (
                await db('users').select(['email']).where({ email })
            ).length
            if (alreadyExists) {
                return res.status(400).json({
                    error: { message: 'Аккаунт с такой почтой уже существует' },
                    data: null,
                })
            }
            const name = email
            const nickname = email
            const id = authUtils.genUserId()
            const imgUrl = authUtils.genImgUrl(name)
            await db('users').insert({
                id,
                name,
                nickname,
                email,
                password_hash: hash,
                img_url: imgUrl,
                created_at: db.fn.now(),
                utm_source: utmSource,
            })
            return res.json({ message: 'ok' })
        } catch (err) {
            return res.status(500).json({
                error: { message: 'internal server error' },
                data: null,
            })
        }
    },
    login: async (req: Request, res: Response) => {
        let { password, email } = req.body
        try {
            email = String(email).toLowerCase()
            if (!authUtils.validateEmail(email)) {
                return res.status(400).json({
                    error: { message: 'Неверный формат эл. почты' },
                    data: null,
                })
            }
            if (!authUtils.validatePassword(password)) {
                return res.status(400).json({
                    error: { message: 'Пароль должен быть больше 6 символов' },
                    data: null,
                })
            }
            const user = await db('users')
                .select([
                    'id',
                    'name',
                    'nickname',
                    'img_url',
                    'password_hash',
                    'email',
                ])
                .where({ email })
                .first()
            if (!user) {
                return res.status(403).json({
                    error: { message: 'Неверная почта' },
                    data: null,
                })
            }
            if (!user.password_hash) {
                return res.status(400).json({
                    error: {
                        message: `Ваш пароль не подходит! Нажмите на ссылку «Не помню пароль», чтобы зайти в систему.   
                    Внимание! Пароли, созданные до 18 марта 2022 года, нужно изменить, так как мы заменили систему авторизации.`,
                    },
                    data: null,
                })
            }
            if (bcrypt.compareSync(password, user.password_hash)) {
                const token = jwt.sign(
                    {
                        sub: user.id,
                        name: user.name,
                        nickname: user.nickname,
                        email: user.email,
                        imgUrl: user.img_url,
                    },
                    process.env.JWT_PRIVATE_KEY as string,
                    {
                        expiresIn: process.env.JWT_EXPIRES_IN,
                    }
                )
                res.json({ error: null, data: { token } })
            } else {
                res.status(403).json({
                    error: { message: 'Неверный пароль' },
                    data: null,
                })
            }
        } catch (err) {
            return res.status(500).json({
                error: { message: 'internal server error' },
                data: null,
            })
        }
    },
    resetPassword: async (req: Request, res: Response) => {
        let { email } = req.body
        try {
            email = String(email).toLowerCase()
            if (!authUtils.validateEmail(email)) {
                return res.status(400).json({
                    error: { message: 'Неверный формат эл. почты' },
                    data: null,
                })
            }
            const { id: userId } =
                (await db('users').select(['id']).where({ email }).first()) ||
                {}
            if (!userId) {
                return res.status(403).json({
                    error: { message: 'Неверная почта' },
                    data: null,
                })
            }
            const newPassword = authUtils.generatePassword()
            const salt = bcrypt.genSaltSync(SALT_ROUNDS)
            const hash = bcrypt.hashSync(newPassword, salt)
            await db('users')
                .update({ password_hash: hash })
                .where({ id: userId })

            return res.status(200).json({
                error: null,
                data: { message: 'ok' },
            })
        } catch (err) {
            return res.status(500).json({
                error: { message: 'internal server error' },
                data: null,
            })
        }
    },
    changePassword: async (req: Request, res: Response) => {
        let { userId, password, newPassword } = req.body
        try {
            if (!userId) {
                return res.status(403).json({
                    error: { message: 'Неверная почта' },
                    data: null,
                })
            }
            const { password_hash: pwdHash } = await db('users')
                .where({
                    id: userId,
                })
                .first()
            if (bcrypt.compareSync(password, pwdHash)) {
                if (!authUtils.validatePassword(newPassword)) {
                    return res.status(400).json({
                        error: {
                            message:
                                'Новый пароль должен быть больше 6 символов',
                        },
                        data: null,
                    })
                }
                const salt = bcrypt.genSaltSync(SALT_ROUNDS)
                const newPwdHash = bcrypt.hashSync(newPassword, salt)
                await db('users')
                    .update({ password_hash: newPwdHash })
                    .where({ id: userId })
                return res.json({ error: null, data: { message: 'ok' } })
            } else {
                return res.status(403).json({
                    error: { message: 'Неверый пароль' },
                    data: null,
                })
            }
        } catch (err) {
            return res.status(500).json({
                error: { message: 'internal server error' },
                data: null,
            })
        }
    },
    me: async (req: Request, res: Response) => {
        try {
            const authHeader = req.headers['authorization']
            const token = authHeader!.replace('Bearer ', '')
            if (token) {
                try {
                    const decoded = jwt.verify(
                        token,
                        process.env.JWT_PRIVATE_KEY as string
                    )
                    const user = decoded
                    res.status(200).json({ error: null, data: user })
                } catch (err) {
                    res.status(403).json({
                        error: { message: 'invalid token' },
                        data: null,
                    })
                }
            } else {
                res.status(400).json({
                    error: { message: 'token is undefined' },
                    data: null,
                })
            }
        } catch (err) {
            return res.status(500).json({
                error: { message: 'internal server error' },
                data: null,
            })
        }
    },
    logOut: (req: Request, res: Response) => {
        res.json({ error: null, data: { message: 'ok' } })
    },
}
export default authService

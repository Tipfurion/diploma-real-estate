import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import * as _ from 'lodash'
import validate from '../services/validator'
import db from '../../db/db'
import { omit, omitBy } from 'lodash'
const SALT_ROUNDS = 10

const authController = {
    register: async (req: Request, res: Response) => {
        try {
            let { password, repeatedPassword, phone } = req.body
            if (!password || !phone || !repeatedPassword) {
                return res.status(400).json({
                    error: { message: 'Неверные параметры' },
                    data: null,
                })
            }
            if (password !== repeatedPassword) {
                return res.status(400).json({
                    error: { message: 'Пароли не совпадают' },
                    data: null,
                })
            }

            if (!validate.phone(phone)) {
                return res.status(400).json({
                    error: { message: 'Не валидный номер телефона' },
                    data: null,
                })
            }
            if (!validate.password(password)) {
                return res.status(400).json({
                    error: { message: 'Пароль должен быть больше 6 символов' },
                    data: null,
                })
            }
            const salt = bcrypt.genSaltSync(SALT_ROUNDS)
            const hash = bcrypt.hashSync(password, salt)
            const alreadyExists = await db.user.findFirst({
                where: { phoneNumber: phone },
            })

            if (alreadyExists) {
                return res.status(400).json({
                    error: { message: 'Номер телефона занят' },
                    data: null,
                })
            }
            const user = await db.user.create({
                data: { passwordHash: hash, phoneNumber: phone },
            })
            const token = jwt.sign(_.omit(user, ['passwordHash']), process.env.JWT_PRIVATE_KEY as string, {
                expiresIn: process.env.JWT_EXPIRES_IN,
            })
            return res.json({
                error: null,
                data: { token },
            })
        } catch (err) {
            return res.status(500).json({
                error: { message: 'internal server error' },
                data: null,
            })
        }
    },
    login: async (req: Request, res: Response) => {
        let { password, phone } = req.body
        if (!password || !phone) {
            return res.status(400).json({
                error: { message: 'Неверные параметры' },
                data: null,
            })
        }
        try {
            if (!validate.phone(phone)) {
                return res.status(400).json({
                    error: { message: 'Не валидный номер телефона' },
                    data: null,
                })
            }
            if (!validate.password(password)) {
                return res.status(400).json({
                    error: { message: 'Пароль должен быть больше 6 символов' },
                    data: null,
                })
            }
            const user = await db.user.findFirst({ where: { phoneNumber: phone } })
            if (!user) {
                return res.status(403).json({
                    error: { message: 'Неверный телефон' },
                    data: null,
                })
            }

            if (bcrypt.compareSync(password, user.passwordHash)) {
                const token = jwt.sign(_.omit(user, ['passwordHash']), process.env.JWT_PRIVATE_KEY as string, {
                    expiresIn: process.env.JWT_EXPIRES_IN,
                })
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
    me: async (req: Request, res: Response) => {
        try {
            const authHeader = req.headers['authorization']
            const token = authHeader!.replace('Bearer ', '')

            if (token) {
                try {
                    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY as string)
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
}
export default authController

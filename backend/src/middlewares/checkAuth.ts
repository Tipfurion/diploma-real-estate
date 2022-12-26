import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    if (!authHeader) {
        return res.status(403).json({
            error: { message: 'invalid token' },
            data: null,
        })
    }
    const token = authHeader.replace('Bearer ', '')
    jwt.verify(token, process.env.JWT_PRIVATE_KEY as string, (error: any, decode: any) => {
        if (error) {
            return res.status(403).json({
                error: { message: 'invalid token' },
                data: null,
            })
        } else {
            const decodedToken = jwt.decode(token)
            req.user = decodedToken as any
            next()
        }
    })
}

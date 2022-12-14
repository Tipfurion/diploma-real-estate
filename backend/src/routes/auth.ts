import express from 'express'
import authController from '../controllers/auth'
const router = express.Router()

router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/me', authController.me)
//router.post('/resetPassword', authController.resetPassword)
//router.post('/changePassword', authController.changePassword)

export default router

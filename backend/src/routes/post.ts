import express from 'express'
import postController from '../controllers/post'
import { checkAuth } from '../middlewares/checkAuth'
const router = express.Router()

router.post('/', checkAuth, postController.create)
router.get('/get-one', postController.getOne)

export default router

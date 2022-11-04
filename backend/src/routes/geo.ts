import express from 'express'
import geoController from '../controllers/geo'
const router = express.Router()

router.get('/address/suggest', geoController.getAddressSuggestions)

export default router

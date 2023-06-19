import { Router } from 'express'
import { byDevice, byLink } from '../controllers/photoControllers.js'
import multer from 'multer'

const router = Router()
const photosMiddleware = multer({dest: 'uploads'})

router.post("/uploaded-by-link", byLink)
router.post("/uploaded-by-device", photosMiddleware.array('photos', 100), byDevice)//middleware para manejar datos multipart/form-data para cargar archivos

export default router
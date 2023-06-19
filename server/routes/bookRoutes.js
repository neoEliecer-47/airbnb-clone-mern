import { Router } from 'express'
import { requireUserToken } from '../middlewares/requireUserToken.js'
import { bookPlace, getBookedPlaces } from '../controllers/bookControllers.js'

const router = Router()

router.get("/books", requireUserToken, getBookedPlaces)//get data here (bookings)
router.post("/books", requireUserToken, bookPlace)//book a place

export default router
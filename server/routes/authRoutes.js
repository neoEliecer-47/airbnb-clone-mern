import { Router } from "express"
import { login, logout, profileInfo, register } from "../controllers/authControllers.js"
import { requireUserToken } from "../middlewares/requireUserToken.js"

const router = Router()

router.get("/profile", requireUserToken, profileInfo)
router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)

export default router
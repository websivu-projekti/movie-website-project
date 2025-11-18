import { Router } from "express"
import { register, login, getProfile, authenticateToken } from "../controllers/auth_controller.js"

const authRouter = Router()

// Public routes
authRouter.post("/register", register)
authRouter.post("/login", login)

// Protected routes (require authentication)
authRouter.get("/profile", authenticateToken, getProfile)

export default authRouter
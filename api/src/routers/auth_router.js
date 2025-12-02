import { Router } from "express"
import { register, login, getProfile, authenticateToken, deleteAccount } from "../controllers/auth_controller.js"

const authRouter = Router()

// Yleiset reitit
authRouter.post("/register", register)
authRouter.post("/login", login)

// Yksityiset reitit (vaatii autentikaation)
authRouter.get("/profile", authenticateToken, getProfile)
authRouter.delete("/account", authenticateToken, deleteAccount)

export default authRouter
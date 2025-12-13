import { Router } from "express"
import { register, login, getProfile, getAnotherUser, authenticateToken, deleteAccount, changePassword } from "../controllers/auth_controller.js"

const authRouter = Router()

// Yleiset reitit
authRouter.post("/register", register)
authRouter.post("/login", login)

//toinen käyttäjäprofiili
authRouter.get("/profile/:userId", getAnotherUser)

// Yksityiset reitit (vaatii autentikaation)
authRouter.get("/profile", authenticateToken, getProfile)
authRouter.delete("/account", authenticateToken, deleteAccount)
authRouter.patch("/editprofile", authenticateToken, changePassword)

export default authRouter
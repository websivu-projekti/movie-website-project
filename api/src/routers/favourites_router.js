import { Router } from "express"
import { getFavourites, addToFavourites, removeFromFavourites, checkFavourite } from "../controllers/favourites_controller.js"
import { authenticateToken } from "../controllers/auth_controller.js"

const favouritesRouter = Router()

favouritesRouter.get("/", authenticateToken, getFavourites)
favouritesRouter.post("/add", authenticateToken, addToFavourites)
favouritesRouter.delete("/remove", authenticateToken, removeFromFavourites)
favouritesRouter.get("/check", authenticateToken, checkFavourite)

export default favouritesRouter

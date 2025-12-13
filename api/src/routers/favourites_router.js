import { Router } from "express"
import { getFavourites, getUsersFavourites, addToFavourites, removeFromFavourites, checkFavourite } from "../controllers/favourites_controller.js"
import { authenticateToken } from "../controllers/auth_controller.js"

const favouritesRouter = Router()

favouritesRouter.get("/", authenticateToken, getFavourites)
favouritesRouter.get("/:userId", getUsersFavourites)
favouritesRouter.post("/add", authenticateToken, addToFavourites)
favouritesRouter.delete("/remove", authenticateToken, removeFromFavourites)
favouritesRouter.get("/check", authenticateToken, checkFavourite)

export default favouritesRouter

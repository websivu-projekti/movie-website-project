import { Router } from "express"
import { getFavourites, getUsersFavourites, addToFavourites, removeFromFavourites, checkFavourite } from "../controllers/favourites_controller.js"
import { authenticateToken } from "../controllers/auth_controller.js"
import SharedFavouritesLink from "../components/SharedFavouritesLink.jsx" 

const favouritesRouter = Router()

favouritesRouter.get("/", authenticateToken, getFavourites)
favouritesRouter.get("/:userId", getUsersFavourites)
favouritesRouter.post("/add", authenticateToken, addToFavourites)
favouritesRouter.delete("/remove", authenticateToken, removeFromFavourites)
favouritesRouter.get("/check", authenticateToken, checkFavourite)

favouritesRouter.get("/shared/:userId", async (req, res) => {
    try {
        const userId = req.params.userId

        const favourites = await getSharedFavourites(userId)

        return res.status(200).json({ userId, favourites })
    } catch (error) {
        console.error("Error in shared favourites:", error)
        return res.status(500).json({ message: "Server error" })
    }
})

export default favouritesRouter

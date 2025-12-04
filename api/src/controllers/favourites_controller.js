import { getUserFavourites, addFavourite, removeFavourite, isFavourited } from "../models/favourites_model"

// Get users favourites movies
export async function getFavorites(req, res) {
    try {
        const userId = req.user.userId
        const favourites = await getUserFavourites(userId)

        res.json({
            favourties: favourites
        })
    } catch (error) {
        console.error("Get favourites error:", error)
        res.status(500).json({ error: "Failed to fetch favourite movies" })
    }
}

// Add Movies to favouritelist
export async function addToFavorites(req, res) {
    try {
        const userId = req.user.userId
        const { contentId } = req.body

        if (!contentId) {
            return res.status(400).json({ error: "Content ID is required (add error)" })
        }

        const alreadyFavorited = await isFavourited(userId, contentId)
        if (alreadyFavorited) {
            return res.status(400).json({ error: "Already in favourites" })
        }

        const favourite = await addFavourite(userId, contentId)

        res.status(201).json({
            message: "Added to favourites",
            favourite: favourite
        })
    } catch (error) {
        consoler.error("Add favourite error:", error)
        res.status(500).json({error: "Failed to add movie to favouritelist" })
    }
}

export async function removeFromFavorites(req, res) {
    try {
        const userId = req.user.userId
        const { contentId } = req.body

        if (!contentId) {
            return res.status(400).json({ error: "Content ID is required (remove error)" })
        }

        const favourite = await removeFavourite(userId, contentId)

        if (!favourite) {
            return res.status(404).json({ error: "Favourite movie not found" })
        }

        res.json({
            message: "Movie removed from favouritelist",
            favourite: favourite
        })
    } catch (error) {
        console.error("Remove from favourite error:", error)
        res.status(500).json({ error: "Failed to remove from favouritelist" })
    }
}

export async function checkFavorite(req, res) {
    try {
        const userId = req.user.userId
        const { contentId } = req.query

        if (!contentId) {
            return res.status(400).json({ error: "Content ID is required (check error)" })
        }

        const favourited = await isFavourited(userId, contentId)

        res.json({
            isFavourited: favourited
        })
    } catch (error) {
        console.error("Check favourited error:", error)
        res.status(500).json({ error: "Failed to check favourite movie from list" })
    }
}
import { getUserFavourites, addFavourite, removeFavourite, isFavourited } from "../models/favourites_model.js"
import pool from "../database.js"

// Get user's favourites movies
export async function getFavourites(req, res) {
    try {
        const userId = req.user.userId
        const favourites = await getUserFavourites(userId)

        res.json({
            favourites: favourites
        })
    } catch (error) {
        console.error("Get favourites error:", error)
        res.status(500).json({ error: "Failed to fetch favourite movies" })
    }
}

// Get another user's favourites
export async function getUsersFavourites(req, res) {
    try {
        const userId = req.params.userId
        const favourites = await getUserFavourites(userId)

        res.json({
            favourites: favourites
        })
    } catch (error) {
        console.error("Get favourites error:", error)
        res.status(500).json({ error: "Failed to fetch favourite movies" })
    }
}

// Add Movies to favouritelist
export async function addToFavourites(req, res) {
    try {
        const userId = req.user.userId
        const { contentId } = req.body

        console.log('Adding to favourites - userId:', userId, 'contentId:', contentId)

        if (!contentId) {
            return res.status(400).json({ error: "Content ID is required (add error)" })
        }

        const alreadyFavorited = await isFavourited(userId, contentId)
        console.log('Already favorited?', alreadyFavorited)
        
        if (alreadyFavorited) {
            return res.status(400).json({ error: "Already in favourites" })
        }

        const favourite = await addFavourite(userId, contentId)
        console.log('Successfully added favourite:', favourite)

        res.status(201).json({
            message: "Added to favourites",
            favourite: favourite
        })
    } catch (error) {
        console.error("Add favourite error:", error)
        console.error("Error details:", error.message, error.stack)
        res.status(500).json({error: "Failed to add movie to favouritelist" })
    }
}

export async function removeFromFavourites(req, res) {
    try {
        const userId = req.user.userId
        const { contentId, tmdbId } = req.body

        if (!contentId && !tmdbId) {
            return res.status(400).json({ error: "Content ID or tmdbId is required (remove error)" })
        }

        let resolvedContentId = contentId
        if (!resolvedContentId && tmdbId) {
            const contentRes = await pool.query(
                "SELECT content_id FROM content WHERE tmdb_id = $1",
                [tmdbId]
            )
            if (contentRes.rows.length === 0) {
                return res.status(404).json({ error: "Movie not found in database" })
            }
            resolvedContentId = contentRes.rows[0].content_id
        }

        const favourite = await removeFavourite(userId, resolvedContentId)

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

export async function checkFavourite(req, res) {
    try {
        const userId = req.user.userId
        const { contentId, tmdbId } = req.query

        if (!contentId && !tmdbId) {
            return res.status(400).json({ error: "Content ID or tmdbId is required (check error)" })
        }

        let resolvedContentId = contentId
        if(!resolvedContentId && tmdbId) {
            const contentRes = await pool.query(
                "SELECT content_id FROM content WHERE tmdb_id = $1",
                [tmdbId]
            )
            if (contentRes.rows.length === 0) {
                return res.json({ isFavourited: false})
            }
            resolvedContentId = contentRes.rows[0].content_id
        }
        const favourited = await isFavourited(userId, resolvedContentId)
        res.json({
            isFavourited: favourited,
            contentId: resolvedContentId
        })
    } catch (error) {
        console.error("Check favourited error:", error)
        res.status(500).json({ error: "Failed to check favourite movie from list" })
    }
}
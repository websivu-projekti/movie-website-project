import pool from "../database.js"

// Get favourites list
export async function getUserFavourites(userId) {
    try {
        const result = await pool.query(
            `SELECT f.favourites_id, c.* FROM favourites f
            JOIN content c ON f.content_id = c.content_id
            WHERE f.user_id = $1
            ORDER BY f.favourites_id DESC`,
            [userId]
        )
        return result.rows
    } catch (error) {
        throw error
    }
}
// Add movie to favourites
export async function addFavourite(userId, contentId) {
    try {
        const result = await pool.query(
            `INSERT INTO favourites (user_id, content_id)
            VALUES ($1, $2)
            RETURNING *`,
            [userId, contentId]
        )
        return result.rows[0]
    } catch (error) {
        throw error
    }
}

// Remove movie from favourites
export async function removeFavourite(userId, contentId) {
    try {
        const result = await pool.query(
            `DELETE FROM favourites
            WHERE user_id = $1 AND content_id = $2
            RETURNING *`,
            [userId, contentId]
        )
        return result.rows[0]
    } catch (error) {
        throw error
    }
}

// Check if movie is already in favourites
export async function isFavourited(userId, contentId) {
    try {
        const result = await pool.query(
            `SELECT * FROM favourites
            WHERE user_id = $1 AND content_id = $2`,
            [userId, contentId]
        )
        return result.rows.length > 0
    } catch (error) {
        throw error
    }
}
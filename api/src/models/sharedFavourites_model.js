import pool from "../database.js"

export async function getSharedFavourites(userId) {
    try {
        console.log("Fetching shared favourites for userId:", userId) // Debug: näkee mikä userId tulee

        const result = await pool.query(
            `SELECT c.content_id, c.title, c.poster_url, c.release_year
             FROM favourites f
             JOIN content c ON f.content_id = c.content_id
             WHERE f.user_id = $1
             ORDER BY f.favourites_id DESC`,
            [userId]
        )

        console.log("DB result rows:", result.rows) // Debug: näkee mitä tietokanta palauttaa


        return result.rows.map(item => ({
            content_id: item.content_id,
            title: item.title,
            poster_url: item.poster_url,
            release_year: item.release_year
        }))

    } catch (error) {
        console.error("DB error in getSharedFavourites:", error)
        throw error
    }
}
import pool from "../database.js";

export async function createReview(user_id, content_id, review_text, rating){
    const result = await pool.query(
    "INSERT INTO review (user_id, content_id, review_text, rating) VALUES($1, $2, $3, $4) RETURNING *",
    [user_id, content_id, review_text, rating]
    )
    return result.rows[0]
}

//saa reviews näkyviin sivuilla
export async function showReviewsByContent(content_id){
    const result = await pool.query(
    `SELECT r.review_id, r.content_id, 
            TO_CHAR(r.review_date, 'YYYY-MM-DD') as date, 
            r.review_text as content, r.rating, 
            u.username, u.pfp_url as avatar
     FROM review r
     JOIN "user" u ON r.user_id = u.user_id
     WHERE r.content_id = $1 
     ORDER BY r.review_date DESC`,
    [content_id]
    )
    return result.rows
}


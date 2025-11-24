import pool from '../database.js'

export async function getAll() {
    const result = await pool.query("SELECT * FROM movielist");
    return result.rows
}

export async function getOne(id) {
    const result = await pool.query("SELECT * FROM movielist WHERE list_id = $1", [id]);
    return result.rows.length > 0 ? result.rows[0] : null
}

export async function addOne(content) {
    const result = await pool.query("INSERT INTO movielist (content_id) VALUES($1)", [content.id]);
    return result.rows
}

export async function deleteOne(id) {
    console.log("delete:"+id)
    const result = await pool.query("DELETE FROM movielist WHERE list_id = $1", [id]);
    return result.rows;
}
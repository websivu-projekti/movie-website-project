import pool from "../database.js";

export async function getAll() {
  const result = await pool.query("SELECT * FROM content");
  return result.rows; 
}

export async function getOne(id) {
  const result = await pool.query("SELECT * FROM content WHERE content_id = $1", [id]);
  return result.rows.length > 0 ? result.rows[0] : null;
}

export async function addOne(book) {
  const result = await pool.query("INSERT INTO content (content_id, title,release_year,genre,description, poster_url, content_type) VALUES($1,$2,$3,$4,$5,$6,$7)", [content.content_id, content.title,content.release_year,content.genre,content.description,content.poster_url,content.content_type]);
  return result.rows;
}

export async function updateOne(id,book) {
  console.log("update:"+id);
  const result = await pool.query("UPDATE book SET name=$1, author=$2, isbn=$3", [book.name, book.author,book.isbn]);
  return result.rows;
}

export async function deleteOne(id) {
  console.log("delete:"+id);
  const result = await pool.query("DELETE FROM book WHERE id = $1", [id]);
  return result.rows;
}

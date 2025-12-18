import pool from "../database.js";

export async function getAll() {
  const result = await pool.query("SELECT * FROM content");
  return result.rows; 
}

export async function getOne(id) {
  const result = await pool.query("SELECT * FROM content WHERE content_id = $1", [id]);
  return result.rows.length > 0 ? result.rows[0] : null;
}

// Näiden poistaminen/muuttaminen rikkoo jtn
// Apuva

//tää oli ennen kans book, mut nyt on movie/content. piti laittaa, jotta reviews saa myös toimimaan
export async function addOne(contentData) {
  const result = await pool.query(
    "INSERT INTO content (content_id, title, release_year, genre, description, poster_url, content_type) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *", 
    [contentData.content_id, contentData.title, contentData.release_year, contentData.genre, contentData.description, contentData.poster_url, contentData.content_type]
  );
  return result.rows[0];
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

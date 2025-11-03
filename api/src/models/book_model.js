import pool from "../database.js";

export async function getAll() {
  const result = await pool.query("SELECT * FROM book");
  return result.rows; 
}

export async function getOne(id) {
  const result = await pool.query("SELECT * FROM book WHERE id = $1", [id]);
  return result.rows.length > 0 ? result.rows[0] : null;
}

export async function addOne(book) {
  const result = await pool.query("INSERT INTO book (name,author,isbn) VALUES($1,$2,$3)", [book.name, book.author,book.isbn]);
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

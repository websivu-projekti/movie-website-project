import { getAll, getOne, addOne, updateOne, deleteOne } from "../models/movie_model.js";
import pool from "../database.js"

export async function getMovies(req, res, next) {
  try {
    const content = await getAll();
    res.json(content);
  } catch (err) {
    next(err);
  }
}

export async function getMovie(req, res, next) {
  try {
    const content = await getOne(req.params.id);
    if (!content) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.json(content);
  } catch (err) {
    next(err);
  }
}

export async function addMovie(req, res, next) {
  console.log("add called");
  try {
    console.log(req.body);
    const response = await addOne(req.body);
    res.json(response);
  } catch (err) {
    next(err);
  }
}

export async function updateMovie(req, res, next) {
  try {
    const response = await updateOne(req.params.id, req.body);
    res.json(response);
  } catch (err) {
    next(err);
  }
}

export async function deleteMovie(req, res, next) {
  try {
    const content = await deleteOne(req.params.id);
    if (!content) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.json(content);
  } catch (err) {
    next(err);
  }
}

export async function saveMovieFromTMDB(req, res, next) {
  try {
    const { tmdbId, title, releaseYear, genre, description, posterUrl, contentType } = req.body

    const existing = await pool.query(
      "SELECT * FROM content WHERE title = $1 AND release_year = $2",
      [title, releaseYear]
    )

    if (existing.rows.length > 0) {
      return res.json(existing.rows[0])
    }

    const result = await pool.query(
      `INSERT INTO content (title, release_year, genre, description, poster_url, content_type)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [title, releaseYear, genre, description, posterUrl, contentType || 'movie']
    )

    res.json(result.rows[0])
  } catch (err) {
    next(err)
  }
}
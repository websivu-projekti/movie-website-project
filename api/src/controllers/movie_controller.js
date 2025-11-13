import { getAll, getOne, addOne, updateOne, deleteOne } from "../models/movie_model.js";

export async function getMovies(req, res, next) {
  try {
    const movies = await getAll();
    res.json(movies);
  } catch (err) {
    next(err);
  }
}

export async function getMovie(req, res, next) {
  try {
    const movie = await getOne(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.json(movie);
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
    const movie = await deleteOne(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.json(movie);
  } catch (err) {
    next(err);
  }
}
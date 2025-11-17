import { getAll, getOne, addOne, updateOne, deleteOne } from "../models/movie_model.js";

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

export async function getNowPlaying(req, res) {
  try {
    const apiKey = process.env.TMDB_API_KEY
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
    )
    const data = await response.json()
    res.json(data.results)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Error fetching movies" })
  }
}
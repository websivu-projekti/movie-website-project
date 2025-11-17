import { Router } from "express";
import { getMovies, getMovie, addMovie, updateMovie, deleteMovie, getNowPlaying } from "../controllers/movie_controller.js";

const movieRouter = Router();

movieRouter.get("/", getMovies);
movieRouter.get("/now-playing", getNowPlaying);
movieRouter.get("/:id", getMovie);
movieRouter.post("/", addMovie);
movieRouter.put("/:id", updateMovie);
movieRouter.delete("/:id", deleteMovie);

export default movieRouter;

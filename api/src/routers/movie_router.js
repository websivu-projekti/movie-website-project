import { Router } from "express";
import { getMovies, getMovie, addMovie, updateMovie, deleteMovie} from "../controllers/movie_controller.js";
import { getNowPlaying, getPopularFilms, getDiscover, getGenres } from "../controllers/movieApi_controller.js";

const movieRouter = Router();

movieRouter.get("/", getMovies);
movieRouter.get("/now-playing", getNowPlaying);
movieRouter.get("/popularFilms", getPopularFilms);
movieRouter.get("/discover", getDiscover);
movieRouter.get("/genres", getGenres);
movieRouter.get("/:id", getMovie);
movieRouter.post("/", addMovie);
movieRouter.put("/:id", updateMovie);
movieRouter.delete("/:id", deleteMovie);

export default movieRouter;
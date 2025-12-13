import { Router } from "express";
import { getMovies, getMovie, addMovie, updateMovie, deleteMovie, saveMovieFromTMDB} from "../controllers/movie_controller.js";
import { getNowPlaying, getPopularFilms, getDiscoverMovies, getDiscoverTV, getGenres, getLanguages, getMovieProviders, getTvProviders, getMovieDetails, getSeriesDetails, getMovieSearchresults, getTvSearchresults, getSeriesGenres } from "../controllers/movieApi_controller.js";

const movieRouter = Router();

movieRouter.get("/", getMovies);
movieRouter.get("/now-playing", getNowPlaying);
movieRouter.get("/popularFilms", getPopularFilms);

movieRouter.get("/movieDetails/:movieId", getMovieDetails);
// provider information is now included in /movieDetails/:movieId response
movieRouter.get("/seriesDetails/:seriesId", getSeriesDetails);
movieRouter.get("/moviesearch/:query", getMovieSearchresults);
movieRouter.get("/tvsearch/:query", getTvSearchresults);
movieRouter.get("/discovermovies/:params", getDiscoverMovies);
movieRouter.get("/discovertv/:params", getDiscoverTV);
movieRouter.get("/genres", getGenres);
movieRouter.get("/seriesgenres", getSeriesGenres);
movieRouter.get("/languages", getLanguages);
movieRouter.get("/movieproviders", getMovieProviders);
movieRouter.get("/tvproviders", getTvProviders);

movieRouter.get("/:id", getMovie);
movieRouter.post("/", addMovie);
movieRouter.put("/:id", updateMovie);
movieRouter.delete("/:id", deleteMovie);

movieRouter.post("/saveFromTMDB", saveMovieFromTMDB)



export default movieRouter;
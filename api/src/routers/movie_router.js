import { Router } from "express";
import { getMovies, getMovie, addMovie, updateMovie, deleteMovie } from "../controllers/book_controller.js";

const movieRouter = Router();

movieRouter.get("/", getMovies);
movieRouter.get("/:id", getMovie);
movieRouter.post("/", addMovie);
movieRouter.put("/:id", updateMovie);
movieRouter.delete("/:id", deleteMovie);

export default movieRouter;

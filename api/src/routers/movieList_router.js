import { Router } from 'express'
import { getList, getAllLists, addMovie, deleteMovie } from "../controllers/movieList_controller.js"

const movieListRouter = Router()

movieListRouter.get("/", getAllLists)
movieListRouter.get("/:id", getList)
movieListRouter.post("/", addMovie)
movieListRouter.delete("/:id", deleteMovie)

export default movieListRouter

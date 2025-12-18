import { getList, addMovie, deleteMovie } from '../models/movieList_model.js'

export async function getList(req, res, next) {
    try {
        const movielist = await getOne()
        res.json(movielist)
    } catch (err) {
        next(err)
    }
}

export async function getAllLists(req, res, next) {
    try {
        const movielist = await getAll()
        res.json(movielist)
    } catch (err) {
        next(err)
    }
}

export async function addMovie(req, res, next) {
    console.log("add called")
    try {
        console.log(req.body)
        const response = await addOne(req.body)
        res.json(response)
    } catch (err) {
        next(err)
    }
}

export async function deleteMovie(req, res, next) {
    try {
        const movielist = await deleteOne(req.params.id)
        if (!movielist) {
            return res.status(404).json({ error: "Movie not found" })
        }
        res.json(movielist)
    } catch (err) {
        next(err)
    }
}
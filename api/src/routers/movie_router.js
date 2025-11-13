import express from "express"
import { getNowPlaying } from "../controllers/movie_controller.js"

const router = express.Router()

router.get("/now-playing", getNowPlaying)

export default router

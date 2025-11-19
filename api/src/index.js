import express from "express"
import cors from "cors"
import "dotenv/config"

import movieRouter from "./routers/movie_router.js" // uusi reitti

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// perus-tervehdys
app.get("/", async (req, res) => {
  res.send("Postgres API + TMDB esimerkki")
})

// uusi TMDB-elokuvat reitti
app.use("/movies", movieRouter)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
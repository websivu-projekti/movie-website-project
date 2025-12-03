import express from "express"
import cors from "cors"
import "dotenv/config"

import movieRouter from "./routers/movie_router.js" // uusi reitti
import authRouter from "./routers/auth_router.js" // authentication routes
import reviewRouter from "./routers/review_router.js" //reviews routes

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

// Authentikaatio reitti
app.use("/auth", authRouter)

//Reviews reitti
app.use("/reviews", reviewRouter)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})

import fetch from "node-fetch"

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
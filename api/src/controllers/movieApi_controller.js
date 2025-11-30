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

export async function getPopularFilms(req, res) {
  try {
    const apiKey = process.env.TMDB_API_KEY
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
    )
    const data = await response.json()
    res.json(data.results)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Error fetching movies" })
  }
}

export async function getDiscover(req, res) {
  try {
    const apiKey = process.env.TMDB_API_KEY
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`
    )
    const data = await response.json()
    res.json(data.results)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Error fetching movies" })
  }
}

export async function getGenres(req, res) {
  try {
    const apiKey = process.env.TMDB_API_KEY
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en`
    )
    const data = await response.json()
    res.json(data.genres)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Error fetching genres" })
  }
}

export async function getLanguages(req, res) {
  try {
    const apiKey = process.env.TMDB_API_KEY
    const response = await fetch(
      `https://api.themoviedb.org/3/configuration/languages?api_key=${apiKey}`
    )
    const data = await response.json()
    res.json(data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Error fetching languages" })
  }
}

export async function getMovieProviders(req, res) {
  try {
    const apiKey = process.env.TMDB_API_KEY
    const response = await fetch(
      `https://api.themoviedb.org/3/watch/providers/movie?api_key=${apiKey}`
    )
    const data = await response.json()
    res.json(data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Error fetching movie providers" })
  }
}

export async function getTvProviders(req, res) {
  try {
    const apiKey = process.env.TMDB_API_KEY
    const response = await fetch(
      `https://api.themoviedb.org/3/watch/providers/tv?api_key=${apiKey}`
    )
    const data = await response.json()
    res.json(data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Error fetching TV providers" })
  }
}


/* WORK IN PROGRESS */
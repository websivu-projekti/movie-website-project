import React, { useEffect, useState } from "react"
import "../index.css"
import "../filters.css"
import Header from '../components/header.jsx'
import Genres from '../components/genres.jsx'

function Films(){
  const [movies, setMovies] = useState([])
  const [genres, setGenres] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/movies/discover`)
        if (!res.ok) throw new Error("Verkkovirhe")
        const data = await res.json()
        setMovies(data)
      } catch (err) {
        console.error("Virhe haettaessa elokuvia:", err)
        setMovies(["Movie 1", "Movie 2", "Movie 3", "Movie 4"]) // placeholder jos backend ei toimi
      } finally {
        setLoading(false)
      }
    }
    fetchMovies()
  }, [])

  return (
    <div className="container">
      <Header/>
      <h2>Films</h2>
      <div className="searchContainer">
        <div className="filtersRow">
          Filters
          <Genres/>
        </div>
        <div className="movieRow">
          {movies.map((movie, index) => (
            <div key={index} class="movieCard">
                <img src={`http://image.tmdb.org/t/p/w300/${movie.poster_path}`}/>
                <p className="movieTitle"><a className="movieLink" href="">{movie.title}</a></p>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  )
}

export default Films

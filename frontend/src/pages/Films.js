import React, { useEffect, useState } from "react"
import "../index.css"
import "../filters.css"
import Header from '../components/header.jsx'
import Genres from '../components/genres.jsx'
import FilterRating from "../components/filterrating.jsx"
import SortBy from "../components/sortby.jsx"
import FilterLanguages from "../components/languages.jsx"
import FilterYear from "../components/filteryear.jsx"
import FilterProviders from "../components/filterprovider.jsx"
import FilterContent from "../components/filtercontent.jsx"

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
          <a className="resetLink" href="">Reset filters</a>
          {/* SORT BY */}
          <div className="filterTitle">Sort by:</div>
          <SortBy/>
          {/* GENRES */}
          <div className="filterTitle">Genres:</div>
          <Genres/>
          {/* LANGUAGES */}
          <div className="filterTitle">Language:</div>
          <FilterLanguages/>
          {/* RATING */}
          <div className="filterTitle">Rating:</div>
          <FilterRating/>
          {/* YEAR */}
          <div className="filterTitle">Year:</div>
          <FilterYear/>
          {/* PROVIDERS */}
          <div className="filterTitle">Providers:</div>
          <FilterProviders/>
          {/* CONTENT */}
          <div className="filterTitle">Content:</div>
          <FilterContent/>
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

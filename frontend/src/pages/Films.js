import React, { useEffect, useState, useRef } from "react"
import "../index.css"
import "../filters.css"
import Header from '../components/header.jsx'
import FiltersMenu from "../components/filtersmenu.jsx"
import menuLogo from "../assets/menuicon.svg"
import closeMenu from "../assets/closemenu.svg"
import { Rating, Star } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

import Genres from '../components/genres.jsx'
import FilterRating from "../components/filterrating.jsx"
import SortBy from "../components/sortby.jsx"
import FilterLanguages from "../components/languages.jsx"
import FilterYear from "../components/filteryear.jsx"
import FilterProviders from "../components/filterprovider.jsx"
import FilterContent from "../components/filtercontent.jsx"

function Films(){
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const mobileMenu = useRef(null)

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

  const openMobileMenu = () => {
    mobileMenu.current.style.transform = 'translate3d(0vw, 0, 0)'
  }

  const closeMobileMenu = () => {
    mobileMenu.current.style.transform = 'translate3d(-100vw, 0, 0)'
  }

  const customRating = {
    itemShapes: Star,
    activeFillColor: '#a5e364',
    inactiveFillColor: '#cdf0a8'
  }

  return (
    <div className="container">
      <Header/>
      <h2>Films</h2>
      <div className="searchContainer">
        <div className="filtersMenu">
          <button className="filtermenuBtn" onClick={openMobileMenu}>
            <img src={menuLogo}/>
          </button>
          <div className="mobileMenu" ref={mobileMenu}>
            <button className="filtermenuBtn" onClick={closeMobileMenu}>
              <img src={closeMenu}/>
            </button>
            <FiltersMenu/>
          </div>
        </div>
        <div className="filtersRow">
          <div className="mobileFiltersRow">
                  Filters
                  <a className="resetLink">Reset filters</a>
                  {/* SORT BY */}
                  <div className="filterTitle">Sort by:</div>
                  <SortBy/>
                  {/* GENRES */}
                  <div className="filterTitle">Genres: </div>
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
        </div>
        <div className="movieRow">
          {movies.map((movie, index) => (
            <div key={index} class="movieCard">
                <img className="moviePoster" src={`http://image.tmdb.org/t/p/w300/${movie.poster_path}`}/>
                <p className="movieTitle"><a className="movieLink" href={`/movieinfo/${movie.id}`}>{movie.title}</a></p>
                <div className="movieTitle">{(movie.release_date.slice(0,4))}</div>
                <Rating 
                className="movieRating" 
                readOnly 
                style={{ maxWidth: 250 }} 
                value={(movie.vote_average / 2)}
                itemStyles={customRating}
                />
            </div>
          ))}
        </div>
      </div>
      
    </div>
  )
}

export default Films

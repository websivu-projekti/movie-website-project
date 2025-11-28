import React, { useEffect, useState, useRef } from "react"
import "../index.css"
import "../filters.css"
import Header from '../components/header.jsx'
import FiltersMenu from "../components/filtersmenu.jsx"
import menuLogo from "../assets/menuicon.svg"
import closeMenu from "../assets/closemenu.svg"

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
          <FiltersMenu/>
        </div>
        <div className="movieRow">
          {movies.map((movie, index) => (
            <div key={index} class="movieCard">
                <img className="moviePoster" src={`http://image.tmdb.org/t/p/w300/${movie.poster_path}`}/>
                <p className="movieTitle"><a className="movieLink" href="">{movie.title}</a></p>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  )
}

export default Films

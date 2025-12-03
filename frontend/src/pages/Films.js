import React, { useEffect, useState, useRef } from "react"
import "../index.css"
import "../filters.css"
import Header from '../components/header.jsx'
import Pagination from "../components/pagination.jsx"
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
  const [ discoverMovies, setDiscoverMovies ] = useState([])
  const [ sorting, setSorting ] = useState('popularity.desc')
  const [ chosenGen, setChosenGen ] = useState([])
  const [ chosenLan, setChosenLan ] = useState('en')
  const [ chosenRating, setChosenRating ] = useState('10')
  const [ chosenYear, setChosenYear ] = useState()
  const [ chosenContent, setChosenContent ] = useState('movies')
  const [ chosenProviders, setChosenProviders ] = useState()
  const [ searchQuery, setSearchQuery ] = useState('')
  const [ loading, setLoading ] = useState(true)
  const [ currentPage, setCurrentPage ] = useState(1)
  const [ render, setRender ] = useState(true)
  const mobileMenu = useRef(null)

  

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/movies/discovermovies/&page=${currentPage}&sort_by=${sorting}&vote_average.lte=${chosenRating}&${chosenYear}&with_genres=${chosenGen}&with_original_language=${chosenLan}`)
        if (!res.ok) throw new Error("Verkkovirhe")
        const data = await res.json()
        setDiscoverMovies(data)
      } catch (err) {
        console.error("Virhe haettaessa elokuvia:", err)
        setDiscoverMovies(["Movie 1", "Movie 2", "Movie 3", "Movie 4"]) // placeholder jos backend ei toimi
      } finally {
        setLoading(false)
      }
    }
    fetchMovies()
  }, [currentPage, sorting, chosenRating, chosenYear, chosenGen, chosenLan])

  const openMobileMenu = () => {
    mobileMenu.current.style.transform = 'translate3d(0vw, 0, 0)'
  }

  const closeMobileMenu = () => {
    mobileMenu.current.style.transform = 'translate3d(-100vw, 0, 0)'
  }

  const resetFilters = () => {
    setSorting('popularity.desc')
    setChosenGen([])
    setChosenLan('en')
    setChosenRating('10')
    setChosenYear()
    setChosenContent('movies')
    setCurrentPage(1)
    setRender(!render) 
  }

  const customRating = {
    itemShapes: Star,
    activeFillColor: '#90e339',
    inactiveFillColor: '#cdf0a8'
  }

  return (
    <div className="container">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
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
            <div className="mobileFiltersRow" key={render}>
                  Filters
                  <a className="resetLink" onClick={resetFilters}>Reset filters</a>
                  {/* SORT BY */}
                  <div className="filterTitle">Sort by:</div>
                  <SortBy sorting={sorting} setSorting={setSorting}/>
                  {/* GENRES */}
                  <div className="filterTitle">Genres: </div>
                  <Genres chosenGen={chosenGen} setChosenGen={setChosenGen}/>
                  {/* LANGUAGES */}
                  <div className="filterTitle">Language:</div>
                  <FilterLanguages chosenLan={chosenLan} setChosenLan={setChosenLan}/>
                  {/* RATING */}
                  <div className="filterTitle">Rating:</div>
                  <FilterRating chosenRating={chosenRating} setChosenRating={setChosenRating}/>
                  {/* YEAR */}
                  <div className="filterTitle">Year:</div>
                  <FilterYear chosenYear={chosenYear} setChosenYear={setChosenYear}/>
                  {/* PROVIDERS */}
                  <div className="filterTitle">Providers:</div>
                  <FilterProviders/>
                  {/* CONTENT */}
                  <div className="filterTitle">Content:</div>
                  <FilterContent chosenContent={chosenContent} setChosenContent={setChosenContent}/>
                  </div>
            </div>
        </div>
        <div className="filtersRow">
          <div className="filtersRow" key={render}>
                  Filters
                  <a className="resetLink" onClick={resetFilters}>Reset filters</a>
                  {/* SORT BY */}
                  <div className="filterTitle">Sort by:</div>
                  <SortBy sorting={sorting} setSorting={setSorting}/>
                  {/* GENRES */}
                  <div className="filterTitle">Genres: </div>
                  <Genres chosenGen={chosenGen} setChosenGen={setChosenGen}/>
                  {/* LANGUAGES */}
                  <div className="filterTitle">Language:</div>
                  <FilterLanguages chosenLan={chosenLan} setChosenLan={setChosenLan}/>
                  {/* RATING */}
                  <div className="filterTitle">Rating:</div>
                  <FilterRating chosenRating={chosenRating} setChosenRating={setChosenRating}/>
                  {/* YEAR */}
                  <div className="filterTitle">Year:</div>
                  <FilterYear chosenYear={chosenYear} setChosenYear={setChosenYear}/>
                  {/* PROVIDERS */}
                  <div className="filterTitle">Providers:</div>
                  <FilterProviders chosenProviders={chosenProviders} setChosenProviders={setChosenProviders}/>
                  {/* CONTENT */}
                  <div className="filterTitle">Content:</div>
                  <FilterContent chosenContent={chosenContent} setChosenContent={setChosenContent}/>
                  </div>
        </div>
        {loading
          ? <p>Loading movies...</p>
        :<div className="movieRow">
          {discoverMovies.map((movie, index) => (
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
        }
        
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      </div> 
    </div>
  )
}

export default Films

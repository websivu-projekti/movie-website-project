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
import SeriesSortBy from "../components/seriessortby.jsx"
import FilterLanguages from "../components/languages.jsx"
import FilterYear from "../components/filteryear.jsx"
import FilterSeriesYear from "../components/seriesyear.jsx"
import FilterProviders from "../components/filterprovider.jsx"
import SeriesProviders from "../components/seriesproviders.jsx"
import SeriesGenres from "../components/seriesgenres.jsx"

function Films(){
  const [ discoverMovies, setDiscoverMovies ] = useState([])
  const [ discoverTv, setDiscoverTv ] = useState([])
  const [ sorting, setSorting ] = useState('popularity.desc')
  const [ sortingSeries, setSortingSeries ] = useState('popularity.desc')
  const [ chosenGen, setChosenGen ] = useState([])
  const [ chosenSeriesGen, setChosenSeriesGen ] = useState([])
  const [ chosenLan, setChosenLan ] = useState('en')
  const [ chosenRating, setChosenRating ] = useState('10')
  const [ chosenYear, setChosenYear ] = useState()
  const [ chosenSeriesYear, setChosenSeriesYear ] = useState()
  const [ chosenProviders, setChosenProviders ] = useState("&with_watch_providers=")
  const [ chosenSeriesProviders, setChosenSeriesProviders ] = useState("&with_watch_providers=")
  const [ loading, setLoading ] = useState(true)
  const [ currentPage, setCurrentPage ] = useState(1)
  const [ render, setRender ] = useState(true)
  const [ showContentMovies, setShowContentMovies ] = useState(true)
  const [ showContentTv, setShowContentTv ] = useState(false)
  const [ movieActive, setMovieActive ] = useState('active')
  const [ tvActive, setTvActive ] = useState('inactive')
  const mobileMenu = useRef(null)

  

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/movies/discovermovies/&page=${currentPage}&sort_by=${sorting}&vote_average.lte=${chosenRating}&${chosenYear}&with_genres=${chosenGen}&with_original_language=${chosenLan}${chosenProviders}`)
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
  }, [currentPage, sorting, chosenRating, chosenYear, chosenGen, chosenLan, chosenProviders])

  useEffect(() =>{
    async function fetchSeries() {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/movies/discovertv/&page=${currentPage}&sort_by=${sortingSeries}&with_original_language=${chosenLan}&vote_average.lte=${chosenRating}&with_genres=${chosenSeriesGen}&${chosenSeriesYear}${chosenSeriesProviders}`)
        if (!res.ok) throw new Error("Verkkovirhe")
        const data = await res.json()
        setDiscoverTv(data)
      } catch (err) {
        console.error("Virhe haettaessa sarjoja:", err)
        setDiscoverTv(["Series 1", "Series 2", "Series 3", "Series 4"]) // placeholder jos backend ei toimi
      } finally {
        setLoading(false)
      }
    }
    fetchSeries()
  }, [currentPage, sortingSeries, chosenRating, chosenLan, chosenSeriesGen, chosenSeriesYear, chosenSeriesProviders])

  const openMobileMenu = () => {
    mobileMenu.current.style.transform = 'translate3d(0vw, 0, 0)'
  }

  const closeMobileMenu = () => {
    mobileMenu.current.style.transform = 'translate3d(-100vw, 0, 0)'
  }

  const resetFilters = () => {
    setSorting('popularity.desc')
    setChosenGen([])
    setChosenSeriesGen([])
    setChosenLan('en')
    setChosenRating('10')
    setChosenYear()
    setChosenSeriesYear()
    setCurrentPage(1)
    setRender(!render) 
  }

  const showContent = () => {
    setShowContentMovies(showContentMovies => !showContentMovies)
    setShowContentTv(showContentTv => !showContentTv)
    if(showContentTv === false){
      setMovieActive('inactive')
      setTvActive('active')
    } else if (showContentTv === true) {
      setMovieActive('active')
      setTvActive('inactive')
    }
  }

  const customRating = {
    itemShapes: Star,
    activeFillColor: '#90e339',
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
            {showContentMovies &&
            <div className="mobileFiltersRow" key={render}>
                  Filters (movie)
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
              </div>
              }
            {showContentTv &&
              <div className="mobileFiltersRow" key={render}>
                  Filters (series)
                  <a className="resetLink" onClick={resetFilters}>Reset filters</a>
                  {/* SORT BY */}
                  <div className="filterTitle">Sort by:</div>
                  <SeriesSortBy sortingSeries={sortingSeries} setSortingSeries={setSortingSeries}/>
                  {/* GENRES */}
                  <div className="filterTitle">Genres: </div>
                  <SeriesGenres chosenSeriesGen={chosenSeriesGen} setChosenSeriesGen={setChosenSeriesGen}/>
                  {/* LANGUAGES */}
                  <div className="filterTitle">Language:</div>
                  <FilterLanguages chosenLan={chosenLan} setChosenLan={setChosenLan}/>
                  {/* RATING */}
                  <div className="filterTitle">Rating:</div>
                  <FilterRating chosenRating={chosenRating} setChosenRating={setChosenRating}/>
                  {/* YEAR */}
                  <div className="filterTitle">Year:</div>
                  <FilterSeriesYear chosenSeriesYear={chosenSeriesYear} setChosenSeriesYear={setChosenSeriesYear}/>
                  {/* PROVIDERS */}
                  <div className="filterTitle">Providers:</div>
                  <SeriesProviders chosenSeriesProviders={chosenSeriesProviders} setChosenSeriesProviders={setChosenSeriesProviders}/>
              </div>
              }
            </div>
        </div>
        <div className="filtersRow">
          {showContentMovies &&
            <div className="filtersRow" key={render}>
                  Filters (movie)
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
              </div>
              }
            {showContentTv &&
              <div className="filtersRow" key={render}>
                  Filters (series)
                  <a className="resetLink" onClick={resetFilters}>Reset filters</a>
                  {/* SORT BY */}
                  <div className="filterTitle">Sort by:</div>
                  <SeriesSortBy sortingSeries={sortingSeries} setSortingSeries={setSortingSeries}/>
                  {/* GENRES */}
                  <div className="filterTitle">Genres: </div>
                  <SeriesGenres chosenSeriesGen={chosenSeriesGen} setChosenSeriesGen={setChosenSeriesGen}/>
                  {/* LANGUAGES */}
                  <div className="filterTitle">Language:</div>
                  <FilterLanguages chosenLan={chosenLan} setChosenLan={setChosenLan}/>
                  {/* RATING */}
                  <div className="filterTitle">Rating:</div>
                  <FilterRating chosenRating={chosenRating} setChosenRating={setChosenRating}/>
                  {/* YEAR */}
                  <div className="filterTitle">Year:</div>
                  <FilterSeriesYear chosenSeriesYear={chosenSeriesYear} setChosenSeriesYear={setChosenSeriesYear}/>
                  {/* PROVIDERS */}
                  <div className="filterTitle">Providers:</div>
                  <SeriesProviders chosenSeriesProviders={chosenSeriesProviders} setChosenSeriesProviders={setChosenSeriesProviders}/>
              </div>
              }
        </div>
        <div className="browseTab">
            <button 
            className={`tabBtn movie ${movieActive}`}
            value={'movies'}
            onClick={showContent}
            disabled={showContentMovies === true}
            >Movies
            </button>
            <button 
            className={`tabBtn tv ${tvActive}`}
            value={'tv'}
            onClick={showContent}
            disabled={showContentTv === true}
            >TV Series
            </button>
        </div>
        {loading
          ? <p>Loading content...</p>
        :<>
        {showContentMovies &&
        
        <div className="movieRow browseMovies">
          
          {discoverMovies.map((movie, index) => (
            <div key={index} className="movieCard">
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
        {showContentTv &&
        <>
        <div className="movieRow browseTv">
          {discoverTv.map((series, index) => (
            <div key={index} className="movieCard">
                <img className="moviePoster" src={`http://image.tmdb.org/t/p/w300/${series.poster_path}`}/>
                <p className="movieTitle"><a className="movieLink" href={`/seriesinfo/${series.id}`}>{series.name}</a></p>
                <div className="movieTitle">{(series.first_air_date.slice(0,4))}</div>
                <Rating 
                className="movieRating" 
                readOnly 
                style={{ maxWidth: 250 }} 
                value={(series.vote_average / 2)}
                itemStyles={customRating}
                />
            </div>
            
          ))}
        </div>
        </>
        }
        </>
        }
        
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      </div> 
    </div>
  )
}

export default Films

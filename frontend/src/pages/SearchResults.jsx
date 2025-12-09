import React, { useEffect, useState, useRef } from "react"
import "../index.css"
import "../filters.css"
import Header from '../components/header.jsx'
import Pagination from "../components/pagination.jsx"
import { Rating, Star } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'


function SearchResults(){
  const [ searchMovies, setSearchMovies ] = useState([])
  const [ movieResultsLength, setMovieResultsLength ] = useState()
  const [ tvResultsLength, setTvResultsLength ] = useState()
  const [ searchTv, setSearchTv ] = useState([])
  const searchQuery = localStorage.getItem('Search_Query')
  const [ loading, setLoading ] = useState(true)
  const [ currentPage, setCurrentPage ] = useState(1)
  const [ showContentMovies, setShowContentMovies ] = useState(true)
  const [ showContentTv, setShowContentTv ] = useState(false)
  const [ movieActive, setMovieActive ] = useState('active')
  const [ tvActive, setTvActive ] = useState('inactive')

  

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/movies/moviesearch/&page=${currentPage}&query=${searchQuery}`)
        if (!res.ok) throw new Error("Verkkovirhe")
        const data = await res.json()
        setSearchMovies(data)
        setMovieResultsLength(data.length)
      } catch (err) {
        console.error("Virhe haettaessa elokuvia:", err)
        setSearchMovies(["Movie 1", "Movie 2", "Movie 3", "Movie 4"]) // placeholder jos backend ei toimi
      } finally {
        setLoading(false)
      }
    }
    fetchMovies()
  }, [currentPage, searchQuery])

  useEffect(() =>{
    async function fetchSeries() {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/movies/tvsearch/&page=${currentPage}&query=${searchQuery}`)
        if (!res.ok) throw new Error("Verkkovirhe")
        const data = await res.json()
        setSearchTv(data)
        setTvResultsLength(data.length)
      } catch (err) {
        console.error("Virhe haettaessa sarjoja:", err)
        setSearchTv(["Series 1", "Series 2", "Series 3", "Series 4"]) // placeholder jos backend ei toimi
      } finally {
        setLoading(false)
      }
    }
    fetchSeries()
  }, [currentPage, searchQuery])

  const showContent = () => {
    setShowContentMovies(showContentMovies => !showContentMovies)
    setShowContentTv(showContentTv => !showContentTv)
    console.log(tvResultsLength)
    console.log(movieResultsLength)
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
      <h2>Search results for: {searchQuery}</h2>
      <div className="resultsContainer">
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
          
          {searchMovies.map((movie, index) => (
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
        {showContentTv &&
        <>
        <div className="movieRow browseTv">
          {searchTv.map((series, index) => (
            <div key={index} class="movieCard">
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
        
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} movieResultsLength={movieResultsLength} tvResultsLength={tvResultsLength}/>
      </div> 
    </div>
  )
}

export default SearchResults

import React, { useEffect, useState } from "react"
import "../index.css"
import Header from '../components/header.jsx'
import Carousel from 'react-bootstrap/Carousel'

function Home() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/movies/popularfilms`)
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
    <div class="container">
     <Header/>

      {loading
        ? <p>Ladataan elokuvia...</p>
        : <div className="movieRow">
          <Carousel interval={null} indicators={false}>
           {movies.map((movie, index) => (
            <Carousel.Item key={movie.id} className="movieCard">
                <img src={`https://image.tmdb.org/t/p/w154/${movie.poster_path}`}/>
                <p className="movieTitle">{movie.title}</p>
            </Carousel.Item>
           ))}   
          </Carousel>
        </div>
      }
    </div>
  )
}

export default Home;
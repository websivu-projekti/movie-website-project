import React, { useEffect, useState } from "react"
import "../index.css"
import Header from '../components/header.jsx'
import Carousel from 'react-bootstrap/Carousel'
import Card from 'react-bootstrap/Card'

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

  const reduceMovies = (acc, cur, index) => {
    const groupIndex = Math.floor(index / 3);
    if (!acc[groupIndex]) acc[groupIndex] = [];
    acc[groupIndex].push(cur);
    console.log(acc)
    return acc;
  };

  return (
    <div class="container">
     <Header/>

      {loading
        ? <p>Ladataan elokuvia...</p>
        : <div className="movieRow">
          <Carousel interval={null} indicators={false}>
           {movies.reduce(reduceMovies, []).map((item, index) => (
            <Carousel.Item key={index}>
              <div className="d-flex justify-content-center">
              {item.map((item, index) =>{
                return(
                  <Card key={index} style={{ width: "8rem" }}>
                    <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w154/${item.poster_path}`}/>
                    <Card.Body>
                      <Card.Title className="movieTitle">{item.title}</Card.Title>
                    </Card.Body>
                  </Card>
                )   
              })}
              </div>
            </Carousel.Item>
           ))}   
          </Carousel>
        </div>
      }
    </div>
  )
}

export default Home;
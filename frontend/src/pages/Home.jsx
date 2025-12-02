import React, { useEffect, useState } from "react"
import "../index.css"
import Header from '../components/header.jsx'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { Rating, Star } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

function Home() {
  const [movies, setMovies] = useState([])
  const [ searchQuery, setSearchQuery ] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/movies/popularFilms`)
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

  const customRating = {
      itemShapes: Star,
      activeFillColor: '#a5e364',
      inactiveFillColor: '#cdf0a8'
    }

  return (
    <div class="container">
     <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      <h2 className="title">Popular movies</h2>
      {loading
        ? <p>Ladataan elokuvia...</p>
        : <div className="movieRow" style={{gridArea: 'main'}}>
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              loop={true}
              watchSlidesProgress={true}
              observeParents={true}
              resizeObserver={true}
              setWrapperSize={true}
              navigation
              breakpoints={{
                740: {
                  slidesPerView: 1,
                  spaceBetween: 20
                },
                748: {
                  slidesPerView: 2,
                  spaceBetween: 30
                },
                1024: {
                  slidesPerView: 3
                },
                1424:{
                  slidesPerView: 4,
                  spaceBetween: 30
                }
              }}
              modules={[Navigation]}
            >
              {movies.map((movie, index) => (
                <SwiperSlide key={index}>
                  <div key={movie.id} class="movieCard">
                    <img src={`http://image.tmdb.org/t/p/w300/${movie.poster_path}`}/>
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
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
      }
    </div>
  )
}

export default Home;
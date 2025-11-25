import React, { useEffect, useState } from "react"
import "../index.css"
import Header from '../components/header.jsx'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

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
                  slidesPerView: 2,
                  spaceBetween: 20
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 30
                },
                1024:{
                  slidesPerView: 4,
                  spaceBetween: 50
                }
              }}
              modules={[Navigation]}
            >
              {movies.map((movie, index) => (
                <SwiperSlide key={index}>
                  <div key={movie.id} class="movieCard">
                    <img src={`http://image.tmdb.org/t/p/w185/${movie.poster_path}`}/>
                    <p className="movieTitle"><a href="">{movie.title}</a></p>
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
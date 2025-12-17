import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Header from "../components/header.jsx"

function SharedFavourites() {
  const { userId } = useParams()
  const [favourites, setFavourites] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await fetch(`http://localhost:3001/favourites/shared/${userId}`)
        const data = await response.json()

        if (response.ok) {
          setFavourites(data.favourites)
        } else {
          setError(data.error || "Failed to fetch favourites")
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchFavourites()
  }, [userId])

  return (
    <div className="container">
      <Header />
      <h1>Shared Favourite Movies</h1>

      {loading ? (
        <p>Loading favourites...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : favourites.length === 0 ? (
        <p>No movies in this list</p>
      ) : (
        <div className="movieRow">
          {favourites.map((movie) => (
            <div key={movie.movieId} className="movieCard">
              <div className="moviePoster">
                {movie.poster ? (
                  <img src={movie.poster} alt={movie.title} style={{ width: "100%", objectFit: "cover" }} />
                ) : (
                  <div style={{ width: "100%", height: "200px", backgroundColor: "#ccc", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    No Image
                  </div>
                )}
              </div>
              <div className="listInfo">
                <div className="movieTitle">{movie.title}</div>
                <div className="movieTitle">{movie.releaseYear || "N/A"}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SharedFavourites
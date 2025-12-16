import React, { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext.js"
import { useNavigate, useParams } from "react-router-dom"
import "../index.css"
import "./Profile.css"
import Header from "../components/header.jsx"

function UsersFavouriteList() {
    const { userId } = useParams()
    const navigate = useNavigate()
    const [favourites, setFavourites] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        fetchFavourites()
    }, [])

    const fetchFavourites = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/favourites/${userId}`)
            const data = await response.json()
            if (response.ok) {
                setFavourites(data.favourites)
            } else {
                setError(data.error || "Failed to fetch favourite movies")
            }
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }
      
      if (loading) {
        return (
          <div className="container">
            <Header />
            <p>Loading...</p>
          </div>
        )
      }

      return (
        <div className="container">
            <Header/>
            <h1>My Favourite Movies</h1>

            <button onClick={() => navigate(`/profile/${userId}`)} className="pfNavBtn">
                Go Back
            </button>

            {loading ? (
                <p>Loading favouritelist...</p>
            ) : error ? (
                <p style={{color: "red"}}>{error}</p>
            ) : favourites.length === 0 ? (
                <p>No movies added to favourites</p>
            ) : (
                <div className="favouritesMovieRow">
                    {favourites.map(movie => (
                        <div key={movie.content_id} className="movieCard">
                            <div className="moviePoster">
                                {movie.poster_url ? (
                                    <img src={movie.poster_url} alt={movie.title} style={{width: "100%", objectFit: "cover"}} />
                                ) : (
                                    <div style={{width: "100%", height: "200px", backgroundColor: "ccc", display: "flex", alignItems: "center", justifyContent: "center"}}>
                                        No Image
                                    </div>
                                )}
                            </div>
                            <div className="listInfo">
                                <div className="movieTitle">{movie.title}</div>
                                <div className="movieTitle">{movie.release_year || "N/A"}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
      )
}

export default UsersFavouriteList
import React, { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext.js"
import { useNavigate } from "react-router-dom"
import "../index.js"
import "./Profile.js"
import Header from "../components/header.jsx"
import SharedFavouritesLink from "../components/SharedFavouritesLink.jsx" 

function FavouriteList() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [favourites, setFavourites] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate])

    useEffect(() => {
        if (user && user.token) {
            fetchFavourites()
        }
    }, [user])

    const fetchFavourites = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/favourites/`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
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

    const handleRemoveFavourite = async (contentId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/favourites/remove`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ contentId })
            })
            if (response.ok) {
                setFavourites(favourites.filter(fav => fav.content_id !== contentId))
            } else {
                const data = await response.json()
                alert(`Error: ${data.error}`)
            }
        } catch (err) {
            alert(`Error: ${err.message}`)
        }
    }

    if (!user) {
        return (
            <div className="container">
                <Header />
                <p>Loading...</p>
            </div>
        )
    }

    const userIdForLink = user.userId || "unknown"

    return (
        <div className="container">
            <Header/>
            <h1>My Favourite Movies</h1>

            <button onClick={() => navigate("/profile")} style={{marginBottom: "20px"}}>
                Profile Page
            </button>
            <SharedFavouritesLink userId={user.userId}/>
            {loading ? (
                <p>Loading favouritelist...</p>
            ) : error ? (
                <p style={{color: "red"}}>{error}</p>
            ) : favourites.length === 0 ? (
                <p>No movies added to favourites</p>
            ) : (
                <>
                    
                    <SharedFavouritesLink userId={user.userId} />

                    <div className="movieRow">
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
                                    <div className="movieTitle">{movie.genre || "N/A"}</div>
                                    <button
                                        onClick={() => handleRemoveFavourite(movie.content_id)}
                                        style={{paddingTop: "10px", backgroundColor: "red", color: "white", padding: "5px 10px", border: "none", cursor: "pointer"}}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default FavouriteList
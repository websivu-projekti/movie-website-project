import React, { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext.js"
import { useNavigate, useParams } from "react-router-dom"
import "../index.css"
import './Profile.css'
import Header from '../components/header.jsx'

function UserProfile(){
  const { userId } = useParams()
  const navigate = useNavigate()
  const [ userInfo, setUserInfo ] = useState([])
  const [ userPfp, setUserPfp ] = useState("pf1")
  const [favourites, setFavourites] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() =>{
    fetchUserInfo()
    fetchFavourites()
  }, [])

  const fetchUserInfo = async () => {
    try{
        const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/profile/${userId}`)
            const data = await response.json()
            if (response.ok) {
                setUserInfo(data.user)
                setUserPfp(data.user.pfp_url)
            } else {
                setError(data.error || "Failed to fetch user data")
            }
    }catch (err){
        setError(err.message)
    }
  }

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


  return (
    <div className="container">
      <Header/>
      <h1>Profile</h1>
            <div className="profileContainer">
                <div className="profileHeader">
                    <div className="profileInfo">
                        <div className="profilePic">
                            <img 
                                className="profileIcon" 
                                src={userPfp && userPfp.startsWith('http') ? userPfp : require(`../assets/icons/${userPfp || 'null'}.png`)}
                            />
                        </div>
                        <span className="username">{userInfo.username}</span>
                    </div>
                </div>
                <div className="favouritesContainer">
                    <h2>{userInfo.username}'s Favourite Movies and Series</h2>
                    {loading ? (
                      <p>Loading favourites...</p>
                    ) : error ? (
                      <p>{error}</p>
                    ) : favourites.length === 0 ? (
                      <p>This user doesn't have any favourites yet!</p>
                    ) : (
                      <div className="pfMovieRow">
                        {favourites.slice(0,3).map(movie => (
                          <div key={movie.content_id} className="movieCard">
                            {movie.poster_url ? (
                              <img src={movie.poster_url} alt={movie.title} className="pfMoviePoster"/>
                            ) : (
                              <div className="noPoster">
                                No Image
                              </div>
                            )}
                            <div className="listInfo">
                              <div className="movieTitle">{movie.title}</div>
                              <div className="movieTitle">{movie.release_year || "N/A"}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <button 
                      onClick={() => navigate(`/profile/favouritelist/${userInfo.user_id}`)}
                      className="pfNavBtn"
                    >
                      Favourites List
                    </button>
                </div>
            </div>
  </div>
  )
}

export default UserProfile

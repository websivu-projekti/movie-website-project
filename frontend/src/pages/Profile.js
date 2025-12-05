import React, { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext.js"
import { useNavigate } from "react-router-dom"
import "../index.css"
import './Profile.css'
import Header from '../components/header.jsx'

function Profile(){
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [favourites, setFavourites] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const lists = [
        { id: 1, name: "Placeholder List 1", count: 10 },
        { id: 2, name: "Placeholder List 2", count: 8 },
        { id: 3, name: "Placeholder List 3", count: 12 },
        { id: 4, name: "Placeholder List 4", count: 5 },
    ]

 
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
      const response = await fetch("http://localhost:3001/favourites/", {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const data = await response.json()
      if (response.ok) {
        setFavourites(data.favourites)
      } else {
        setError(data.error || "Failed to fetch favourites")
      }
    } catch ( err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }


  const handleDeleteAccount = async () => {
    if (window.confirm(`Haluatko varmasti poistaa käyttäjäsi, ${user.username}? Toimintoa ei voi perua.`)) {
      try {
        const response = await fetch("http://localhost:3001/auth/account", {
          method: 'DELETE',
          headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${user.token}`
          },
          body: JSON.stringify({ username: user.username })
        });

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch profile")
        }

        alert('Käyttäjä poistettu onnistuneesti.')
        logout()
        navigate('/')

      } catch (err) {
        alert(`Error: ${error.message}`)
        }
      }
  }

  const handleRemoveFavourite = async (contentId) => {
    try {
      const response = await fetch("http://localhost:3001/favourites/remove", {
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


  return (
    <div className="container">
      <Header/>
      <h1>Profile</h1>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>User ID:</strong> {user.user_id}</p>
        
      
      <button onClick={handleLogout} style={{marginTop: "20px"}}>Logout</button>
    

            <div className="profileContainer">
                <div className="profileHeader">
                    <div className="profileInfo">
                        <div className="profilePic">User</div>
                        <span className="username">{user.username}</span>
                    </div>
                    <button className="editProfileBtn" onClick={() => navigate("/editprofile")}>
                        Edit Profile
                    </button>
                </div>

                <div className="profileListsHeader">
                    <span className="sectionTitel">Favourite movies</span>
                    <span className="sectionTitle">Username's Lists</span>
                    <button className="createListBtn">Create List</button>
                </div>

                {loading ? (
                  <p>Loading favourites...</p>
                ) : error ? (
                  <p style={{color: "red"}}>{error}</p>
                ) : favourites.length === 0 ? (
                  <p>No Favourite movies yet</p>
                ): (
                  <div className="listsGrid">
                    {favourites.map(movie => (
                      <div key={movie.content_id} className="listCard">
                        <div className="moviePoster">
                          {movie.poster_url ? (
                            <img src={movie.poster_url} alt={movie.title} style={{width: "100%", height: "100%", objectFit: "cover"}} /> 
                          ): (
                            <div style={{width: "100%", height: "200px", backgroundColor: "#ccc", display: "flex", alignItems: "center", justifyContent: "center"}}>
                              No Image
                            </div>
                          )}
                        </div>
                        <div className="listInfo">
                          <span className="listName">{movie.title}</span>
                          <span className="listCount">{movie.release_year || "N/A"}</span>
                          <button
                            onClick={() => handleRemoveFavourite(movie.content_id)}
                            style={{marginTop: "10px", backgroundColor: "red", color: "white", padding: "5px 10px", border: "none", cursor: "pointer"}}
                          >
                            Remove from favourites
                            </button>
                          </div>
                        </div>
                    ))}
                  </div>
                )}

                <div className="listsGrid">
                    {lists.map(list => (
                        <div key={list.id} className="listCard">
                            <div className="listImages">
                                <div className="listImage placeholder"></div>
                                <div className="listImage placeholder"></div>
                                <div className="listImage placeholder"></div>
                                <div className="listImage placeholder"></div>
                            </div>
                            <div className="listInfo">
                                <span className="listName">{list.name}</span>
                                <span className="listCount">{list.count} films</span>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="myGroupsBtn" onClick={() => navigate("/mygroups")}>
                    My Groups
                </button>
            </div>
            
      <button 
        onClick={handleDeleteAccount}
        style={{marginTop: '20px', marginLeft: '10px', backGroundColor: 'red', color: 'white' }}
      >
        Delete Account
      </button>
  </div>
  )
}

export default Profile

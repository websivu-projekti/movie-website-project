import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.js";
import { useNavigate } from "react-router-dom";
import "../index.css";
import './Profile.css';
import Header from '../components/header.jsx';

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [ userData, setUserData ] = useState([])
  const [ userPfp, setUserPfp ] = useState("pf1")

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() =>{
    fetchFavourites()
    fetchUserInfo()
  }, [])

  const fetchFavourites = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/favourites/`, {
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          });
          const data = await response.json();
          if (response.ok) {
            setFavourites(data.favourites);
          } else {
            setError(data.error || "Failed to fetch favourite movies");
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
    };

    const fetchUserInfo = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/profile`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const data = await response.json()
            if (response.ok) {
                setUserData(data.user)
                setUserPfp(data.user.pfp_url)
            } else {
                setError(data.error || "Failed to fetch user data")
            }
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

  if (!user) {
    return (
      <div className="container">
        <Header />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <Header />
      <h1>Profile</h1>
            <div className="profileContainer">
                <div className="profileHeader">
                    <div className="profileInfo">
                        <div className="profilePic">
                            <img 
                                className="profileIcon" 
                                src={userPfp && userPfp.startsWith('http') ? userPfp : require(`../assets/icons/${userPfp || 'pf1'}.png`)}
                            />
                        </div>
                        <span className="username">{user.username}</span>
                    </div>
                    <button className="pfNavBtn" onClick={() => navigate("/editprofile")}>
                        Edit Profile
                    </button>
                </div>
                <div className="favouritesContainer">
                    <h2>{user.username}'s Favourite Movies and Series</h2>
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
                      onClick={() => navigate("/profile/favouritelist")}
                      className="pfNavBtn"
                    >
                      Favourites List
                    </button>
                </div>
                
                <div className="pfGroupsContainer">
                  <h2>{user.username}'s Groups</h2>
                  <button className="pfNavBtn" onClick={() => navigate("/mygroups")}>
                      My Groups
                  </button>
                </div>
            </div>
  </div>
  )
}

export default Profile;

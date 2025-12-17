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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() =>{
    fetchUserInfo()
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
                    <button className="pfNavBtn" onClick={() => navigate(-1)}>
                        Go Back
                    </button>
                </div>
                <div className="pfGroupsContainer">
                  <h2>{userInfo.username}'s Favourites</h2>
                  <button className="pfNavBtn" onClick={() => navigate(`/profile/favouritelist/${userInfo.user_id}`)}>
                      View Favourites
                  </button>
                </div>
            </div>
  </div>
  )
}

export default UserProfile

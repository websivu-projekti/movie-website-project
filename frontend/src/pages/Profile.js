import React, { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext.js"
import { useNavigate } from "react-router-dom"
import "../index.css"
import './Profile.css'
import Header from '../components/header.jsx'

function Profile(){
  const { user, logout } = useAuth()
  const navigate = useNavigate()

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

                <button 
                  onClick={() => navigate("/profile/favouritelist")}
                  style={{marginTop: "20px", marginBottom: "20px", padding: "10px 20px", backgroundColor: "#585cd5", color: "white", border: "none", cursor: "pointer", borderRadius: "5px", fontSize: "16px"}}
                >
                  View My Favourite Movies
                </button>

                <div className="profileListsHeader">
                    <span className="sectionTitle">Username's Lists</span>
                    <button className="createListBtn">Create List</button>
                </div>

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

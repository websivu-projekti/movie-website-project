import React, { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext.js"
import { useNavigate } from "react-router-dom"
import "../index.css"
import Header from '../components/header.jsx'

function Profile(){
  const { user, logout } = useAuth()
  const navigate = useNavigate()

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
        <div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>User ID:</strong> {user.userId}</p>
        </div>
      <button onClick={handleLogout} style={{marginTop: "20px"}}>Logout</button>
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

import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "../index.css"
import Header from '../components/header.jsx'

function Profile(){
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token")
      
      if (!token) {
        navigate("/login")
        return
      }

      try {
        const response = await fetch("http://localhost:3001/auth/profile", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch profile")
        }

        setUser(data.user)
      } catch (err) {
        setError(err.message)
        if (err.message.includes("token")) {
          localStorage.removeItem("token")
          localStorage.removeItem("user")
          navigate("/login")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/login")
  }

  if (loading) return <div className="container"><Header/><p>Loading...</p></div>
  if (error) return <div className="container"><Header/><p style={{color: "red"}}>{error}</p></div>

  return (
    <div className="container">
      <Header/>
      <h1>Profile</h1>
      {user && (
        <div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>User ID:</strong> {user.user_id}</p>
        </div>
      )}
      <button onClick={handleLogout} style={{marginTop: "20px"}}>Logout</button>
    </div>
  )
}

export default Profile

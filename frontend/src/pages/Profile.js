import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "../index.css"
import './Profile.css'
import Header from '../components/header.jsx'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const lists = [
        { id: 1, name: "Placeholder List 1", count: 10 },
        { id: 2, name: "Placeholder List 2", count: 8 },
        { id: 3, name: "Placeholder List 3", count: 12 },
        { id: 4, name: "Placeholder List 4", count: 5 },
    ]

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
    

            <div className="profileContainer">
                <div className="profileHeader">
                    <div className="profileInfo">
                        <div className="profilePic">User</div>
                        <span className="username">user123</span>
                    </div>
                    <button className="editProfileBtn" onClick={() => navigate("/editprofile")}>
                        Edit Profile
                    </button>
                </div>

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
    </div>
  )
}

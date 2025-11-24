import React from "react"
import "../index.css"
import Header from '../components/header.jsx'

function Profile(){
  return (
    <div className="container">
      <Header/>
      <h1>Profile</h1>
      <p>User profile will appear here</p>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  )
}

export default Profile

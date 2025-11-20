import React from "react"
import { useNavigate } from "react-router-dom"

function Profile(){
  const navigate = useNavigate()
  return (
    <div style={{padding:20}}>
      <h1>Profile</h1>
      <p>User profile will appear here</p>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  )
}

export default Profile

import React from "react"
import { useNavigate } from "react-router-dom"

function Groups(){
  const navigate = useNavigate()
  return (
    <div style={{padding:20}}>
      <h1>My Groups</h1>
      <p>Group list will appear here</p>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  )
}

export default Groups
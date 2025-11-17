import React from "react"
import { useNavigate } from "react-router-dom"

function Profile(){
  const navigate = useNavigate()
  return (
    <div style={{padding:20}}>
      <h1>Films</h1>
      <p>Films will be here</p>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  )
}

export default Films

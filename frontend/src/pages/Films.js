import React from "react"
import "../index.css"
import Header from '../components/header.jsx'

function Films(){
  return (
    <div className="container">
      <Header/>
      <h1>Films</h1>
      <p>Films will be here</p>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  )
}

export default Films

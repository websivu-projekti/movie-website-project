import React, { useState } from "react"
import { Link } from "react-router-dom"
import "../loginsignup.css"
import Header from '../components/header.jsx'

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Login submitted", { username, password })
  }

  return (
    <div className="container">
      <Header/>
      <div className="loginContent">
        <h1 className="title">Log In</h1>
        <form className="loginForm" onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Username</label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input"
            />
          </div>
          <div className="field">
            <label className="label">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
          </div>
          <button type="submit" className="button">
            Log In
          </button>
        </form>
        <Link to="/signup" className="link">
          Not yet an user? Sign up here!
        </Link>
      </div>
      
    </div>
  )
}

export default Login

import React, { useState } from "react"
import { Link } from "react-router-dom"
import "../index.css"
import Header from '../components/header.jsx'

function SignUp() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Sign up submitted", { username, email, password })
  }

  return (
    <div className="container">
      <Header/>
      <div className="loginContent">
        <h1 className="title">Sign Up</h1>
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
            <label className="label">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            Sign Up
          </button>
        </form>
        <Link to="/login" className="link">
          Already a user? Log in here!
        </Link>
      </div>

    </div>
  )
}

export default SignUp
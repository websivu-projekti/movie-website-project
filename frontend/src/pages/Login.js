import React, { useState } from "react"
import { useAuth } from "../context/AuthContext.js"
import { Link, useNavigate } from "react-router-dom"
import "../loginsignup.css"
import Header from '../components/header.jsx'

function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Login failed")
      }

      
      login(data.token)

      // Redirect to profile
      navigate("/profile")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <Header/>
      <div className="loginContent">
        <h1 className="title">Log In</h1>
        {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
        <form className="loginForm" onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required
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
              required
            />
          </div>
          <button type="submit" className="button" disabled={loading}>
            {loading ? "Logging In..." : "Log In"}
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
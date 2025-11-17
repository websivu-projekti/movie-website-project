import React, { useState } from "react"
import { Link } from "react-router-dom"
/*import "./Login.css"*/

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
      <h1 className="title">Sign Up</h1>
      <form className="form" onSubmit={handleSubmit}>
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
  )
}

export default SignUp

const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start", 
      minHeight: "100vh",
      paddingTop: "50px",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      fontSize: "2rem",
      marginBottom: "20px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      width: "300px",
    },
    field: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    label: {
      width: "80px",
      fontSize: "1rem",
    },
    input: {
      flex: 1,
      padding: "8px",
      fontSize: "1rem",
      color: "#000",
      border: "1px solid #ccc",
      borderRadius: "4px",
    },
    button: {
      padding: "10px",
      fontSize: "1rem",
      backgroundColor: "#007BFF",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      borderRadius: "4px",
    },
    link: {
      marginTop: "10px",
      textAlign: "center",
      color: "#007BFF",
      textDecoration: "none",
      fontSize: "0.9rem",
    },
  } 
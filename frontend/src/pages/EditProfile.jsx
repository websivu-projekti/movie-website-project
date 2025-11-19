import React, { useState } from "react";
import "../EditProfile.css";
import Header from '../components/header.jsx'

function SignUp() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Password change submitted", { username, email, password })
  }

  return (
    <div className="container">
      <Header/>
      <div className="content">
          <h1 className="editTitle">Edit Profile</h1>
          <div className="imageContainer">
            <img src="" alt="Profile picture" className="pfp"></img>
          </div>
            <button type="submit" className="changePfp button">
              Change Profile Picture
            </button>
            <form className="accessibility">
              <h4>
                Settings
              </h4>
              <div className="field">
                <input type="checkbox" />
                <label className="label">Dyslexia friendly font</label>
              </div>
              <div className="field">
                <input type="checkbox" />
                <label className="label">Text-to-Speech</label>
              </div>
              <div className="field">
                <input type="checkbox" />
                <label className="label">Autoplay content</label>
              </div>
              <div className="field">
                <input type="checkbox" />
                <label className="label">Show adult content</label>
              </div>
            </form>
          <form className="manageUser" onSubmit={handleSubmit}>
            <div className="field usrnameField">
              <label className="label">Username</label>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input"
              />
            </div>
            <div className="field emailField">
              <label className="label">Email</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
              />
            </div>
            <div className="field passwordField">
              <label className="label">Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
              />
            </div>
            <button type="submit" className="changeBtn button">
              Change Password
            </button>
            <button className="deleteButton">
              Delete Account
            </button>
          </form>
        </div>
        </div>
  );
}

export default SignUp;
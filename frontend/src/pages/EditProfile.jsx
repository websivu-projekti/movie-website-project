
import React, { useState } from "react";
import "../EditProfile.css";
import Header from '../components/header.jsx'

function EditProfile() {
  //const [password, setPassword] = useState("")
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault()

    console.log("Password change submitted", { 
      currentPassword,
      newPassword,
      newPasswordConfirm })
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
              <label className="label">Current password</label>
              <input
                type="password"
                placeholder="Type current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="input"
              />
            </div>
            <div className="field emailField">
              <label className="label">New password</label>
              <input
                type="password"
                placeholder="Type new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="input"
              />
            </div>
            <div className="field passwordField">
              <label className="label">New password again</label>
              <input
                type="password"
                placeholder="New password again"
                value={newPasswordConfirm}
                onChange={(e) => setNewPasswordConfirm(e.target.value)}
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

export default EditProfile;
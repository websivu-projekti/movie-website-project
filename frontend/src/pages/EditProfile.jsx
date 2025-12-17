import React, { useState, useEffect } from "react";
import "../EditProfile.css";
import Header from '../components/header.jsx'
import { useAuth } from "../context/AuthContext.js";
import {pf1, pf2, pf3, pf4, pf5, pf6, pf7, pf8, pf9} from "../App.js"
import closeMenu from "../assets/closemenu.svg"


function EditProfile() {
  const { user } = useAuth()
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const [showChangePfp, setShowChangePfp] = useState(false)
  const [ pfp_url, setNewPfp ] = useState()
  const [ userData, setUserData ] = useState([])
  const [ userPfp, setUserPfp ] = useState("pf1")

  useEffect(() =>{
    fetchUserInfo()
    setLoading(false)
  }, [])

  const handleChangePassword = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (newPassword !== newPasswordConfirm) {
      alert("New passwords do not match")
      setLoading(false)
      return;
    }

    try {

      const token = localStorage.getItem("token");


      const response = await fetch("http://localhost:3001/auth/editprofile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Password change failed")
      }

      if (data.token) {
        localStorage.setItem("token", data.token)
      }
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user))
      }

      alert("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setNewPasswordConfirm("");

    } catch (err) {
      setError(err.message)
      console.error("Password change error:", err)
    } finally {
      setLoading(false)
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm(`Haluatko varmasti poistaa käyttäjäsi, ${user.username}? Toimintoa ei voi perua.`)) {
      try {
        const response = await fetch("http://localhost:3001/auth/account", {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
          body: JSON.stringify({ username: user.username })
        });

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch profile")
        }

        alert('Käyttäjä poistettu onnistuneesti.')
        logout()
        navigate('/')

      } catch (err) {
        alert(`Error: ${error.message}`)
      }
    }
  }

    const fetchUserInfo = async () => {
        try {
            const response = await fetch(`http://localhost:3001/auth/profile/${user.userId}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const data = await response.json()
            setUserPfp(data.user.pfp_url)
            setUserData(data.user)
        } catch (err) {
            setError(err.message)
        }
    }

  const openChangePfp = () => {
    setShowChangePfp(!showChangePfp)
  }
  const closeChangePfp = () => {
    setShowChangePfp(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/auth/editprofile/pfp", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
        body: JSON.stringify({ pfpUrl: pfp_url }),
      });
      const data = await response.json()

      if(response.ok){
        closeChangePfp()
      }else{
        throw new Error(data.error || "An error occurred while changing profile picture")
      }
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className="container">
      <Header />
      <div className="content">
        <h1 className="editTitle">Edit Profile</h1>
        <div className="imageContainer">
          {loading ? (
            <p>Loading profile picture...</p>
          ) : (
            <img src={require(`../assets/icons/${userPfp}.png`)} alt="Profile picture" className="editPfp"></img>
          )}
        </div>
        <button type="submit" className="changePfp button" onClick={openChangePfp}>
          Change Profile Picture
        </button>
        <form className="accessibility">
          <h3>
            Settings
          </h3>
          <div className="field">
            <input type="checkbox" />
            <label className="settingsLabel">Dyslexia friendly font</label>
          </div>
          <button type="submit" className="saveSettings button">
            Save Settings
          </button>
        </form>
        <form className="manageUser" onSubmit={handleChangePassword}>
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
          <button onClick={handleDeleteAccount} className="deleteButton">
            Delete Account
          </button>
        </form>
      </div>
      {showChangePfp &&
        <div className="pfpMenuContainer">
          <div className="pfpMenu">
            <h2 className="pfpMenuTitle">Change profile picture</h2>
            <button className="closePfpMenu" onClick={closeChangePfp}>
              <img src={closeMenu} />
            </button>
            <form className="choosePfpForm">
              <label className="choosePfpLabel pfpIconLabel"> Choose profile picture: </label>
              <div className="pfpIconGrid">
                <label className="pfpIconLabel">
                  <input type="radio"
                    className="pfpIconRadio"
                    name="profilePicture"
                    value="pf1"
                    onChange={(e) => {
                      setNewPfp(e.target.value)
                    }}
                  />
                  <img className="createPfpIcon" src={pf1} alt="Icon option 1, dog with green background" />
                </label>
                <label className="pfpIconLabel">
                  <input type="radio"
                    className="pfpIconRadio"
                    name="profilePicture"
                    value="pf2"
                    onChange={(e) => {
                      setNewPfp(e.target.value)
                    }}
                  />
                  <img className="createPfpIcon" src={pf2} alt="Icon option 2, dog with yellow background" />
                </label>
                                <label className="pfpIconLabel">
                  <input type="radio"
                    className="pfpIconRadio"
                    name="profilePicture"
                    value="pf3"
                    onChange={(e) => {
                      setNewPfp(e.target.value)
                    }}
                  />
                  <img className="createPfpIcon" src={pf3} alt="Icon option 3, bunny with blue background" />
                </label>
                                <label className="pfpIconLabel">
                  <input type="radio"
                    className="pfpIconRadio"
                    name="profilePicture"
                    value="pf4"
                    onChange={(e) => {
                      setNewPfp(e.target.value)
                    }}
                  />
                  <img className="createPfpIcon" src={pf4} alt="Icon option 4, fish with violet background" />
                </label>
                                <label className="pfpIconLabel">
                  <input type="radio"
                    className="pfpIconRadio"
                    name="profilePicture"
                    value="pf5"
                    onChange={(e) => {
                      setNewPfp(e.target.value)
                    }}
                  />
                  <img className="createPfpIcon" src={pf5} alt="Icon option 5, fish with pink background" />
                </label>
                                <label className="pfpIconLabel">
                  <input type="radio"
                    className="pfpIconRadio"
                    name="profilePicture"
                    value="pf6"
                    onChange={(e) => {
                      setNewPfp(e.target.value)
                    }}
                  />
                  <img className="createPfpIcon" src={pf6} alt="Icon option 6, seagull with orange background" />
                </label>
                                <label className="pfpIconLabel">
                  <input type="radio"
                    className="pfpIconRadio"
                    name="profilePicture"
                    value="pf7"
                    onChange={(e) => {
                      setNewPfp(e.target.value)
                    }}
                  />
                  <img className="createPfpIcon" src={pf7} alt="Icon option 7, cat with yellow background" />
                </label>
                                <label className="pfpIconLabel">
                  <input type="radio"
                    className="pfpIconRadio"
                    name="profilePicture"
                    value="pf8"
                    onChange={(e) => {
                      setNewPfp(e.target.value)
                    }}
                  />
                  <img className="createPfpIcon" src={pf8} alt="Icon option 8, catfish with blue background" />
                </label>
                                <label className="pfpIconLabel">
                  <input type="radio"
                    className="pfpIconRadio"
                    name="profilePicture"
                    value="pf9"
                    onChange={(e) => {
                      setNewPfp(e.target.value)
                    }}
                  />
                  <img className="createPfpIcon" src={pf9} alt="Icon option 9, sharkhorse with pink background" />
                </label>
              </div>
              <button onClick={handleSubmit} className="choosePfpBtn">Set profile picture</button>
            </form>
          </div>
        </div>
      }
    </div>
  );
}

export default EditProfile;
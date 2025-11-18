import React, { useState } from "react";
import "./EditProfile.css";

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
      <h1 className="title">Edit Profile</h1>
      <div className="row">
        <div className="column">
          <div className="imageContainer">
            <img src="" alt="Profile picture" className="image"></img>
          </div>
          <div style={{ marginTop: "15px", textAlign: "start" }}>
            <button type="submit" className="button">
              Change Profile Picture
            </button>
            <h4>
              Settings
            </h4>
            <form className="form">
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
          </div>
        </div>
        <div className="column">
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
              Change Password
            </button>
            <button className="deleteButton">
              Delete Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

  /*const styles = {
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
      fontWeight: "bold",
    },

    row: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      gap: "100px",
      width: "100%",
      maxWidth: "800px",
    },
    column: {
      flex: 1,
      padding: "20px",
      textAlign: "start",
    },
    image: {
      width: "150px",
      height: "150px",
      objectFit: "cover",
    },
    imageContainer: {
      width: "250px",
      height: "250px",
      backgroundColor: "#e0e0e0",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      textAlign: "center",
      borderRadius: "8px",
      border: "8px solid #ccc",
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
      width: "200px",
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
  };*/
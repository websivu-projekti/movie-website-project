import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home" 
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import EditProfile from "./pages/EditProfile"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/editprofile" element={<EditProfile />} />
      </Routes>
    </Router>
  )
}

export default App
import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home" 
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import EditProfile from "./pages/EditProfile"
import MovieList from "./pages/MovieList"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/my-lists" element={<MovieList />} />
      </Routes>
    </Router>
  )
}

export default App
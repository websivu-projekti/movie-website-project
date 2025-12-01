import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import Home from "./pages/Home"
import Cinema from "./pages/Cinema"
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import EditProfile from "./pages/EditProfile"
import MovieList from "./pages/MovieList"
import MyGroups from "./pages/MyGroups"
import Films from "./pages/Films"


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cinema" element={<Cinema />} />
          <Route path="/films" element={<Films />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cinema" element={<Cinema />} />
          <Route path="/films" element={<Films />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/mylists" element={<MovieList />} />
          <Route path="/mygroups" element={<MyGroups />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
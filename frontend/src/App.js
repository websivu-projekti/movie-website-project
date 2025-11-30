import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Cinema from "./pages/Cinema"
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import EditProfile from "./pages/EditProfile"
import MovieList from "./pages/MovieList"
import Groups from "./pages/Groups"
import Films from "./pages/Films"
import MovieInfo from "./pages/MovieInfo"


function App() {
  return (
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
        <Route path="/movielist" element={<MovieList />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/movieinfo/:movieId" element={<MovieInfo />} />
      </Routes>
    </Router>
  )
}
export default App
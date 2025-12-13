import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import Home from "./pages/Home" 
import Cinema from "./pages/Cinema"
import Profile from "./pages/Profile"
import UserProfile from "./pages/UserProfile"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import EditProfile from "./pages/EditProfile"
import MovieList from "./pages/MovieList"
import MyGroups from "./pages/MyGroups"
import Films from "./pages/Films"
import GroupsList from "./pages/GroupsList"
import GroupDetail from "./pages/GroupDetail"
import MovieInfo from "./pages/MovieInfo"
import SeriesInfo from "./pages/SeriesInfo"
import FavouriteList from "./pages/FavouriteList"
import UsersFavouriteList from "./pages/UsersFavouriteList"
import SearchResults from "./pages/SearchResults"


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cinema" element={<Cinema />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cinema" element={<Cinema />} />
          <Route path="/films" element={<Films />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:userId" element={<UserProfile />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/mylist" element={<MovieList />} />
          <Route path="/mygroups" element={<MyGroups />} />
          <Route path="/groupslist" element={<GroupsList/>}/>
          <Route path="/groupdetail/:groupId" element={<GroupDetail/>}/>
          <Route path="/movieinfo/:movieId" element={<MovieInfo />} />
          <Route path="/seriesinfo/:seriesId" element={<SeriesInfo />} />
          <Route path="/profile/favouritelist" element={<FavouriteList />} />
          <Route path="/profile/favouritelist/:userId" element={<UsersFavouriteList />} />
          <Route path="/searchresults/:query" element={<SearchResults/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App

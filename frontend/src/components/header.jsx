import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import searchIcon from "../assets/searchicon.svg"

export default function Header(){
    const navigate = useNavigate()
    const [ searchQuery, setSearchQuery ] = useState('')
    const { user, logout } = useAuth()
    const handleLogout = () => {
        logout()
        navigate("/")
    }
    const sections = [
        { label: "Films", path: "/films" }, 
        { label: "Now in Cinemas", path: "/cinema" }, 
        { label: "Groups", path: "/groupslist" }, 
        { label: "Profile", path: "/profile" }
    ]

    const submitSearch = () =>{
        try {
            localStorage.setItem('Search_Query', JSON.stringify(searchQuery))
            const data = localStorage.getItem('Search_Query')
            if (data !== null) setSearchQuery(JSON.parse(data))
            console.log(searchQuery)
            navigate(`/searchresults/${searchQuery}`)
      } catch (err) {
        console.error("Virhe haettaessa elokuvia:", err)
      }
    }

    return(
        <>
            <header>
                <a href="/" className="pageTitle">🎬 Clipper</a>
                <div className="loginBar">
                    {user ? (
                        <button onClick={handleLogout} className="registerBtn">Log Out</button>
                    ) : (
                        <>
                            <a href="/login" className="loginBtn">Log In</a>
                            <a href="/signup" className="registerBtn">Register</a>
                        </>
                    )}
                </div>
                <div className="searchBox">
                        <input 
                        type="text" 
                        placeholder="Search movies..." 
                        className="searchInput"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button className="searchBtn" onClick={submitSearch}><img src={searchIcon}/></button>
                </div>
            </header>
            <div className="buttonBox">
                {sections.map(section => (
                    <button
                        key={section.label}
                        className="menuButton"
                        onClick={() => navigate(section.path)}
                    >
                        {section.label}
                    </button>
                ))}
            </div>
        </>
        
    )
}
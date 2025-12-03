import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import searchIcon from "../assets/searchicon.svg"

export default function Header({searchQuery, setSearchQuery}){
    const navigate = useNavigate()
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

    const submitSearch = async () =>{
        try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/movies/moviesearch/${searchQuery}`)
        if (!res.ok) throw new Error("Verkkovirhe")
        const data = await res.json()
        console.log(data)
      } catch (err) {
        console.error("Virhe haettaessa elokuvia:", err)
      }
    }

    return(
        <>
            <header>
                <a href="/" class="pageTitle">🎬 Clipper</a>
                <div class="loginBar">
                    {user ? (
                        <button onClick={handleLogout} className="registerBtn">Log Out</button>
                    ) : (
                        <>
                            <a href="/login" className="loginBtn">Log In</a>
                            <a href="/signup" className="registerBtn">Register</a>
                        </>
                    )}
                </div>
                <div class="searchBox">
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
            <div class="buttonBox">
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
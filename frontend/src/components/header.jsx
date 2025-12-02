import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { use } from "react"

export default function Header(){
    const navigate = useNavigate()
    const { user, logout } = useAuth()
    const handleLogout = () => {
        logout()
        navigate("/")
    }
    const sections = [
        { label: "Films", path: "/films" }, 
        { label: "Now in Cinemas", path: "/cinema" }, 
        { label: "My groups", path: "/mygroups" }, 
        { label: "Profile", path: "/profile" }
    ]
    return(
        <>
            <header>
                <a href="/" class="pageTitle">🎬 Clipper</a>
                <div class="loginBar">
                    {user ? (
                        <button onClick={handleLogout} className="registerBtn">Log Out</button>
                    ) : (
                        <>
                            <a href="/login" class="loginBtn">Log In</a>
                            <a href="/signup" class="registerBtn">Register</a>
                        </>
                    )}
                </div>
                <div class="searchBox">
                    <input type="text" placeholder="Search movies..." class="searchInput" />
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
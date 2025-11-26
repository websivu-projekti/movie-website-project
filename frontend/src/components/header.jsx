
import { useNavigate } from "react-router-dom"

export default function Header(){
    const navigate = useNavigate()
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
                    <a href="/login" class="loginBtn">Log In</a>
                    <a href="/signup" class="registerBtn">Register</a>
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

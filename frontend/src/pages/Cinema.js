import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "../index.css"

function Home() {
  const navigate = useNavigate()
  const sections = [
    { label: "Films", path: "/" },
    { label: "Now in Cinemas", path: "/cinema" },
    { label: "My groups", path: "/groups" },
    { label: "Profile", path: "/profile" }
  ]
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/movies/now-playing`)
        if (!res.ok) throw new Error("Verkkovirhe")
        const data = await res.json()
        setMovies(data.map(m => m.title))
      } catch (err) {
        console.error("Virhe haettaessa elokuvia:", err)
        setMovies(["Movie 1", "Movie 2", "Movie 3", "Movie 4"]) // placeholder jos backend ei toimi
      } finally {
        setLoading(false)
      }
    }
    fetchMovies()
  }, [])

  return (
    <div className="container">
     <header>
        <h1 className="title">🎬 Clipper</h1>
        <div className="loginBar">
          <button className="loginBtn">Log In</button>
          <button className="registerBtn">Register</button>
        </div>
        <div className="searchBox">
          <input type="text" placeholder="Search movies..." className="searchInput" />
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

      <h2>Currently playing in theaters</h2>


      {loading
        ? <p>Ladataan elokuvia...</p>
        : <div className="movieRow">
            {movies.map((movie, index) => (
              <div key={index} className="movieCard">{movie}</div>
            ))}
          </div>
      }
    </div>
  )
}

export default Home;

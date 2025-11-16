import React, { useEffect, useState } from "react"
import "../index.css"

function Home() {
  const sections = ["Films", "Now in Cinemas", "My groups", "Profile"]
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
    <div class="container">
     <header>
        <h1 class="title">🎬 Clipper</h1>
        <div class="loginBar">
          <button class="loginBtn">Log In</button>
          <button class="registerBtn">Register</button>
        </div>
        <div class="searchBox">
          <input type="text" placeholder="Search movies..." class="searchInput" />
        </div>
      </header>
      <div class="buttonBox">
        {sections.map(section => (
          <button key={section} class="menuButton">{section}</button>
        ))}
      </div>

      {loading
        ? <p>Ladataan elokuvia...</p>
        : <div class="movieRow">
            {movies.map((movie, index) => (
              <div key={index} class="movieCard">{movie}</div>
            ))}
          </div>
      }
    </div>
  )
}

export default Home;

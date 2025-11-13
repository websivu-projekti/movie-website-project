import React, { useEffect, useState } from "react"

function Home() {
  const sections = ["Films", "Now on Cinema", "My groups", "Profile"]
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
    <div style={styles.container}>
     <header style={styles.header}>
        <h1 style={styles.title}>🎬 Movie Website</h1>
        <div style={styles.searchBox}>
          <input type="text" placeholder="Search movies..." style={styles.searchInput} />
        </div>
      </header>
      <div style={styles.buttonBox}>
        {sections.map(section => (
          <button key={section} style={styles.sectionButton}>{section}</button>
        ))}
      </div>

      {loading
        ? <p>Ladataan elokuvia...</p>
        : <div style={styles.movieRow}>
            {movies.map((movie, index) => (
              <div key={index} style={styles.movieCard}>{movie}</div>
            ))}
          </div>
      }
    </div>
  )
}


// testi Tyylit
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    color: "#fff",
    backgroundColor: "#1e1e1e",
    minHeight: "100vh",
    padding: "1rem",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
  },
  title: { fontSize: "2rem", color: "#ff6b00" },
  searchBox: { backgroundColor: "#2a2a2a", padding: "0.5rem", borderRadius: "8px" },
  searchInput: { padding: "0.5rem", borderRadius: "4px", border: "none", width: "200px" },
  buttonBox: {
    backgroundColor: "#2a2a2a",
    borderRadius: "8px",
    padding: "1rem",
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "1rem",
  },
  sectionButton: { padding: "0.5rem 1rem", backgroundColor: "#3a3a3a", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" },
  movieRow: { display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "0.5rem" },
  movieCard: { backgroundColor: "#3a3a3a", borderRadius: "4px", padding: "0.5rem", textAlign: "center", minWidth: "80px" },
};

export default Home;

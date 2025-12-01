import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Header from '../components/header.jsx'
import "../index.css"
import "./GroupDetail.css" 

const TMDB_API_KEY = process.env.TMDB_API_KEY

function GroupDetail() {
  const { groupId } = useParams()
  const [movies, setMovies] = useState([])
  const members = [
    { name: "User 1", img: "" },
    { name: "User 2", img: "" },
    { name: "User 3", img: "" },
    { name: "User 4", img: "" },
    { name: "User 5", img: "" },
    { name: "User 6", img: "" },
    { name: "User 7", img: "" },
    { name: "User 8", img: "" },
    { name: "User 9", img: "" }
  ];
  const moviesSeriesCount = "1 movie, 2 series"

  async function fetchMovies(movieIds) {
    if (!movieIds || !Array.isArray(movieIds)) return []

    if (!TMDB_API_KEY) {
      console.error("TMDB_API_KEY puuttuu!")
      return getPlaceholderMovies(movieIds.length)
    }

    const fetchedMovies = await Promise.all(
      movieIds.map(async (id) => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US&append_to_response=credits,watch/providers,release_dates`
          )
          if (!response.ok) throw new Error("API error")
          const data = await response.json()

          let theatricalDate = "No showtimes"
          const releases = data.release_dates?.results || []
          const countryRelease = releases.find(r => r.iso_3166_1 === "US" || r.iso_3166_1 === "FI")
          if (countryRelease && countryRelease.release_dates?.length > 0) {
            theatricalDate = `Theatrical release: ${countryRelease.release_dates[0].release_date}`
          }

          return {
            id: data.id,
            title: data.title || "Untitled",
            year: data.release_date ? data.release_date.split("-")[0] : "N/A",
            director: data.credits?.crew?.find(c => c.job === "Director")?.name || "Unknown",
            image: data.poster_path ? `https://image.tmdb.org/t/p/w300${data.poster_path}` : "",
            showtimes: [theatricalDate],
            services: data["watch/providers"]?.results?.US?.flatrate?.map(p => p.provider_name) || [],
            rating: data.vote_average ? Math.round(data.vote_average / 2) : 0
          };
        } catch (err) {
          console.warn(`Movie ${id} fetch failed:`, err)
          return getPlaceholderMovie(id)
        }
      })
    );

    return fetchedMovies
  }

  function getPlaceholderMovie(id) {
    return {
      id,
      title: `Placeholder Movie ${id}`,
      year: "N/A",
      director: "Unknown",
      image: "",
      showtimes: ["No showtimes"],
      services: [],
      rating: 0
    };
  }

  function getPlaceholderMovies(count) {
    return Array.from({ length: count }, (_, i) => getPlaceholderMovie(i + 1))
  }

  useEffect(() => {
    const movieIds = [550, 299536]; // Esimerkkielokuva-ID:t
    fetchMovies(movieIds).then(setMovies)
  }, [])

  // ADDED: valmiiksi kommentoitu backend-haku tulevaisuutta varten
  /*
  useEffect(() => {
    async function fetchGroupMovies() {
      try {
        const response = await fetch(`/api/groups/${groupId}/movies`)
        if (!response.ok) throw new Error("Backend fetch failed")
        const data = await response.json()
        setMovies(data.movies)
      } catch (err) {
        console.error(err)
      }
    }

    if (groupId) {
      fetchGroupMovies()
    }
  }, [groupId])
  */

  return (
    <div>
      <Header />

      <div className="group-container">
        <div className="group-header">
          <h1 className="group-title">
             {`Group ${groupId}` || "Group List Name"} // näyttää valitun ryhmän
          </h1>
          <div className="group-info-row">
            <span className="group-info-text">{moviesSeriesCount}</span>
            <div className="group-buttons">
              <button>Edit list</button>
              <button>Manage users</button>
              <button>Leave group</button>
            </div>
            <div className="group-info-share-row">
              <div className="share-list">
                <span className="group-info-text">Share list:</span>
                <input
                  className="share-input"
                  value={`https://url.com/list_${groupId || "name"}`} 
                  readOnly
                />
              </div>
              <button className="group-buttons">Copy link</button>
            </div>
          </div>
        </div>

        <div className="group-members">
          Members ({members.length}):
        </div>
        <div className="members-list">
          {members.slice(0, 4).map((member, index) => (
            <div key={index} className="member">
              <img src={member.img || ""} alt={member.name} />
              <span>{member.name}</span>
            </div>
          ))}
          <span className="see-all">, See all...</span>
        </div>

        <div className="group-content">
          {movies.map((movie) => (
            <div key={movie.id} className="group-movie-card-wrapper">
              <div className="group-movie-card">
                <div className="group-movie-image">
                  {movie.image ? <img src={movie.image} alt={movie.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} /> : "Image"}
                </div>
                <div className="group-movie-title">{movie.title}</div>
                <div className="group-movie-details">{movie.year} | {movie.director}</div>

                <div className="group-movie-extra">
                  <div className="showtimes">
                    <div className="showtimes-header">Showtimes</div>
                    {movie.showtimes.map((time, i) => (
                      <div key={i} className="showtime-entry">{time}</div>
                    ))}
                  </div>

                  <div className="services">
                    <div className="services-header">Services</div>
                    {movie.services.length ? movie.services.map((service, i) => (
                      <div key={i} className="service-entry">
                        <span className="service-icon"></span> {service}
                      </div>
                    )) : <div className="service-entry">Not available</div>}
                  </div>

                  <div className="group-movie-rating">
                    {[1,2,3,4,5].map((star) => (
                      <span key={star} className={`star ${star <= movie.rating ? "filled" : ""}`}>&#9733;</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GroupDetail

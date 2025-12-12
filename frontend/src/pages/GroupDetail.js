import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Header from '../components/header.jsx'
import "../index.css"
import "./GroupDetail.css" 

const TMDB_API_KEY = process.env.TMDB_API_KEY

function GroupDetail() {
  const {groupId} = useParams()
  const [movies, setMovies] = useState([])
  const [ groupInfo, setGroupInfo ] = useState([])
  const [ groupMembers, setGroupMembers ] = useState([])
  const [ error, setError ] = useState(null)
  const [loading, setLoading] = useState(true)
  const moviesSeriesCount = "1 movie, 2 series"

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
    async function fetchGroupInfo(){
      try{
        const res = await fetch(`${process.env.REACT_APP_API_URL}/groups/group/${groupId}`)
        if(!res.ok){
          if(res.status === 404){
            setError("Group not found")
          }else{
            const text = await res.text()
            setError(`Error fetching movie: ${res.status} ${text}`)
          }
          return
      }
      
      const data = await res.json()
      setGroupInfo(data.group)
      setGroupMembers(data.groupMembers)
    }catch(err){
      console.error(err)
    } finally{
      setLoading(false)
    }
    }
    fetchGroupInfo()
  }, [groupId])

  if(loading){
    return(
      <div className ="container">
          <p>Loading group...</p>
        </div>
    )
  }

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
      <Header/>

      <div className="group-container">
        <div className="group-header">
          <h1 className="group-title">
             {`${groupInfo.group_name}` || "Group List Name"}
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
                <span className="group-info-text">Share list</span>
                <input
                  className="share-input"
                  value={`https://url.com/list_${groupInfo.group_id || "name"}`} 
                  readOnly
                />
              </div>
              <button className="group-buttons">Copy link</button>
            </div>
          </div>
        </div>

        <div className="group-members">
          Members ({groupMembers.length}):
        </div>
        <div className="members-list">
          {groupMembers.slice(0, 4).map((member, index) => (
            <div key={index} className="member">
              <img src={member.img || ""} />
              <span>{member.username}</span>
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

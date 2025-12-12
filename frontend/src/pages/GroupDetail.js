import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Header from '../components/header.jsx'
import "../index.css"
import "./GroupDetail.css" 
import { useAuth } from "../context/AuthContext.js"
import { Rating, Star } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

function GroupDetail() {
  const {groupId} = useParams()
  const { user } = useAuth()
  const [ movies, setMovies] = useState([])
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

  const customRating = {
        itemShapes: Star,
        activeFillColor: '#90e339',
        inactiveFillColor: '#cdf0a8'
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

  useEffect(() =>{
    if(user && user.token){
      fetchGroupContent()
    }
  }, [user])

  async function fetchGroupContent(){
      try{
        const res = await fetch(`${process.env.REACT_APP_API_URL}/groups/groupcontent/${groupId}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        if(!res.ok){
          if(res.status === 404){
            setError("Group content not found")
          }else{
            const text = await res.text()
            setError(`Error fetching group content: ${res.status} ${text}`)
          }
          return
      }
      
      const data = await res.json()
      setMovies(data.content)
      }catch(err){
        console.error(err)
      }finally{
        setLoading(false)
      }
    }

  if(loading){
    return(
      <div className ="container">
          <p>Loading group...</p>
        </div>
    )
  }

  return (
    <div className="container">
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
            <div key={movie.tmdb_id} className="group-movie-card-wrapper">
              <div className="group-movie-card">
                <div className="group-movie-image">
                  {movie.poster_url ? <img className="group-movie-image"src={movie.poster_url} alt={movie.title} /> : "Image"}
                </div>
                <div className="group-movie-title"><a className="group-movie-title" href={`/movieinfo/${movie.tmdb_id}`}>{movie.title}</a></div>
                <div className="group-movie-details">{movie.release_year} | {movie.director}</div>

                <div className="group-movie-extra">
                  <div>{movie.genre}</div>
                  <div className="group-movie-rating">
                    <Rating 
                      className="movieRating" 
                      readOnly 
                      style={{ maxWidth: 250 }} 
                      value={(movie.vote_average / 2)}
                      itemStyles={customRating}
                    />
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

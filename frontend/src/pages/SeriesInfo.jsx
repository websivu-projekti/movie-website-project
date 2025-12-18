import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext.js";
import "./MovieInfo.css"
import Header from '../components/header.jsx'
import AddToGroup from "../components/addtogroup.jsx"
import { Rating, Star } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'


function SeriesInfo(){
  const {seriesId} = useParams();
  const { user } = useAuth()
  const [series, setSeries] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavourited, setIsFavourited] = useState(false)
  const [favouriteLoading, setFavouriteLoading] = useState(false)
  const [myReviews, setMyReviews] = useState([]);
  const [reviewContent, setReviewContent] = useState("");
  const [rating, setRating] = useState(0)
  const [ myGroups, setMyGroups ] = useState([])
  const [ addedtoGroup, setAddedtoGroup ] = useState()
  const [ userPfp, setUserPfp ] = useState("null")


  useEffect(() => {
    async function fetchSeries(){
      try{
        const res = await fetch(`${process.env.REACT_APP_API_URL}/movies/seriesDetails/${seriesId}`)
        if (!res.ok) {
          if (res.status === 404) {
            setSeries(null);
            setError("Series not found");
          } else {
            const text = await res.text();
            setError(`Error fetching series: ${res.status} ${text}`);
          }
          return;
        }

        const data = await res.json();
        setSeries(data);
      } catch(err){
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    async function fetchReviews(){
      try{
        const res = await fetch(`${process.env.REACT_APP_API_URL}/reviews/${seriesId}`)
        if (res.ok) {
          const data = await res.json();
          setMyReviews(data);
        }
      } catch(err){
        console.error("Error fetching reviews:", err)
      }
    }

    fetchSeries()
    fetchReviews()
    }, [seriesId])

    useEffect(() => {
      const fetchUserInfo = async () => {
        if (user && user.token) {
          try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/profile`, {
              headers: {
                'Authorization': `Bearer ${user.token}`
              }
            })
            if (response.ok) {
              const data = await response.json()
              setUserPfp(data.user.pfp_url)
            }
          } catch (err) {
            console.error("Error fetching user info:", err)
          }
        }
      }

      if (user && user.token && seriesId) {
        checkIfFavourited()
        getUserGroups()
        fetchUserInfo()
      }
    }, [user, seriesId])

    const checkIfFavourited = async () => {
      try {
        console.log('Checking if favourited with tmdbId:', seriesId)
        const response = await fetch(`${process.env.REACT_APP_API_URL}/favourites/check?tmdbId=${seriesId}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        const data = await response.json()
        console.log('Check favourite response:', data)
        if (response.ok) {
          setIsFavourited(data.isFavourited)
          console.log('Set isFavourited to:', data.isFavourited)
        }
      } catch (err) {
        console.error("Error checking favourite status:", err)
      }
    }

    const getUserGroups = async () => {
        try{
          console.log("getting users groups with userId: ", user.userId)
          const response = await fetch(`${process.env.REACT_APP_API_URL}/groups/usersgroups`, {
          headers: {
              'Content-Type' : 'application/json',
              'Authorization': `Bearer ${user.token}`
            }
          })
          const data = await response.json()
          if(response.ok){
            setMyGroups(data.groups)
            console.log(myGroups)
          } else{
            setError(data.error || "Failed to fetch user's groups")
          }
        }catch(error){
          console.error("Error finding user's groups: ", error)
        }
      }

    const handleAddToGroup = async () => {
      if(!user){
        alert("Kirjaudu sisään lisätäksesi elokuvia tai sarjoja ryhmiin")
        return
      }

      try{
        const saveResponse = await fetch(`${process.env.REACT_APP_API_URL}/movies/saveFromTMDB`, {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({
            tmdbId: seriesId,
            title: series.name,
            releaseYear: series.release,
            genre: series.genres || 'Unknown',
            description: series.synopsis,
            posterUrl: series.poster_path ? `https://image.tmdb.org/t/p/w342${series.poster_path}` : null,
            contentType: 'series'
          })
        })

        if (!saveResponse.ok) {
          const errorText = await saveResponse.text()
          throw new Error(`Failed to save series: ${errorText}`)
        }

        const saveData = await saveResponse.json()
        
        if (!saveData.content_id) {
          console.error('saveData:', saveData)
          throw new Error("No content_id returned from saveFromTMDB")
        }

        console.log('Saving to group with content_id: ', saveData.content_id, 'and groupId: ', addedtoGroup)
        const contentId = saveData.content_id
        const groupId = addedtoGroup

        const response = await fetch(`${process.env.REACT_APP_API_URL}/groups/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
          body: JSON.stringify({ contentId, groupId })
        })

        const data = await response.json()

        if (response.ok) {
          alert("Sarja lisätty ryhmään!")
        } else {
          alert(data.error || "Virhe lisättäessä sarjaa ryhmään")
        }
      }catch(error){
        alert(`Error: ${error.message}`)
      }
    }

    const handleAddToFavorites = async () => {
      if (!user) {
        alert("Kirjaudu sisään lisätäksesi elokuvia suosikkeihin")
        return
      }

      setFavouriteLoading(true)
      try {
        const saveResponse = await fetch(`${process.env.REACT_APP_API_URL}/movies/saveFromTMDB`, {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json',
          },
          body: JSON.stringify({
            tmdbId: seriesId,
            title: series.name,
            releaseYear: series.release,
            genre: series.genres || 'Unknown',
            description: series.synopsis,
            posterUrl: series.poster_path ? `https://image.tmdb.org/t/p/w342${series.poster_path}` : null,
            contentType: 'series'
          })
        })

        if (!saveResponse.ok) {
          const errorText = await saveResponse.text()
          throw new Error(`Failed to save series: ${errorText}`)
        }

        const saveData = await saveResponse.json()
        
        if (!saveData.content_id) {
          console.error('saveData:', saveData)
          throw new Error("No content_id returned from saveFromTMDB")
        }
        
        console.log('Saving to favourites with content_id:', saveData.content_id)
        const contentId = saveData.content_id

        const response = await fetch(`${process.env.REACT_APP_API_URL}/favourites/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
          body: JSON.stringify({ contentId })
        })

        const data = await response.json()

        if (response.ok) {
          alert("Sarja lisätty suosikkeihin!")
          setIsFavourited(true)
        } else {
          alert(data.error || "Virhe lisättäessä sarjaa suosikkeihin")
        }
      } catch (err) {
        alert(`Error: ${err.message}`)
      } finally {
        setFavouriteLoading(false)
      }
    }

    const handleRemoveFromFavorites = async () => {
      if (!user) return

      setFavouriteLoading(true)
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/favourites/remove`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
          body: JSON.stringify({ tmdbId: seriesId })
        })

        if (response.ok) {
          alert("Sarja poistettu suosikeista!")
          setIsFavourited(false)
        } else {
          const data = await response.json()
          alert(data.error || "Virhe poistaessa sarjaa suosikeista")
        }
      } catch (err) {
        alert(`Error: ${err.message}`)
      } finally {
        setFavouriteLoading(false)
      }
    }


    if(loading){
      return (
        <div className ="container">
          <p>Loading series...</p>
        </div>
      )
    }

    if (!series) {
      return (
        <div className ="container">
          <Header/>
          <p>{error || "Series not found"}</p>
        </div>
      )
    }

      //hakee posterin
      const posterUrl = series.poster_path
    ? `https://image.tmdb.org/t/p/w342${series.poster_path}`
    : "/placeholder.jpg";

    //muokkaa rating tähdiksi
    function makeStars(rating) {
    if (rating == null) return "★★★★★" // default 
    const stars = Math.round(rating / 2) // 0–10 → 0–5
    return "★★★★★".slice(0, stars) + "☆☆☆☆☆".slice(0, 5 - stars)
    } 

    const customRating = {
      itemShapes: Star,
      activeFillColor: '#90e339',
      inactiveFillColor: '#fafdf8ff',
    }

    //yhdistää kirjoitetut arvostelut muihin
    const allReviews = [...myReviews, ...(series.reviews || [])];


    return (
    <div className="container">
      <Header/>

      <div className ="movieInfoWrapper">
      <div className = "imgContainer">
        <img src={posterUrl} alt={series.title}/>
      </div>

      <div className ="movieContainer">
        <div className ="infoContainer">
          <div className = "movieTitle">
            <h3>{series.name}</h3>
          </div>

          <div className="movieYear">Release year: {series.release}</div>

          <div className = "movieDirector">Director: {series.producers?.map((p, index) =>(
            <span key={index}>{p} </span>
          ))}</div>

          <div className ="movieSynopsis">{series.synopsis}</div>

          <div className = "movieGenres">
            <div className ="genreTitle"><p>Genres:</p></div>
            <div className = "genresWrapper">
              {series.genres?.map((g,index) => (
               <span key={index} className="genrePill">{g}</span>
              ))}
            </div>
          </div>
          <div className ="movieRating">
            Rating: {(series.rating / 2).toFixed(1)} - {makeStars(series.rating) || "N/A"}
            
          </div>
      </div>
    </div>


        <div className ="providerContainer">
          <h4>Where to watch:</h4>
          <div className="columnWrapped">

          {(!series.providers ||  series.providers.length === 0) && <p>No providers available</p>}

          {series.providers?.map((p) => (
            <div className ="providerWrapped" key={p.name}>
            {p.logo && <img className="providerIcon" src={p.logo} alt={p.name} />}
          <a
          href={p.link}
          target="_blank"
          rel="noopener noreferrer"
          className="providerLink"
          >
            {p.name}
          </a>
            </div> 
          ))}
          </div>

          <div className = "addToListContainer">
            <div className ="addListWrapped">
              {user ? (
                isFavourited ? (
                  <button
                  onClick={handleRemoveFromFavorites}
                  className="addToListBtn"
                  disabled={favouriteLoading}
                  style={{backgroundColor: '#ff4444'}}
                  >
                    {favouriteLoading ? 'Removing...' : 'Remove from Favourites'}
                  </button>
                ) : (
                  <button
                    onClick={handleAddToFavorites}
                    className="addToListBtn"
                    disabled={favouriteLoading}
                  >
                    {favouriteLoading ? 'Adding...' : 'Add to Favourites'}
                  </button>
                )
              ) : (
                <p>Login to add to favourites</p>
              )}
              <AddToGroup myGroups={myGroups} addedtoGroup={addedtoGroup} setAddedtoGroup={setAddedtoGroup}/>
              <button onClick={handleAddToGroup} className="addToListBtn">
                Add To Group
              </button>
          </div>
          </div>              

  </div>

  </div>

      <div className = "reviewContainer">

            {(!series.reviews || series.reviews.length === 0) && (
            <p>No reviews available</p>
            )}

      <h3>Reviews</h3>
        <div className="reviewsRowContainer">

          <div className = "reviewsColumn">
            
            {allReviews?.map((review,index) => (
              <div key = {index} className ="reviewBox">
               
                <div className ="reviewHeader">
                <img src={review.avatar && review.avatar.startsWith('http') ? review.avatar : require(`../assets/icons/${review.avatar || 'null'}.png`)}
                alt="Profile" 
                className="pfp"
                />
       
              <div className="reviewInfo">
                <div className ="nameRow">
                 <div className ="reviewName">{review.username}</div>
                  <div className ="reviewDate">{review.date}</div>
                </div>
                  <div className ="stars">{makeStars(review.rating)}</div>
              </div> 
              </div>          
               <div className="reviewText">{review.content}</div>
              </div>
         ))}
    </div>

         <div className = "myReviewContainer">

            <div className ="myReviewRow">
              <div className="profileAndName">
                   <img src={userPfp && userPfp.startsWith('http') ? userPfp : require(`../assets/icons/${userPfp || 'null'}.png`)} alt="Profile" className="pfp"/>
                <div className ="myReviewName">{user ? user.username : "Not logged in"}</div>
              </div>

                    <Rating 
                    className="reviewRating" 
                    style={{ maxWidth: 140 }} 
                    value={(rating)}
                    onChange={setRating}
                    itemStyles={customRating}
                    isRequired
                    isDisabled={!user}
                    />
                    
            </div>
              <div className="writeReviewRow">
                <label>Review</label>
                <textarea
                  className="reviewTextarea"
                  placeholder={user ? "Write your review here..." : "Please log in to write a review"}
                  value = {reviewContent}
                  onChange={(e) => setReviewContent(e.target.value)}
                  disabled={!user}
                />
              </div>

           {user && (
           <button className="publishBtn"
           onClick={async () => {
            if(!reviewContent) return

            if (!rating || rating === 0) {
            alert("Please give a rating before publishing");
            return;
            }

            try {
              //okei rehellisesti tästä eteenpäin mä en oikeen ymmärrä mitä tapahtuu mut se toimii
              // First, ensure the movie exists in the content table
              const ensureMovieRes = await fetch(`${process.env.REACT_APP_API_URL}/movies`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  content_id: seriesId,
                  title: series.name,
                  release_year: series.first_air_date,
                  genre: series.genres?.[0] || "Unknown",
                  description: series.synopsis,
                  poster_url: series.poster_path ? `https://image.tmdb.org/t/p/w342${series.poster_path}` : null,
                  content_type: "movie"
                })
              });
              
              // Save review to database (convert 0-5 star rating to 1-10 scale)
              const ratingValue = Math.max(1, Math.round(rating * 2));
              
              const requestBody = {
                user_id: user.userId,
                content_id: seriesId,
                review_text: reviewContent,
                rating: ratingValue
              };
              
              console.log("Sending review:", requestBody);
              console.log("User object:", user);
              
              const res = await fetch(`${process.env.REACT_APP_API_URL}/reviews`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
              })

              if (!res.ok) {
                const errorData = await res.json().catch(() => null);
              }

              const savedReview = await res.json();

              // Add to local state
              const newReview = {
                username: user.username,
                date: new Date().toISOString().split("T")[0],
                rating: rating * 2,
                content: reviewContent,
                avatar: userPfp || "null"
              }
              setMyReviews([newReview, ...myReviews])

              setReviewContent("")
              setRating(0)
            } catch (err) {
              console.error("Error saving review:", err);
              alert("Failed to save review");
            }

           }}         
           >Publish</button>
           )}

         </div>

      </div>
</div>
</div>
  
  )}

export default SeriesInfo

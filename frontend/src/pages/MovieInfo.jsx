import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAuth } from "../context/AuthContext.js";
import "./MovieInfo.css"
import Header from '../components/header.jsx'



function MovieInfo(){
  const {movieId} = useParams();
  const { user } = useAuth()
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavourited, setIsFavourited] = useState(false)
  const [favouriteLoading, setFavouriteLoading] = useState(false)


  useEffect(() => {
    async function fetchMovie(){
      try{
        const res = await fetch(`${process.env.REACT_APP_API_URL}/movies/movieDetails/${movieId}`)
        if (!res.ok) {
          if (res.status === 404) {
            setMovie(null);
            setError("Movie not found");
          } else {
            const text = await res.text();
            setError(`Error fetching movie: ${res.status} ${text}`);
          }
          return;
        }

        const data = await res.json();
        setMovie(data);
      } catch(err){
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
      fetchMovie()
    }, [movieId])

    useEffect(() => {
      if (user && user.token && movieId) {
        checkIfFavourited()
      }
    }, [user, movieId])

    const checkIfFavourited = async () => {
      try {
        console.log('Checking if favourited with tmdbId:', movieId)
        const response = await fetch(`http://localhost:3001/favourites/check?tmdbId=${movieId}`, {
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

    const handleAddToFavorites = async () => {
      if (!user) {
        alert("Kirjaudu sisään lisätäksesi elokuvia suosikkeihin")
        return
      }

      setFavouriteLoading(true)
      try {
        const saveResponse = await fetch(`http://localhost:3001/movies/saveFromTMDB`, {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json',
          },
          body: JSON.stringify({
            tmdbId: movieId,
            title: movie.title,
            releaseYear: movie.releaseYear,
            genre: movie.genres?.[0] || 'Unknown',
            description: movie.synopsis,
            posterUrl: movie.poster_path ? `https://image.tmdb.org/t/p/w342${movie.poster_path}` : null,
            contentType: 'movie'
          })
        })

        if (!saveResponse.ok) {
          const errorText = await saveResponse.text()
          throw new Error(`Failed to save movie: ${errorText}`)
        }

        const saveData = await saveResponse.json()
        
        if (!saveData.content_id) {
          console.error('saveData:', saveData)
          throw new Error("No content_id returned from saveFromTMDB")
        }
        
        console.log('Saving to favourites with content_id:', saveData.content_id)
        const contentId = saveData.content_id

        const response = await fetch("http://localhost:3001/favourites/add", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
          body: JSON.stringify({ contentId })
        })

        const data = await response.json()

        if (response.ok) {
          alert("Elokuva lisätty suosikkeihin!")
          setIsFavourited(true)
        } else {
          alert(data.error || "Virhe lisättäessä elokuvaa suosikkeihin")
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
        const response = await fetch("http://localhost:3001/favourites/remove", {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
          body: JSON.stringify({ tmdbId: movieId })
        })

        if (response.ok) {
          alert("Elokuva poistettu suosikeista!")
          setIsFavourited(false)
        } else {
          const data = await response.json()
          alert(data.error || "Virhe poistaessa elokuvaa suosikeista")
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
          <p>Loading movie...</p>
        </div>
      )
    }

    if (!movie) {
      return (
        <div className ="container">
          <Header/>
          <p>{error || "Movie not found"}</p>
        </div>
      )
    }

      //hakee posterin
      const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
    : "/placeholder.jpg";

    //muokkaa rating tähdiksi
    function makeStars(rating) {
    if (rating == null) return "★★★★★" // default 
    const stars = Math.round(rating / 2) // 0–10 → 0–5
    return "★★★★★".slice(0, stars) + "☆☆☆☆☆".slice(0, 5 - stars)
    } 


    return (
    <div className="container">
      <Header/>

      <div className ="movieInfoWrapper">
      <div className = "imgContainer">
        <img src={posterUrl} alt={movie.title}/>
      </div>

      <div className ="movieContainer">
        <div className ="infoContainer">
          <div className = "movieTitle">
            <h3>{movie.title}</h3>
          </div>

          <div className="movieYear">
            <p>Release year: {movie.releaseYear}</p>
          </div>

          <div className = "movieDirector">
            <p>Director: {movie.director}</p>
          </div>

          <div className ="movieSynopsis">
            <p>{movie.synopsis}</p>
          </div>

          <div className = "movieGenres">
            <div className ="genreTitle"><p>Genres:</p></div>
            <div className = "genresWrapper">
              {movie.genres?.map((g,index) => (
               <span key={index} className="genrePill">{g}</span>
              ))}
            </div>
          </div>
          <div className ="movieRating">
            Rating: {(movie.rating / 2).toFixed(1)} - {makeStars(movie.rating) || "N/A"}
            
          </div>
      </div>
    </div>


        <div className ="providerContainer">
          <h4>Where to watch:</h4>
          <div className="columnWrapped">

          {(!movie.providers ||  movie.providers.length === 0) && <p>No providers available</p>}

          {movie.providers?.map((p) => (
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

            <select className="listSelect">
            <option value="favorites">Favorites</option>
            <option value="list2 ?">list2</option>
            </select>

             <button type="submit" className="addToListBtn">
              Add To List
            </button>
          </div>
          </div>              

  </div>

  </div>

          <div className = "reviewContainer">

            {(!movie.reviews || movie.reviews.length === 0) && (
            <p>No reviews available</p>
            )}

      <h3>Reviews</h3>
        <div className="reviewsRowContainer">

          <div className = "reviewsColumn">
            {movie.reviews?.map((review,index) => (
              <div key = {index} className ="reviewBox">
               
                <div className ="reviewHeader">
                <img src={review.avatar || "https://via.placeholder.com"}
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
               <p class="review-text">{review.content}</p>
              </div>
         ))}
    </div>

         <div className = "myReviewContainer">

            <div className ="myReviewRow">
              <img src = "" alt = "Profile" className = "pfp"/>

              <div className ="myReviewName">Logged user</div>
              <div className ="myStars">★★★★★</div>
            </div>

              <div className="writeReviewRow">
                <label>Review</label>
                <textarea
                  className="reviewTextarea"
                  placeholder="Write your review here..."
                />
              </div>

           <button className="publishBtn">Publish</button>

         </div>

      </div>
</div>
</div>
  
  )}

export default MovieInfo

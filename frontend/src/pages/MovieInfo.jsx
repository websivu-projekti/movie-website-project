import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./MovieInfo.css"
import Header from '../components/header.jsx'


function MovieInfo(){
  const {movieId} = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ searchQuery, setSearchQuery ] = useState('')
  const [error, setError] = useState(null);


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
          <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
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
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>

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

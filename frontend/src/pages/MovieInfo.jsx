import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./MovieInfo.css"
import Header from '../components/header.jsx'
import { useAuth } from "../context/AuthContext.js"
import { Rating, Star } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'


function MovieInfo(){
  const {movieId} = useParams();
  const {user} = useAuth()
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [myReviews, setMyReviews] = useState([]);
  const [reviewContent, setReviewContent] = useState("");
  const [rating, setRating] = useState(0)


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

    async function fetchReviews(){
      try{
        const res = await fetch(`${process.env.REACT_APP_API_URL}/reviews/${movieId}`)
        if (res.ok) {
          const data = await res.json();
          setMyReviews(data);
        }
      } catch(err){
        console.error("Error fetching reviews:", err)
      }
    }

    fetchMovie()
    fetchReviews()
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

    const customRating = {
      itemShapes: Star,
      activeFillColor: '#488a02ff',
      inactiveFillColor: '#fafdf8ff',
    }

    //yhdistää kirjoitetut arvostelut muihin
    const allReviews = [...myReviews, ...(movie.reviews || [])];


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

          <div className="movieYear">Release year: {movie.releaseYear}</div>

          <div className = "movieDirector">Director: {movie.director}</div>

          <div className ="movieSynopsis">{movie.synopsis}</div>

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
            
            {allReviews?.map((review,index) => (
              <div key = {index} className ="reviewBox">
               
                <div className ="reviewHeader">
                <img src={review.avatar || "https://i.imgur.com/MVFmDAe.jpeg"}
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
               <div class="reviewText">{review.content}</div>
              </div>
         ))}
    </div>

         <div className = "myReviewContainer">

            <div className ="myReviewRow">
              <div className="profileAndName">
                   <img src={user?.avatar || user?.pfp_url || "https://i.imgur.com/MVFmDAe.jpeg"} alt="Profile" className="pfp"/>
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
                  content_id: movieId,
                  title: movie.title,
                  release_year: movie.releaseYear,
                  genre: movie.genres?.[0] || "Unknown",
                  description: movie.synopsis,
                  poster_url: movie.poster_path ? `https://image.tmdb.org/t/p/w342${movie.poster_path}` : null,
                  content_type: "movie"
                })
              });
              
              // Save review to database (convert 0-5 star rating to 1-10 scale)
              const ratingValue = Math.max(1, Math.round(rating * 2));
              
              const requestBody = {
                user_id: user.userId,
                content_id: movieId,
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
                avatar: user.avatar || "https://i.imgur.com/MVFmDAe.jpeg"
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

export default MovieInfo

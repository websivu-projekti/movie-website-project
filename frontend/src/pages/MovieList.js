import React, { useState } from "react"
import Header from '../components/header.jsx'
import "./MovieList.css"

function MovieList() {
  return (
    <div className="container">
    <Header/>
    <div className="movie-list-container">
      {/* Otsikko ja käyttäjän nimi */}
      <div className="list-header">
        <h1 className="list-title">My Favorite Movies</h1>
        <span className="list-by">List by: user_name123</span>
      </div>

      {/* Edit & Share */}
      <div className="list-actions">
        <div className="edit-list">
          <span className="movies-count">10 movies</span>
          <button>Edit list</button>
        </div>
        <div className="share-list">
          <span>Share list:</span>
          <input type="text" value="https://url.com/list_name" readOnly />
          <button>Copy link</button>
        </div>
      </div>

      {/* Elokuvat placeholder */}
      <div className="movies-grid">
        <div className="movie-card">
          <div className="movie-image">Image 1</div>
          <h2 className="movie-title">Movie title 1</h2>
          <p className="movie-details">Year | Director name</p>
          <div className="movie-rating">
            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
          </div>
        </div>
        <div className="movie-card">
          <div className="movie-image">Image 2</div>
          <h2 className="movie-title">Movie title 2</h2>
          <p className="movie-details">Year | Director name</p>
          <div className="movie-rating">
            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
          </div>
        </div>
        <div className="movie-card">
          <div className="movie-image">Image 3</div>
          <h2 className="movie-title"><p className="movieTitle"><a className="movieLink" href={`/movieinfo/603`}>Matrix</a></p></h2>
          <p className="movie-details">Year | Director name</p>
          <div className="movie-rating">
            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
          </div>
        </div>
        <div className="movie-card">
          <div className="movie-image">Image 4</div>
          <h2 className="movie-title">Movie title 4</h2>
          <p className="movie-details">Year | Director name</p>
          <div className="movie-rating">
            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default MovieList

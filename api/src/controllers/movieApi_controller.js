import fetch from "node-fetch"


export async function getNowPlaying(req, res) {
  try {
    const apiKey = process.env.TMDB_API_KEY
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`
    )
    const data = await response.json()
    res.json(data.results)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Error fetching movies" })
  }
}

export async function getPopularFilms(req, res) {
  try {
    const apiKey = process.env.TMDB_API_KEY
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
    )
    const data = await response.json()
    res.json(data.results)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Error fetching movies" })
  }
}


export async function getMovieDetails(req, res) {
  try {
    const apiKey = process.env.TMDB_API_KEY
    const movieId = req.params.movieId
    const region = "FI"

    //movie details
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
    )
    if(!response.ok){
      return res.status(response.status).json({error:"Movie not found"})
    }

    const data = await response.json()


    // Fetch credits ja director
    const creditsRes = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
    )

    let director = "Unknown";
    if (creditsRes.ok) {
      const credits = await creditsRes.json();
      const directorObj = credits.crew.find(c => c.job === "Director");
      if (directorObj) director = directorObj.name;
    }


    //Fetch providers
      const providersRes = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${apiKey}&watch_region=${region}`
      )

      let providers = [];
      if (providersRes.ok) {
        const providerData = await providersRes.json();
        const regionData = providerData.results[region] || Object.values(providerData.results)[0];

      if (regionData) {
        const allProviders = [...(regionData.flatrate || []), ...(regionData.rent || []), ...(regionData.buy || [])];

        //poistaa tuplat
        const uniqueProvidersMap = {};
        allProviders.forEach(p => {
          if (!uniqueProvidersMap[p.provider_name]) {
            uniqueProvidersMap[p.provider_name] = {
              name: p.provider_name,
              logo: p.logo_path ? `https://image.tmdb.org/t/p/w45${p.logo_path}` : null,
              link: regionData.link || "#"
            }
          }
        })
        providers = Object.values(uniqueProvidersMap);
      }
    }

    const movieDetails ={
      title: data.original_title,
      releaseYear: data.release_date?.split("-")[0] || "N/A",
      synopsis: data.overview,
      director: director,
      rating: data.vote_average || "N/A",
      genres: data.genres?.map(g => g.name) || [],
      poster_path: data.poster_path,
      providers
    }

    res.json(movieDetails)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Error fetching movie" })
  }
}


/* WORK IN PROGRESS */
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

export async function getDiscoverMovies(req, res) {
  try {
    const apiKey = process.env.TMDB_API_KEY
    const params = req.params.params
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}${params}`
    )
    const data = await response.json()
    res.json(data.results)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Error fetching movies" })
  }
}

export async function getDiscoverTV(req, res) {
  try {
    const apiKey = process.env.TMDB_API_KEY
    const params = req.params.params
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}${params}`
    )
    const data = await response.json()
    res.json(data.results)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Error fetching movies" })
  }
}

export async function getGenres(req, res) {
  try {
    const apiKey = process.env.TMDB_API_KEY
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en`
    )
    const data = await response.json()
    res.json(data.genres)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Error fetching genres" })
  }
}

export async function getLanguages(req, res) {
  try {
    const apiKey = process.env.TMDB_API_KEY
    const response = await fetch(
      `https://api.themoviedb.org/3/configuration/languages?api_key=${apiKey}`
    )
    const data = await response.json()
    res.json(data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Error fetching languages" })
  }
}

export async function getMovieProviders(req, res) {
  try {
    const apiKey = process.env.TMDB_API_KEY
    const region = "fi"
    const response = await fetch(
      `https://api.themoviedb.org/3/watch/providers/movie?api_key=${apiKey}&watch_region=${region}`
    )
    const data = await response.json()
    res.json(data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Error fetching movie providers" })
  }
}

export async function getTvProviders(req, res) {
  try {
    const apiKey = process.env.TMDB_API_KEY
    const response = await fetch(
      `https://api.themoviedb.org/3/watch/providers/tv?api_key=${apiKey}`
    )
    const data = await response.json()
    res.json(data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Error fetching TV providers" })
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


    // Fetch credits ja sieltä tarkemmin director
    const creditsRes = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
    )

    let director = "Unknown";
    if (creditsRes.ok) {
      const credits = await creditsRes.json()
      const directorObj = credits.crew.find(c => c.job === "Director");
      if (directorObj) director = directorObj.name;
    }


    //Fetch providers
      const providersRes = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${apiKey}&watch_region=${region}`
      )

      let providers = [];
      if (providersRes.ok) {
        const providerData = await providersRes.json()
        const regionData = providerData.results[region] || Object.values(providerData.results)[0];

      if (regionData) {
        const allProviders = [...(regionData.flatrate || []), ...(regionData.rent || []), ...(regionData.buy || [])];

        //poistaa tupla providers
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


    //fetch 3 most recent reviews
    const reviewsRes = await fetch (
     `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}&language=en-US`
    )

    let reviews = []
    if(reviewsRes.ok){
      const reviewData = await reviewsRes.json()

      const sorted = reviewData.results.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      )

      //ottaa vain 3
      reviews = sorted.slice(0,3).map(r => ({
        username: r.author,
        date: r.created_at.split("T")[0],
        rating: r.author_details?.rating ?? null,
        content: r.content,
        avatar: 
            r.author_details?.avatar_path
            ? `https://image.tmdb.org/t/p/w45${r.author_details.avatar_path.replace("/", "")}`
            : null
      }))
    }


    //mitkä tiedot viedään frontendiin
    const movieDetails ={
      title: data.original_title,
      releaseYear: data.release_date?.split("-")[0] || "N/A",
      synopsis: data.overview,
      director: director,
      rating: data.vote_average || "N/A",
      genres: data.genres?.map(g => g.name) || [],
      poster_path: data.poster_path,
      language: data.original_language,
      providers,
      reviews
    }

    res.json(movieDetails)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Error fetching movie" })
  }
}

export async function getSeriesDetails(req, res) {
  try {
    const apiKey = process.env.TMDB_API_KEY
    const seriesId = req.params.seriesId
    const region = "FI"

    //movie details
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${seriesId}?api_key=${apiKey}&language=en-US`
    )
    if(!response.ok){
      return res.status(response.status).json({error:"Series not found"})
    }

    const data = await response.json()


    // Fetch credits ja sieltä tarkemmin director
    const creditsRes = await fetch(
      `https://api.themoviedb.org/3/tv/${seriesId}/credits?api_key=${apiKey}`
    )

    let director = "Unknown";
    if (creditsRes.ok) {
      const credits = await creditsRes.json()
      const directorObj = credits.crew.find(c => c.job === "Director");
      if (directorObj) director = directorObj.name;
    }


    //Fetch providers
      const providersRes = await fetch(
      `https://api.themoviedb.org/3/tv/${seriesId}/watch/providers?api_key=${apiKey}&watch_region=${region}`
      )

      let providers = [];
      if (providersRes.ok) {
        const providerData = await providersRes.json()
        const regionData = providerData.results[region] || Object.values(providerData.results)[0];

      if (regionData) {
        const allProviders = [...(regionData.flatrate || []), ...(regionData.rent || []), ...(regionData.buy || [])];

        //poistaa tupla providers
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


    //fetch 3 most recent reviews
    const reviewsRes = await fetch (
     `https://api.themoviedb.org/3/tv/${seriesId}/reviews?api_key=${apiKey}&language=en-US`
    )

    let reviews = []
    if(reviewsRes.ok){
      const reviewData = await reviewsRes.json()

      const sorted = reviewData.results.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      )

      //ottaa vain 3
      reviews = sorted.slice(0,3).map(r => ({
        username: r.author,
        date: r.created_at.split("T")[0],
        rating: r.author_details?.rating ?? null,
        content: r.content,
        avatar: 
            r.author_details?.avatar_path
            ? `https://image.tmdb.org/t/p/w45${r.author_details.avatar_path.replace("/", "")}`
            : null
      }))
    }


    //mitkä tiedot viedään frontendiin
    const seriesDetails ={
      name: data.name,
      release: data.first_air_date?.split("-")[0] || "N/A",
      synopsis: data.overview,
      director: director,
      rating: data.vote_average || "N/A",
      genres: data.genres?.map(g => g.name) || [],
      poster_path: data.poster_path,
      language: data.original_language,
      providers,
      reviews
    }

    res.json(seriesDetails)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Error fetching series" })
  }
}


export async function getMovieSearchresults(req, res){
  try {
    const apiKey = process.env.TMDB_API_KEY
    const query = req.params.query
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}${query}`
    )
    const data = await response.json()
    res.json(data.results)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Error fetching movies" })
  }
}

export async function getTvSearchresults(req, res){
  try {
    const apiKey = process.env.TMDB_API_KEY
    const query = req.params.query
    const response = await fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}${query}`
    )
    const data = await response.json()
    res.json(data.results)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Error fetching series" })
  }
}

export async function getSeriesGenres(req, res) {
  try {
    const apiKey = process.env.TMDB_API_KEY
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=en`
    )
    const data = await response.json()
    res.json(data.genres)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Error fetching genres" })
  }
}
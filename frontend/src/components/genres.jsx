import React, { useEffect, useState } from "react"

export default function Genres() {
    const [genres, setGenres] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchGenres() {
              try {
                const res = await fetch(`${process.env.REACT_APP_API_URL}/movies/genres`)
                if (!res.ok) throw new Error("Verkkovirhe")
                const data = await res.json()
                setGenres(data)
              } catch (err) {
                console.error("Virhe haettaessa genrejä:", err)
              } finally {
                setLoading(false)
              }
            }
            fetchGenres()
    }, [])

    return(
        <select>
            {genres.map((genre, index) => (
              <option value={genre.id}>{genre.name}</option>
            ))}
          </select>
    )
}
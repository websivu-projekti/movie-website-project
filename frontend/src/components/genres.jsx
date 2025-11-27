import React, { useEffect, useState } from "react"
import Select from 'react-select'

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

    const genreOptions = genres.map((genre) => ({
        value: genre.id,
        label: genre.name
    }))

    return(
        <Select 
        className="filter genre"
        classNamePrefix='select'
        isMulti
        options={genreOptions}
        theme={(theme) => ({
            ...theme,
                borderRadius: 0,
                border: '1px dotted #a5e364',
                color: '#F5F5F5',
                display: 'flex',
            colors: {
                ...theme.colors,
                primary: '#585cd5',
                primary25: '#7c80de',
                neutral0: '#F5F5F5',
            },
        })}
        styles={{
            singleValue: (baseStyles) => ({
                ...baseStyles,
                color: '#F5F5F5'
            }),
            valueContainer: (baseStyles) => ({
                ...baseStyles,
                display: 'flex',
                padding: '3px 8px'
            }),
            container: (baseStyles) => ({
                ...baseStyles,
                padding: '5px'
            }),
            menu: (baseStyles) => ({
                ...baseStyles,
                top: 'auto'
            })
        }}
        />
    )
}
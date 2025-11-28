import React, { useEffect, useState } from "react"
import Select, { InputActionMeta } from 'react-select'

export default function FilterProviders(){
    const [providers, setProviders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
            async function fetchProviders() {
                  try {
                    const res = await fetch(`${process.env.REACT_APP_API_URL}/movies/movieproviders`)
                    if (!res.ok) throw new Error("Verkkovirhe")
                    const data = await res.json()
                    setProviders(data)
                  } catch (err) {
                    console.error("Virhe haettaessa sisällöntarjoajia:", err)
                  } finally {
                    setLoading(false)
                  }
                }
                fetchProviders()
        }, [])

    return(
        <Select 
        className="filter genre"
        classNamePrefix='select'
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
            multiValueLabel: (baseStyles) => ({
                ...baseStyles,
                color: '#0f0f0f',
                backgroundColor: '#a5e364'
            }),
            multiValueRemove: (baseStyles) => ({
                ...baseStyles,
                color: '#0f0f0f',
                backgroundColor: '#a5e364'
            }),
            valueContainer: (baseStyles) => ({
                ...baseStyles,
                display: 'flex',
                padding: '4px 8px'
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
import Select from 'react-select'
import React, { useEffect, useState } from "react"

export default function FilterLanguages({chosenLan, setChosenLan}){
    const [ languages, setLanguages ] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
            async function fetchLanguages() {
                  try {
                    const res = await fetch(`${process.env.REACT_APP_API_URL}/movies/languages`)
                    if (!res.ok) throw new Error("Verkkovirhe")
                    const data = await res.json()
                    setLanguages(data)
                  } catch (err) {
                    console.error("Virhe haettaessa kieliä:", err)
                  } finally {
                    setLoading(false)
                  }
                }
                fetchLanguages()
        }, [])

    const chooseLan = (lan) => {
        setChosenLan(Array.isArray(lan) ? lan.map(x => x.value) : [])
        console.log(chosenLan)
    }

    const languageOptions = languages.map((lan) => ({
        value: lan.iso_639_1,
        label: lan.english_name
    }))

    return(
        <Select 
        className="filter languages"
        classNamePrefix='select'
        isMulti
        onChange={chooseLan}
        options={languageOptions}
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
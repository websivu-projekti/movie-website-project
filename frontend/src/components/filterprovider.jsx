import React, { useEffect, useState } from "react"
import Select, { InputActionMeta } from 'react-select'

export default function FilterProviders({chosenProviders, setChosenProviders}){
    const [ providers, setProviders ] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
            async function fetchProviders() {
                  try {
                    const res = await fetch(`${process.env.REACT_APP_API_URL}/movies/movieproviders`)
                    if (!res.ok) throw new Error("Verkkovirhe")
                    const data = await res.json()
                    setProviders(data.results)
                  } catch (err) {
                    console.error("Virhe haettaessa sisällöntarjoajia:", err)
                  } finally {
                    setLoading(false)
                  }
                }
                fetchProviders()
        }, [])

    const Options = providers?.map((provider) => ({
        value: provider.provider_id,
        label: provider.provider_name
    }))

    const chooseProvider = (prov) => {
        setChosenProviders(prov.label)
        console.log(chosenProviders)
    }

    return(
        <Select
        options={Options}
        className="filter genre"
        classNamePrefix='select'
        onChange={chooseProvider}
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
                padding: '4px 8px'
            }),
            container: (baseStyles) => ({
                ...baseStyles,
                padding: '5px'
            }),
            menu: (baseStyles) => ({
                ...baseStyles,
                top: 'auto'
            }),
            inputContainer: (baseStyles) => ({
                ...baseStyles,
                paddingTop: '3px',
                paddingBottom: '3px'
            })
        }}
        />
    )
}
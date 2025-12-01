import React from "react"
import Select from 'react-select'

export default function FilterYear(){
    const Options = [
        { value: 'popularity.desc', label: `1900's` },
        { value: 'popularity.desc', label: `1910's` },
        { value: 'popularity.desc', label: `1920's` },
        { value: 'popularity.desc', label: `1930's` },
        { value: 'popularity.desc', label: `1940's` },
        { value: 'popularity.desc', label: `1950's` },
        { value: 'popularity.desc', label: `1960's` },
        { value: 'popularity.desc', label: `1970's` },
        { value: 'popularity.desc', label: `1980's` },
        { value: 'popularity.desc', label: `1990's` },
        { value: 'popularity.desc', label: `2000's` },
        { value: 'popularity.desc', label: `2010's` },
        { value: 'popularity.desc', label: `2020's` },
    ]
    return(
        <Select 
        className="filter filteryear"
        options={Options}
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
            }),
            inputContainer: (baseStyles) => ({
                ...baseStyles,
                paddingTop: '3px',
                paddingBottom: '3px'
            }),
            valueContainer: (baseStyles) => ({
                ...baseStyles,
                display: 'flex',
                padding: '4px 8px'
            }),
        }}
        />
    )
}
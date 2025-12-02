import React from "react"
import Select from 'react-select'

export default function FilterYear({chosenYear, setChosenYear}){

    const chooseYear = e =>{
        setChosenYear(e.value)
        console.log(chosenYear)
    }

    const Options = [
        { value: '1900-01-01', label: `1900's` },
        { value: '1910-01-01', label: `1910's` },
        { value: '1920-01-01', label: `1920's` },
        { value: '1930-01-01', label: `1930's` },
        { value: '1940-01-01', label: `1940's` },
        { value: '1950-01-01', label: `1950's` },
        { value: '1960-01-01', label: `1960's` },
        { value: '1970-01-01', label: `1970's` },
        { value: '1980-01-01', label: `1980's` },
        { value: '1990-01-01', label: `1990's` },
        { value: '2000-01-01', label: `2000's` },
        { value: '2010-01-01', label: `2010's` },
        { value: '2020-01-01', label: `2020's` },
    ]
    return(
        <Select 
        className="filter filteryear"
        options={Options}
        value={Options.filter(obj => obj.value === chosenYear)}
        classNamePrefix='select'
        onChange={chooseYear}
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
import React from "react"
import Select from 'react-select'

export default function FilterYear({chosenYear, setChosenYear}){

    const chooseYear = e =>{
        setChosenYear(e.value)
        console.log(chosenYear)
    }

    const Options = [
        { value: 'primary_release_date.gte=1900-01-01&primary_release_date.lte=1909-12-31', label: `1900's` },
        { value: 'primary_release_date.gte=1910-01-01&primary_release_date.lte=1919-12-31', label: `1910's` },
        { value: 'primary_release_date.gte=1920-01-01&primary_release_date.lte=1929-12-31', label: `1920's` },
        { value: 'primary_release_date.gte=1930-01-01&primary_release_date.lte=1939-12-31', label: `1930's` },
        { value: 'primary_release_date.gte=1940-01-01&primary_release_date.lte=1949-12-31', label: `1940's` },
        { value: 'primary_release_date.gte=1950-01-01&primary_release_date.lte=1959-12-31', label: `1950's` },
        { value: 'primary_release_date.gte=1960-01-01&primary_release_date.lte=1969-12-31', label: `1960's` },
        { value: 'primary_release_date.gte=1970-01-01&primary_release_date.lte=1979-12-31', label: `1970's` },
        { value: 'primary_release_date.gte=1980-01-01&primary_release_date.lte=1989-12-31', label: `1980's` },
        { value: 'primary_release_date.gte=1990-01-01&primary_release_date.lte=1999-12-31', label: `1990's` },
        { value: 'primary_release_date.gte=2000-01-01&primary_release_date.lte=2009-12-31', label: `2000's` },
        { value: 'primary_release_date.gte=2010-01-01&primary_release_date.lte=2019-12-31', label: `2010's` },
        { value: 'primary_release_date.gte=2020-01-01&primary_release_date.lte=2029-12-31', label: `2020's` },
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
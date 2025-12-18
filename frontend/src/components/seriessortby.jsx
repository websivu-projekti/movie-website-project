import React, { useState } from "react"
import Select from 'react-select'


export default function SeriesSortBy({sortingSeries, setSortingSeries}){

    const Options = [
        { value: 'popularity.desc', label: 'Popularity' },
        { value: 'first_air_date.desc', label: 'Newest first' },
        { value: 'first_air_date.asc', label: 'Oldest first' },
        { value: 'name.desc', label: 'Title A-Z' },
        { value: 'name.asc', label: 'Title Z-A' },
        { value: 'vote_average.desc', label: 'Best rated first' },
        { value: 'vote_average.asc', label: 'Worst rated first' },
        { value: 'vote_count.desc', label: 'Most ratings' },
        { value: 'vote_count.asc', label: 'Least ratings' }
    ]

    const chooseSort = e => {
        setSortingSeries(e.value)
        console.log(sortingSeries)
    }

    return(
        <Select 
        className="filter sortby"
        options={Options}
        onChange={chooseSort}
        value={Options.filter(obj => obj.value === sortingSeries)}
        defaultValue={Options[0]}
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
import React, { useRef } from "react"
import Genres from '../components/genres.jsx'
import FilterRating from "../components/filterrating.jsx"
import SortBy from "../components/sortby.jsx"
import FilterLanguages from "../components/languages.jsx"
import FilterYear from "../components/filteryear.jsx"
import FilterProviders from "../components/filterprovider.jsx"
import FilterContent from "../components/filtercontent.jsx"

export default function FiltersMenu(){

    return(
        <div className="mobileFiltersRow">
        Filters
        <a className="resetLink" href="">Reset filters</a>
        {/* SORT BY */}
        <div className="filterTitle">Sort by:</div>
        <SortBy/>
        {/* GENRES */}
        <div className="filterTitle">Genres:</div>
        <Genres/>
        {/* LANGUAGES */}
        <div className="filterTitle">Language:</div>
        <FilterLanguages/>
        {/* RATING */}
        <div className="filterTitle">Rating:</div>
        <FilterRating/>
        {/* YEAR */}
        <div className="filterTitle">Year:</div>
        <FilterYear/>
        {/* PROVIDERS */}
        <div className="filterTitle">Providers:</div>
        <FilterProviders/>
        {/* CONTENT */}
        <div className="filterTitle">Content:</div>
        <FilterContent/>
        </div>
    )
}
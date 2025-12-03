import React, { useEffect, useState } from "react"

export default function Pagination({currentPage, setCurrentPage}){
    const nextPage = () => {
        setCurrentPage(currentPage => currentPage + 1)
    }

    const prevPage = () => {
        setCurrentPage(currentPage => currentPage - 1)
    }

    return(
        <div className="pagination">
            <button 
            className="paginationBtn"
            onClick={prevPage}>
              Prev
            </button>
            <button 
            className="paginationBtn"
            onClick={nextPage}>
              Next
            </button>
        </div> 
    )
}
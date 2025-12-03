import React, { useState } from "react"
export default function Pagination({currentPage, setCurrentPage}){
    const [ className, setClassName ] = useState('paginationBtnDisabled')
    const [ disabled, setDisabled ] = useState(true)
    const [ lastPage, setLastPage ] = useState(0)

    const nextPage = () => {
        if(currentPage >= 1){
            setClassName('paginationBtn')
            setDisabled(false)
        }
        setCurrentPage(currentPage => currentPage + 1)
        setLastPage(lastPage => lastPage + 1 )
    }

    const prevPage = () => {
        if(lastPage === 1){
            setClassName('paginationBtnDisabled')
        }
        setCurrentPage(currentPage => currentPage - 1)
        setLastPage(lastPage => lastPage - 1)
    }

    return(
        <div className="pagination">
            <button 
            className={className}
            onClick={prevPage}
            disabled={lastPage === 0}
            >
              Prev
            </button>
            <div>Page {currentPage}</div>
            <button 
            className='paginationBtn'
            onClick={nextPage}
            >
              Next
            </button>
        </div> 
    )
}
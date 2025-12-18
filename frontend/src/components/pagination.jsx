import React, { useEffect, useState } from "react"
export default function Pagination({currentPage, setCurrentPage, movieResultsLength, tvResultsLength}){
    const [ prevClassName, setPrevClassName ] = useState('paginationBtnDisabled')
    const [ nextClassName, setNextClassName ] = useState('paginationBtn')
    const [ disabled, setDisabled ] = useState(false)
    const [ lastPage, setLastPage ] = useState(0)

    useEffect(() => {
        if(movieResultsLength < 20 || tvResultsLength < 20){
            setNextClassName('paginationBtnDisabled')
            setDisabled(true)
        }
    }, [movieResultsLength, tvResultsLength])

    const nextPage = () => {
        if(currentPage >= 1){
            setPrevClassName('paginationBtn')
        }
        setCurrentPage(currentPage => currentPage + 1)
        setLastPage(lastPage => lastPage + 1 )
    }

    const prevPage = () => {
        if(lastPage === 1){
            setPrevClassName('paginationBtnDisabled')
        }
        setCurrentPage(currentPage => currentPage - 1)
        setLastPage(lastPage => lastPage - 1)
    }

    return(
        <div className="pagination">
            <button 
            className={prevClassName}
            onClick={prevPage}
            disabled={lastPage === 0}
            >
              Prev
            </button>
            <div>Page {currentPage}</div>
            <button 
            className={nextClassName}
            onClick={nextPage}
            disabled={disabled}
            >
              Next
            </button>
        </div> 
    )
}
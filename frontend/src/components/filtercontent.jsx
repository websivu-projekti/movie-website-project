export default function FilterContent({chosenContent, setChosenContent}){

  const chooseContent = e => {
    setChosenContent(e.target.value)
    console.log(chosenContent)
  }
    return(
        <form className="filter rating">
            <label>
              <input
                type="radio"
                name="content"
                value={"movie"}
                checked={chosenContent === 'movie'}
                onClick={chooseContent}
              />Movies
            </label>
            <br/>
            <label>
              <input
                type="radio"
                name="content"
                value={"tv"}
                checked={chosenContent === 'tv'}
                onClick={chooseContent}
              />TV Series
            </label>
            <br/>
          </form>
    )
}
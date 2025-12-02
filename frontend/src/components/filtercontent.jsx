export default function FilterContent(){
    return(
        <form className="filter rating">
            <label>
              <input
              defaultChecked={true}
                type="radio"
                name="movie"
                value={"movie"}
              />Movies
            </label>
            <br/>
            <label>
              <input
                type="radio"
                name="tv"
                value={"tv"}
              />TV Series
            </label>
            <br/>
          </form>
    )
}
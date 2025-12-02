export default function FilterContent(){
    return(
        <form className="filter rating">
            <label>
              <input
                type="radio"
                name="content"
                value={"movie"}
                defaultChecked={true}
              />Movies
            </label>
            <br/>
            <label>
              <input
                type="radio"
                name="content"
                value={"tv"}
              />TV Series
            </label>
            <br/>
          </form>
    )
}
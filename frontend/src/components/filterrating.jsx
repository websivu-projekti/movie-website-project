export default function FilterRating(){
    return(
        <form className="filter rating">
            <label>
              <input
                defaultChecked={true}
                type="radio"
                name="rating"
                value={"any"}
              />Any
            </label>
            <br/>
            <label>
              <input
                type="radio"
                name="rating"
                value={"1/5 and up"}
              />1/5 and up
            </label>
            <br/>
            <label>
              <input
                type="radio"
                name="rating"
                value={"2/5 and up"}
              />2/5 and up
            </label>
            <br/>
            <label>
              <input
                type="radio"
                name="rating"
                value={"3/5 and up"}
              />3/5 and up
            </label>
            <br/>
            <label>
              <input
                type="radio"
                name="rating"
                value={"4/5 and up"}
              />4/5 and up
            </label>
            <br/>
            <label>
              <input
                type="radio"
                name="rating"
                value={"5/5"}
              />5/5
            </label>
            <br/>
          </form>
    )
}
import { Rating, Star } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

export default function FilterRating({chosenRating, setChosenRating}){
  const chooseRating = e => {
    setChosenRating(e.target.value)
    console.log(chosenRating)
  }
  const customRating = {
      itemShapes: Star,
      activeFillColor: '#90e339',
      inactiveFillColor: '#cdf0a8'
  }
    return(
        <form className="filter rating">
            <label>
              <input
                type="radio"
                name="rating"
                value={"2"}
                checked={chosenRating === '2'}
                onClick={chooseRating}
              />
              <Rating 
                className="movieRating" 
                readOnly 
                style={{ maxWidth: 100, display: 'inline-flex' }} 
                value={1}
                itemStyles={customRating}
              /> and down
            </label>
            <br/>
            <label>
              <input
                type="radio"
                name="rating"
                value={"4"}
                checked={chosenRating === '4'}
                onClick={chooseRating}
              />
              <Rating
                className='movieRating'
                readOnly
                style={{ maxWidth: 100, display: 'inline-flex' }}
                value={2}
                itemStyles={customRating}
                /> and down
            </label>
            <br/>
            <label>
              <input
                type="radio"
                name="rating"
                value={"6"}
                checked={chosenRating === '6'}
                onClick={chooseRating}
              />
              <Rating
                className='movieRating'
                readOnly
                style={{ maxWidth: 100, display: 'inline-flex' }}
                value={3}
                itemStyles={customRating}
              /> and down
            </label>
            <br/>
            <label>
              <input
                type="radio"
                name="rating"
                value={"8"}
                checked={chosenRating === '8'}
                onClick={chooseRating}
              />
              <Rating
                className='movieRating'
                readOnly
                style={{ maxWidth: 100, display: 'inline-flex' }}
                value={4}
                itemStyles={customRating}
              /> and down
            </label>
            <br/>
            <label>
              <input
                type="radio"
                name="rating"
                value={"10"}
                checked={chosenRating === '10'}
                onClick={chooseRating}
              />
              <Rating
                className='movieRating'
                readOnly
                style={{ maxWidth: 100, display: 'inline-flex' }}
                value={5}
                itemStyles={customRating}
              />
            </label>
            <br/>
          </form>
    )
}
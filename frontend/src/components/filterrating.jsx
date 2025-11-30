import { Rating, Star } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

export default function FilterRating(){
  const customRating = {
      itemShapes: Star,
      activeFillColor: '#a5e364',
      inactiveFillColor: '#cdf0a8'
  }
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
                value={"2"}
              />
              <Rating 
                className="movieRating" 
                readOnly 
                style={{ maxWidth: 100, display: 'inline-flex' }} 
                value={1}
                itemStyles={customRating}
              /> and up
            </label>
            <br/>
            <label>
              <input
                type="radio"
                name="rating"
                value={"4"}
              />
              <Rating
                className='movieRating'
                readOnly
                style={{ maxWidth: 100, display: 'inline-flex' }}
                value={2}
                itemStyles={customRating}
                /> and up
            </label>
            <br/>
            <label>
              <input
                type="radio"
                name="rating"
                value={"6"}
              />
              <Rating
                className='movieRating'
                readOnly
                style={{ maxWidth: 100, display: 'inline-flex' }}
                value={3}
                itemStyles={customRating}
              /> and up
            </label>
            <br/>
            <label>
              <input
                type="radio"
                name="rating"
                value={"8"}
              />
              <Rating
                className='movieRating'
                readOnly
                style={{ maxWidth: 100, display: 'inline-flex' }}
                value={4}
                itemStyles={customRating}
              /> and up
            </label>
            <br/>
            <label>
              <input
                type="radio"
                name="rating"
                value={"10"}
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
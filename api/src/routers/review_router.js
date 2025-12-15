import { Router } from 'express'
import { getReviews, addReview } from '../controllers/review_controller.js'

const reviewRouter = Router()

reviewRouter.post("/", addReview)

reviewRouter.get("/:contentId", getReviews)

export default reviewRouter

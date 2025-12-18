import { createReview, showReviewsByContent } from "../models/review_model.js";

export async function addReview(req,res,next){
    try{
        const { user_id, content_id, review_text, rating } = req.body;

        if (!rating || rating < 1 || rating > 10) {
        return res.status(400).json({ error: "Rating must be between 1 and 10" });
        }

        const newReview = await createReview (user_id, content_id, review_text, rating)
        res.json(newReview)
    } catch(err){
        next(err)
    }
}

export async function getReviews(req,res, next){
    try{
        const contentId = req.params.contentId
        const reviews = await showReviewsByContent(contentId)
        res.json(reviews)
    }catch(err){
        next(err)
    }
}

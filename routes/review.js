const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,validateReview,isReviewAuthor } = require("../middleware.js");




//reviews Route for posting 

router.post("/", 
    isLoggedIn,
    validateReview, wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
        newReview.author=req.user._id;
    listing.review.push(newReview);
    await newReview.save();
    await listing.save();

    req.flash("success", "New Review Added");
    res.redirect(`/listings/${listing.id}`);

}));

//delete route of reviews
router.delete("/:reviewId", 
    isLoggedIn,
    isReviewAuthor,   
    wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;

    // console.log(id);
    // console.log(reviewId);
    await Listing.findByIdAndUpdate(id, { $pull: { review: reviewId } });  //pull id mongo operator used to delete specific matched condtion from an array
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
}));

module.exports = router;
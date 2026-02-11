const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/review.js");
const { reviewSchema } = require("../schema.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");



//function for the validation of review
const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    console.log(error);
    if (error) {
        let ermsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, ermsg);
    }
    else {
        next();
    }
}



//reviews Route for posting 

router.post("/", validateReview, wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listing.review.push(newReview);
    await newReview.save();
    await listing.save();

    req.flash("success", "New Review Added");
    res.redirect(`/listings/${listing.id}`);

}));

//delete route of reviews
router.delete("/:reviewId", wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;

    // console.log(id);
    // console.log(reviewId);
    await Listing.findByIdAndUpdate(id, { $pull: { review: reviewId } });  //pull id mongo operator used to delete specific matched condtion from an array
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
}));

module.exports = router;
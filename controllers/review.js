const Review = require("../models/review.js");
const Listing = require("../models/listing.js");


module.exports.renderReviewPostingForm=async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
        newReview.author=req.user._id;
    listing.review.push(newReview);
    await newReview.save();
    await listing.save();

    req.flash("success", "New Review Added");
    res.redirect(`/listings/${listing.id}`);

};



module.exports.destroyReview=async (req, res) => {
    let { id, reviewId } = req.params;

    // console.log(id);
    // console.log(reviewId);
    await Listing.findByIdAndUpdate(id, { $pull: { review: reviewId } });  //pull id mongo operator used to delete specific matched condtion from an array
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
};
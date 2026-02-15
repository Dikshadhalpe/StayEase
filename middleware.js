const Listing = require("./models/listing");
const { listingSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");
const { reviewSchema } = require("./schema.js");
const Review = require("./models/review");

module.exports.isLoggedIn = (req, res, next) => {
    console.log(req.user);

    if (!req.isAuthenticated()) {
        //redurect URl after login
        req.session.redirecturl=req.originalUrl;
        req.flash("error", "You must be logged in");
        return res.redirect("/login");
    }
    next();
};


module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
        delete req.session.redirectUrl;
    } else {
        res.locals.redirectUrl = "/listings"; // fallback page
    }
    next();
};


module.exports.isOwner=async (req,res,next)=>{
    let { id } = req.params;
    let listing= await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You can't make changes");
        return res.redirect(`/listings/${id}`);
    }
    next();
};


module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    console.log(error);
    if (error) {
        let ermsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, ermsg);
    }
    else {
        next();
    }
};

module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    console.log(error);
    if (error) {
        let ermsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, ermsg);
    }
    else {
        next();
    }
};

module.exports.isReviewAuthor=async (req,res,next)=>{
    let { id,reviewId } = req.params;
    let listing= await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error","You can't make changes");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

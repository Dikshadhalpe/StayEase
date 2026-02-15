const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const { isLoggedIn } = require("../middleware.js");



//function for validate listing
const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    console.log(error);
    if (error) {
        let ermsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, ermsg);
    }
    else {
        next();
    }
}

//index Route
router.get("/", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
});

//New route
router.get("/new", isLoggedIn, (req, res) => {
    res.render("listings/new.ejs");
});


//show route
router.get("/:id", async (req, res) => {
    // let { id } = req.params;
    const listing = await Listing.findById(req.params.id).populate("review");
    if (!listing) {
        req.flash("error", "Listing Does Not Exits");
    }
    res.render("listings/show.ejs", { listing });
});

//create route
router.post("/", isLoggedIn, validateListing, wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listings");
})
);

//Edit route
router.get("/:id/edit", isLoggedIn, async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing Does Not Exits");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
});

//update route
router.put("/:id", isLoggedIn, validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Updated");
    res.redirect("/listings");

}));

//delete route
router.delete("/:id", isLoggedIn, wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let delListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
    // res.send("Deleted Succesfully");
}));


module.exports = router;
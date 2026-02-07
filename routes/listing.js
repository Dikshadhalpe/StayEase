const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");




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
router.get("/new", (req, res) => {
    res.render("listings/new.ejs");
});


//show route
router.get("/:id", async (req, res) => {
    // let { id } = req.params;
    const listing = await Listing.findById(req.params.id).populate("review");
    res.render("listings/show.ejs", { listing });
});

//create route
router.post("/", validateListing, wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
})
);

//Edit route
router.get("/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});

//update route
router.put("/:id", validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect("/listings");

}));

//delete route
router.delete("/:id", wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let delListing = await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
    // res.send("Deleted Succesfully");
}));


module.exports = router;
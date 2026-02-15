const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner,validateListing } = require("../middleware.js");



//function for validate listing

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
    const listing = await Listing.findById(req.params.id)
    .populate({path:"review",populate:{
        path: "author"
    }})
    .populate("owner");
    if (!listing) {
        req.flash("error", "Listing Does Not Exits");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
    console.log(listing);
});

//create route
router.post("/", isLoggedIn, validateListing, wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner=req.user._id;
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
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
});

//update route
router.put("/:id", 
    isLoggedIn,
    isOwner, //error of not gettting listing after adding MW showing error
    validateListing, 
    wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Updated");
    res.redirect("/listings");
}));

//delete route
router.delete("/:id", 
    isLoggedIn, 
    isOwner,
    wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let delListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
    // res.send("Deleted Succesfully");
}));


module.exports = router;
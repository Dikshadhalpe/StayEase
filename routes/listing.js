const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner,validateListing } = require("../middleware.js");
const listingController=require("../controllers/listing");

//for show and create listing
router
    .route("/")
    .get( wrapAsync(listingController.index))
    .post( 
    isLoggedIn,
    // upload.single("listing[image]"),//multer process the data in req.file 
    validateListing, 
    wrapAsync(listingController.createListing));
    

   

//New route
router.get("/new", isLoggedIn,listingController.renderNewForm);


//for edit ,update and delete
router
        .route("/:id")
        .get( listingController.showListing)
        .put( isLoggedIn,
            isOwner, 
            wrapAsync(listingController.updateListing))
        .delete(
            isLoggedIn, 
            isOwner,
            wrapAsync(listingController.deteleListing));


//Edit route
router.get("/:id/edit", isLoggedIn, listingController.renderEditListingForm);


module.exports = router;
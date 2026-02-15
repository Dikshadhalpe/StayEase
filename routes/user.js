const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController=require("../controllers/user");


router.get("/signup",userController.renderSignupForm);

//Post route for signup
router.post("/signup", 
    wrapAsync(userController.signupUser));

//login form gor user
router.get("/login", userController.loginForm);


//Psot Login 
router.post(
    "/login",
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }),
    userController.login
);

router.get("/logout",userController.logout);

module.exports = router;
const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");

router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});


//Post route for signup
router.post("/signup", wrapAsync(async (req, res) => {
    try {
        let { username, email, password } = req.body;

        const newUser = new User({ email, username });
        await User.register(newUser, password);

        req.flash("success", "Welcome to StayEase");

        return res.redirect("/listings");

    } catch (e) {
        req.flash("error", "User Already Registered");
        return res.redirect("/signup");
    }
}));



router.get("/login", (req, res) => {
    res.render("users/login.ejs");
});


// router.post(
//     "/login",
//     passport.authenticate("local", {
//         failureRedirect: '/login',
//         failureFlash: true
//     }),
//     (req, res) => {
//         res.send("welcome to StayEase");
//     }
// );
//Psot Login 
router.post(
    "/login",
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }),
    async (req, res) => {
        req.flash("success", "Logged in successfully");
        res.redirect("/listings");
    }
);


module.exports = router;
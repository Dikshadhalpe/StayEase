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
        const registerUser = await User.register(newUser, password);
        req.login(registerUser, (err) => {
            if (err) {
                return next(err);
            }
        })
        req.flash("success", "Login into StayEase");
        res.redirect("/listings");
    } catch (e) {
        req.flash("error", e.message);
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

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are logged Out Now");
        res.redirect("/listings");
    });
});

module.exports = router;
const User = require("../models/user.js");

module.exports.renderSignupForm=(req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signupUser=async (req, res) => {
    try {
        let { username, email, password } = req.body;

        const newUser = new User({ email, username });
        const registerUser = await User.register(newUser, password);
        req.login(registerUser, (err) => {
            if (err) {
                return next(err);
            }
        req.flash("success", "Login into StayEase");
        res.redirect("/listings");
        });
       
    } catch (e) {
        req.flash("error", e.message);
        return res.redirect("/signup");
    }
};

module.exports.loginForm=(req, res) => {
    res.render("users/login.ejs");
};

module.exports.login=async (req, res) => {
        req.flash("success", "Logged in successfully");
        res.redirect(res.locals.redirectUrl||"/listings");
    };


module.exports.logout= (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are logged Out Now");
        res.redirect("/listings");
    });
};
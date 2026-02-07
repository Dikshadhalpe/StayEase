const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");



const MONGOURL = "mongodb://127.0.0.1:27017/StayEase";
main()
    .then(() => {
        console.log("Connected to DB");
    })
    .catch(() => {
        console.log(err);
    })
async function main() {
    await mongoose.connect(MONGOURL);

}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));


//basic setup for app
app.get("/", (req, res) => {
    res.send("I am  root 8080");
});




// Accesing the path through router
app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);



//Middleware-handling Errors
app.use((req, res) => {
    res.status(404).render("error.ejs", {
        err: { message: "Page Not Found", statusCode: 404 }
    });
});


app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something Went Wrong" } = err;
    res.status(statusCode).render("error.ejs", { err });
});


//Server listening and starting of a server
app.listen(8080, () => {
    console.log("Server is listening to port 8080");
});
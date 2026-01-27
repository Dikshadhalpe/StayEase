const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");


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

app.set("vivew engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));



//basic setup for app
app.get("/", (req, res) => {
    res.send("I am  root 8080");
});

//index Route
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
});
//New route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

//show route
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
});




//Server listening and starting of a server
app.listen(8080, () => {
    console.log("Server is listening to port 8080");
});
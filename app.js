const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("./models/listing.js");



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
//Test listing
app.get("/testListing", async (req, res) => {
    let samplist = new listing({
        title: "My new villa",
        desc: "At the beach",
        price: 1200,
        location: "pune",
        country: "india",

    });
    await samplist.save();
    console.log("Sample was saved succefully");
    res.send("Test Succes");
});







//basic setup for app
app.get("/", (req, res) => {
    res.send("I am  root 8080");
});

app.listen(8080, () => {
    console.log("Server is listening to port 8080");
});
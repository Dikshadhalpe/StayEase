const express = require("express");
const app = express();
const mongoose = require("mongoose");

const MONGOURL = "mongodb://127.0.0.1:27017/test";
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








//basic setup for app
app.get("/", (req, res) => {
    res.send("I am  root 8080");
});

app.listen(8080, () => {
    console.log("Server is listening to port 8080");
});
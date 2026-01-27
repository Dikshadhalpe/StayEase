const express = require("express");
const app = express();
const mongoose = require("mongoose");

//basic setup for app
app.listen(8080, () => {
    console.log("Server is listening to port 8080");
});
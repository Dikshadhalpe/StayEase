const mongoose = require("mongoose");
const schema = mongoose.Schema;

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: String,
    img: {
        type: String,
        set: (v) => v === " " ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP8yGuDDBINqOdIbbrUVrBZvNwCTQMp_0ZCg&s" : v,
    },
    price: Number,
    location: String,
    Country: String,
});

const listing = mongoose.model("listing", listingSchema);
module.export = listing;

const mongoose = require("mongoose");
const schema = mongoose.Schema;

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        filename: {
            type: String,
            default: "listingimage",
        },
        url: {
            type: String,
            default:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP8yGuDDBINqOdIbbrUVrBZvNwCTQMp_0ZCg&s",
        },
    },
    price: Number,
    location: String,
    Country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

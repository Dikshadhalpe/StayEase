const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js")

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
                set:(v)=>
                    v===""
                    ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP8yGuDDBINqOdIbbrUVrBZvNwCTQMp_0ZCg&s":v,
        },
    },
    price: Number,
    location: String,
    country: String,
    review: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
});

listingSchema.post("findOneAndDelete", async function (listing) {
    if (!listing) return;

    console.log("Deleting reviews for listing:", listing._id);

    await Review.deleteMany({
        _id: { $in: listing.review }
    });
});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

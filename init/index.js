const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");


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



const initDB = async () => {
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>(
       {...obj,owner:'69918079e0a86374e5d066af'
    }));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
};

initDB();

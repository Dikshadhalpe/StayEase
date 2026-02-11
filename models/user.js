const mongoose = require("mongoose");
const schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;


const userSchema = new schema({
    email: {
        type: String,
        required: true
    }
});

userSchema.plugin(passportLocalMongoose);  // ✅ CORRECT


module.exports = mongoose.model("User", userSchema);
const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema({
    // _id:{
    //     type: mongoose.Schema.ObjectId,
    //     required: true,
    //     ref: "Token",
    // },
    access_token: {
        type: String,
        require: [true,"access token"],
    }
},{
    timestamps: true,
})

module.exports = mongoose.model("access_token", tokenSchema);
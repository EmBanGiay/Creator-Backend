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
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expireTime: {
        type: Date,
        default: Date.now,
    }
})

tokenSchema.pre('save', function (next) {
    //set createdAt/createDay to Vietnamese timezone auto
    const vietnamTimeOffset = 7 * 60 * 60 * 1000;
    this.createdAt = new Date(this.createdAt.getTime() + vietnamTimeOffset);
    // //set expireTime auto
    const expireTimeOffset = 55 * 60 * 1000; 
    this.expireTime = new Date(this.expireTime.getTime() + vietnamTimeOffset + expireTimeOffset);

    next();
});

module.exports = mongoose.model("access_token", tokenSchema);
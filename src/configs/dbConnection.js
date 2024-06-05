const mongoose = require("mongoose");
const utils = require("../utils/utils");

const connectDb = async () => {
    try{
        const connect = await mongoose.connect(utils.Connection_DB);
        console.log("Database connected: ", connect.connection.host, connect.connection.name);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDb;
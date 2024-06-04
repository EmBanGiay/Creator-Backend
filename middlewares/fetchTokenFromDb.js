'use strict';

const TokenSchema = require("../models/tokenModel");

const fetchTokenFromDb = async (req, res, next) => {
    try {
        let latestToken = await TokenSchema.findOne().sort({ createdAt: -1 });
        let currentTIme = Date.now();
        let expireTime = latestToken.expireTime;
        if (latestToken && currentTIme < expireTime) {
            req.latestToken = latestToken;
            console.log(latestToken);
        } else {
            console.log("No token found");
            req.accessToken = null;
        }
        next();
    } catch (error) {
        console.log("Error fetching the latest token:", error);
        res.status(500).send({ message: 'Error fetching the latest token' });
    }
};

module.exports = {
    fetchTokenFromDb,
};

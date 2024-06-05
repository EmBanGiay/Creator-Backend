'use strict';
const axios = require('axios');
const utils = require("../../utils/utils");
const TokenSchema = require("../models/tokenModel");
const AES256 = require('aes-everywhere');

const AUTHHOST = 'accounts.zoho.com';
const REFRESHTOKEN = utils.Refresh_Token;
const CLIENTID = utils.Client_Id;
const CLIENTSECRET = utils.Client_Secret;
const KEY = utils.Key;

const generateToken = async (req, res, next) => {
    try {
        let urlPath = `https://${AUTHHOST}/oauth/v2/token?grant_type=refresh_token` +
            `&client_id=${CLIENTID}` +
            `&client_secret=${CLIENTSECRET}` +
            `&refresh_token=${REFRESHTOKEN}`;

        await axios.post(urlPath).then(async function (response) {

            if (!response.data.access_token) {
                res.status(400).json({ error: "Incomplete token data" });
                return;
            }

            const mongoTokenRecord = await TokenSchema.create({
                access_token: AES256.encrypt(response.data.access_token, KEY)
            });
            res.send(mongoTokenRecord);
            
            console.log(mongoTokenRecord);

            req.latestTokenExpiredTime = mongoTokenRecord.expireTime;
            next();

        });

    } catch (e) {
        next(e);
    }
};

module.exports = {
    generateToken,
};
'use strict';
const axios = require('axios');
const utils = require("../utils/utils");
const TokenSchema = require("../models/tokenModel");
const bcrypt = require("bcrypt");

const AUTHHOST = 'accounts.zoho.com';
const REFRESHTOKEN = utils.Refresh_Token;
const CLIENTID = utils.Client_Id;
const CLIENTSECRET = utils.Client_Secret;

const generateToken = async (req, res, next) => {
    try {
        let urlPath = `https://${AUTHHOST}/oauth/v2/token?grant_type=refresh_token` +
            `&client_id=${CLIENTID}` +
            `&client_secret=${CLIENTSECRET}` +
            `&refresh_token=${REFRESHTOKEN}`;

        await axios.post(urlPath).then(async function (response) {
            console.log(response.data);

            if (!response.data.access_token) {
                res.status(400).json({ error: "Incomplete token data" });
                return;
            }

            const hashedToken = await bcrypt.hash(response.data.access_token, 12);

            const token = await TokenSchema.create({
                access_token: response.data.access_token
            });

            res.send(response.data['access_token']);
        });
    } catch (e) {
        next(e);
    }
};

module.exports = {
    generateToken,
};

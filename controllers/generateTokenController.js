'use strict';
const axios = require('axios');
const utils = require("../utils/utils");
const TokenSchema = require("../models/tokenModel");
const schedule = require('node-schedule');

const AUTHHOST = 'accounts.zoho.com';
const REFRESHTOKEN = utils.Refresh_Token;
const CLIENTID = utils.Client_Id;
const CLIENTSECRET = utils.Client_Secret;
const interval = 30;//minutes

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

            //const hashedToken = await bcrypt.hash(response.data.access_token, 12);

            const mongoTokenRecord = await TokenSchema.create({
                access_token: response.data.access_token
            });

            const generateTokenResponse = {
                access_token: response.data.access_token,
                expired_time: mongoTokenRecord.expireTime
            }
            console.log(generateTokenResponse);

            // schedule.scheduleJob(`*/${interval} * * * *`, async () => {
            //     console.log(`Init job every ${interval} minute(s)`);
            //     await axios.post('http://localhost:5001/api/generateToken');
            // });

            res.send(generateTokenResponse);

        });
    } catch (e) {
        next(e);
    }
};

schedule.scheduleJob(`*/${interval} * * * *`, async () => {
        console.log(`Init job every ${interval} minute(s)`);
        await axios.post('http://localhost:5001/api/generateToken');

});

module.exports = {
    generateToken,
};

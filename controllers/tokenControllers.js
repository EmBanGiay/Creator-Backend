'use strict';
const axios = require('axios');
const utils = require("../utils/utils");
const TokenSchema = require("../models/tokenModel");
const schedule = require('node-schedule');

const AUTHHOST = 'accounts.zoho.com';
const REFRESHTOKEN = utils.Refresh_Token;
const CLIENTID = utils.Client_Id;
const CLIENTSECRET = utils.Client_Secret;
const interval = 0.5;//minutes

const scheduleJob = () => {
    // Schedule a job to run every 30 seconds using node-schedule
    schedule.scheduleJob('*/30 * * * * *', async () => {
        console.log('Init job every 30 seconds');
        try {
            await axios.post('http://localhost:5001/api/generateToken');
        } catch (e) {
            console.error('Error in scheduled job:', e);
        }
    });
    console.log('Scheduled job to run every 30 seconds.');
};

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

            

            res.send(generateTokenResponse);

        });
    } catch (e) {
        next(e);
    }
};

// Schedule the job after generating the token
    scheduleJob();

module.exports = {
    generateToken,
};

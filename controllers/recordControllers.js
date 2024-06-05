'use strict';
const axios = require('axios');
const utils = require("../utils/utils");
const TokenSchema = require("../models/tokenModel");

const HOST = 'creator.zoho.com';
const APPURI = utils.App_URI;

const getRecord = async (req, res) => {
    
    let urlPath = `https://${HOST}/api/v2/${APPURI}/report/All_Contacts`;

    try {
        let accessToken
        if (!req.latestToken) {
            accessToken = await axios.post('http://localhost:5001/api/generateToken');
            accessToken = accessToken.data.access_token;
        }else{
            accessToken = req.latestToken.access_token;
        }
        await axios.get(urlPath, {
            headers: {
                Authorization: `Zoho-oauthtoken ${accessToken}`
            }
        }).then(function (response) {
            res.send(response.data);
        }).catch((error) => {
            console.log('error ' + error);
            res.status(500).send({ message: 'Error retrieving record' });
        });
    } catch (error) {
        console.log('error ' + error);
        res.status(500).send({ message: 'Error generating access token' });
    }
};

module.exports = {
    getRecord,
};

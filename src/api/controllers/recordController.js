'use strict';
const axios = require('axios');
const utils = require("../../utils/utils");
const AES256 = require('aes-everywhere');

const HOST = 'creator.zoho.com';
const APPURI = utils.App_URI;
const KEY = utils.Key;

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
                Authorization: `Zoho-oauthtoken ${AES256.decrypt(accessToken, KEY)}`
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

//Other APIs like add Records,

module.exports = {
    getRecord,
};
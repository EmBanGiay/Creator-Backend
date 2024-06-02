'use strict';
const axios = require('axios');
const utils = require("../utils/utils");

const HOST = 'creator.zoho.com';
const APPURI = utils.App_URI;

const getRecord = async (req, res) => {
    let urlPath = `https://${HOST}/api/v2/${APPURI}/report/All_Contacts`;

    try {
        let accessToken = await axios.post('http://localhost:5001/api/generateToken');

        await axios.get(urlPath, {
            headers: {
                Authorization: `Zoho-oauthtoken ${accessToken.data}`
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

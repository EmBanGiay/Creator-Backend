'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const utils = require("./utils/utils");
const connectDb = require('./configs/dbConnection');
const TokenSchema = require("./models/tokenModel");

const app = express();
app.use(bodyParser.json());
app.use(cors());

connectDb();
//Variable
const HOST = 'creator.zoho.com';
const AUTHHOST = 'accounts.zoho.com';
const REFRESHTOKEN = utils.Refresh_Token;
const CLIENTID = utils.Client_Id;
const CLIENTSECRET = utils.Client_Secret;
const APPURI = utils.App_URI;
//const PORT = process.env.PORT || 3001;

app.post("/generateToken", async (req, res) => {
    try {

        let urlPath = `https://${AUTHHOST}/oauth/v2/token?grant_type=refresh_token` +
            `&client_id=${CLIENTID}` +
            `&client_secret=${CLIENTSECRET}` +
            `&refresh_token=${REFRESHTOKEN}`;


        await axios.post(urlPath).then(async function (response) {
            console.log(response.data);

            // Kiểm tra dữ liệu response.data
        if (!response.data.access_token) {
            res.status(400).json({ error: "Incomplete token data" });
            return;
        }

        const token = await TokenSchema.create({
            access_token: response.data.access_token,
        });

            res.send(response.data['access_token']);
        });
    }
    catch (e) {
        res
			.status(500)
			.send({
				message: "Internal Server Error. Please try again after sometime.",
			});
    }
})




app.get("/getrecord/:id", async (req, res) => {
    let urlPath = `https://${HOST}/api/v2/${APPURI}/report/All_Contacts`;

    let accessToken = await axios.post('http://localhost:5001/generateToken');

    await axios.get(urlPath,
        {
            headers: {
                Authorization: `Zoho-oauthtoken ${accessToken.data}`        
            }
        }
    ).then(function (response) {
        res.send(response.data);
    }).catch((error) => {
        console.log('error ' + error);
     });
});

app.listen(5001, () => {
    console.log('Listening on 5001');
});
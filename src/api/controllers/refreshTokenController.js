'use strict';
const { invokeAPIonSpecificTime } = require("../jobs/InvokeAPIonSpecificTimeJob");
const { formatTimestampToLocalDateString } = require("../helpers/formatTimeStampToLocalDateStrHelper");

const refreshToken = async (req, res) => { 
        let invokeTime = new Date(req.latestTokenExpiredTime).getTime();
        //console.log(invokeTime);
        const formattedDate = formatTimestampToLocalDateString(invokeTime - 7 * 60 * 60 * 1000);
        const url = 'http://localhost:5001/api/generateToken';
        //console.log(formattedDate);
        invokeAPIonSpecificTime(formattedDate, url);

}


module.exports = { refreshToken };


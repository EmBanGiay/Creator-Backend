'use strict';
const schedule = require('node-schedule');
const axios = require('axios');

const invokeAPIonSpecificTime = (date, url) => {
    schedule.scheduleJob(date, async () => {

        console.log(`Init job at`, date);

        await axios.post(url);

    });
}

module.exports = { invokeAPIonSpecificTime, };
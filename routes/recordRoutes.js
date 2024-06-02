'use strict';
const express = require('express');
const { getRecord } = require('../controllers/recordControllers');

const router = express.Router();

router.get("/getrecord/:id", getRecord);

module.exports = router;

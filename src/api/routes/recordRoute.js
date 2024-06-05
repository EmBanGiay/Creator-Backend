'use strict';
const express = require('express');
const { getRecord } = require('../controllers/recordController');
const { fetchTokenFromDb } = require('../controllers/fetchTokenFromDb');

const router = express.Router();

router.get("/getrecord/:id", fetchTokenFromDb , getRecord );

module.exports = router;

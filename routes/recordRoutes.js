'use strict';
const express = require('express');
const { getRecord } = require('../controllers/recordControllers');
const { fetchTokenFromDb } = require('../middlewares/fetchTokenFromDb');

const router = express.Router();

router.get("/getrecord/:id", fetchTokenFromDb , getRecord );

module.exports = router;

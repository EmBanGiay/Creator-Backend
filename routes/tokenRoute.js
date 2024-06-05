'use strict';
const express = require('express');
const { generateToken } = require('../controllers/generateTokenController');
const { refreshToken } = require('../controllers/refreshTokenController');

const router = express.Router();

router.post("/generateToken", generateToken, refreshToken);

module.exports = router;

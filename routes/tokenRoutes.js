'use strict';
const express = require('express');
const { generateToken } = require('../controllers/tokenControllers');

const router = express.Router();

router.post("/generateToken", generateToken);

module.exports = router;

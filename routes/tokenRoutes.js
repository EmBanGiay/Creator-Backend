'use strict';
const express = require('express');
const { generateToken } = require('../controllers/tokenControllers');
const { fetchTokenFromDb } = require('../middlewares/fetchTokenFromDb');

const router = express.Router();

router.post("/generateToken", generateToken);

module.exports = router;

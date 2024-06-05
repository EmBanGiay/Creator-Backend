'use strict';
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDb = require('./configs/dbConnection');
const errorHandler = require('./middlewares/errorHandler');

const tokenRoutes = require('./routes/tokenRoute');
const recordRoutes = require('./routes/recordRoute');

const app = express();
app.use(bodyParser.json());
app.use(cors());

connectDb();

app.use('/api', tokenRoutes);
app.use('/api', recordRoutes);
app.use(errorHandler);

(function () {
    axios.post('http://localhost:5001/api/generateToken');
})();

app.listen(5001, () => {
    console.log('Listening on 5001');
});

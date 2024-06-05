'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDb = require('./configs/dbConnection');
const errorHandler = require('./api/middlewares/errorHandler');
const tokenRoutes = require('./api/routes/tokenRoute');
const recordRoutes = require('./api/routes/recordRoute');

require('./start/systemStarter');

const app = express();
app.use(bodyParser.json());
app.use(cors());

connectDb();

app.use('/api', tokenRoutes);
app.use('/api', recordRoutes);
app.use(errorHandler);


app.listen(5001, () => {
    console.log('Listening on 5001');
});
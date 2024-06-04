'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDb = require('./configs/dbConnection');
const errorHandler = require('./middlewares/errorHandler');

const tokenRoutes = require('./routes/tokenRoutes');
const recordRoutes = require('./routes/recordRoutes');

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

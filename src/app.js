const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes/api');

const app = express();

app.use(cors()); // Enable CORS for all requests

app.use(express.static('public'));
app.use(express.json());

app.use('/api', apiRouter);

module.exports = app;

const express = require('express');
const app = express();

const usersRoutes = require('./userRoutes');

app.use(express.json());


app.use('/user', usersRoutes);

module.exports = app;
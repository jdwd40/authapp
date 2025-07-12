const express = require('express');
const app = express();

const usersRoutes = require('./userRoutes');

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ msg: 'Hello from the API!' });
});

app.use('/user', usersRoutes);

module.exports = app;
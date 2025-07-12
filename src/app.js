const express = require('express');
const cors = require('cors');
const apiRouter = require('./routes/api');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all requests
app.use(express.static('public'));
app.use(express.json());

// Routes
app.use('/api', apiRouter);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.originalUrl} not found`
  });
});

// Global error handler
app.use(errorHandler);

module.exports = app;

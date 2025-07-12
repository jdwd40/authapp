'use strict';

const { ValidationError, DatabaseError } = require('sequelize');

// Global error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Handle Sequelize validation errors
  if (err instanceof ValidationError) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation error',
      errors: err.errors.map(e => ({
        field: e.path,
        message: e.message
      }))
    });
  }

  // Handle Sequelize database errors
  if (err instanceof DatabaseError) {
    return res.status(500).json({
      status: 'error',
      message: 'Database error',
      error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
    });
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid token'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      status: 'error',
      message: 'Token expired'
    });
  }

  // Default error handler
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    status: 'error',
    message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
};

module.exports = errorHandler;

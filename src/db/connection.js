const { Pool } = require('pg');
const dotenv = require('dotenv');
const ENV = process.env.NODE_ENV || 'development';

console.log('ENV:', ENV);

const dotenvResult = dotenv.config({
  path: `${__dirname}/../../.env.${ENV}`, // Modify the path to point to the root of the app
});

if (dotenvResult.error) {
  console.error('Error loading .env file:', dotenvResult.error);
}

// console.log('Database:', process.env.DB_DATABASE);

if (!process.env.DB_DATABASE) {
  throw new Error('DB_DATABASE not set');
}

// Configure the Pool with the correct environment variable
const pool = new Pool({
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  // Add other configuration parameters as needed, such as user, password, host, port, etc.
});

pool.on('error', (err) => {
  console.error('Error on idle client:', err.message);
  process.exit(-1);
});

module.exports = pool;

const app = require('./app'); // Import the app from app.js
const dotenv = require('dotenv');
const { sequelize } = require('./models');

// Load environment variables
const ENV = process.env.NODE_ENV || 'development';
dotenv.config({ path: `.env.${ENV}` });

console.log('ENV:', ENV);
console.log('Database:', process.env.DB_DATABASE || 'authapp_db');

const PORT = process.env.PORT || 3000;

// Initialize database connection and start server
sequelize.sync({ alter: false }) // Set to true during development if you want to auto-update tables
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });

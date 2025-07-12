const { Sequelize } = require('sequelize');
const { Pool } = require('pg');

// Create a connection pool
const sequelize = new Sequelize('jd', 'jd', '', { 
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  dialectOptions: {
    useUTC: false, // for reading from database
  },
  timezone: '-05:00', // for writing to database
  logging: console.log
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    
    // Try a simple query
    const result = await sequelize.query('SELECT NOW()', { 
      type: Sequelize.QueryTypes.SELECT 
    });
    console.log('Database time:', result);
    
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await sequelize.close();
  }
}

testConnection();

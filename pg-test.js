const { Pool } = require('pg');
require('dotenv').config({ path: '.env.development' });

// Create a connection pool
const pool = new Pool({
  user: process.env.DB_USER || 'jd',
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_DATABASE || 'auth_app'
});

async function testConnection() {
  try {
    // Test the connection
    const client = await pool.connect();
    console.log('Connected to PostgreSQL successfully');
    
    // Run a simple query
    const result = await client.query('SELECT current_user, current_database()');
    console.log('Query result:', result.rows[0]);
    
    // Release the client
    client.release();
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error);
  } finally {
    // Close the pool
    await pool.end();
  }
}

testConnection();

const { Pool } = require('pg');

// Try with a specific password
const pool = new Pool({
  user: 'jd',
  password: 'password', // Try a common default password
  host: 'localhost',
  database: 'jd',
  port: 5432,
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

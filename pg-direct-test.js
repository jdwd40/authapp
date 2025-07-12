const { Pool } = require('pg');

// Create a connection pool with different authentication methods
const pool = new Pool({
  user: 'jd',
  host: 'localhost',
  database: 'jd',
  port: 5432,
  // No password specified - will try to use other authentication methods
});

async function testConnection() {
  try {
    // Test the connection
    const client = await pool.connect();
    console.log('Connected to PostgreSQL successfully using pg directly');
    
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

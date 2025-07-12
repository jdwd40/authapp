const db = require('../connection');
const userData = require('../../db/data/development/users');
const format = require('pg-format');

const seed = async (userData) => {
    try {
        // Drop the table if it exists
        await db.query(`DROP TABLE IF EXISTS users;`);

        // Create the users table
        await db.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                username VARCHAR(255) NOT NULL UNIQUE,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                funds DECIMAL DEFAULT 0,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Insert default users Alice and Bob if needed
        const initialUsers = [
            ['Alice', 'alice', 'alice@me.com', 'password', 1000],
            ['Bob', 'bob', 'bob@me.com', 'password', 1000]
        ];

        const insertInitialUsersQuery = format(
            'INSERT INTO users (name, username, email, password, funds) VALUES %L;',
            initialUsers
        );
        await db.query(insertInitialUsersQuery);

        // Insert additional user data from userData
        const insertUsersQueryStr = format(
            'INSERT INTO users (name, username, email, password, funds) VALUES %L RETURNING *;',
            userData.map(({ name, username, email, password, funds }) => [
                name,
                username,
                email,
                password,
                funds
            ])
        );

        const result = await db.query(insertUsersQueryStr);
       // console.log('Inserted users:', result.rows);
    } catch (err) {
        console.error('Error seeding database:', err);
    }
};

// Call the seed function with userData
// seed(userData);

module.exports =  seed;

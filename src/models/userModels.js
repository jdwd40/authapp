const db = require('../db/connection');

exports.selectUserByUsername = async (username, password) => {
  const user = await db.query(`SELECT * FROM users WHERE username = $1`, [username]);

  if (!user.rows[0]) {
    return "No user exists with that username.";
  }

  if (user.rows[0].password !== password) {
    return "Incorrect password.";
  }

  return "Logged in.";
} 

exports.createUser = async (name, username, password) => {
  const user = await db.query(`INSERT INTO users (name, username, password) VALUES ($1, $2, $3) RETURNING *`, [name, username, password]);
  return user.rows[0];
}

exports.selectAllUsers = async () => {
  const users = await db.query(`SELECT * FROM users`);
  return users.rows;
}

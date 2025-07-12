const { Sequelize, DataTypes } = require('sequelize');
const config = require('./config/config.js');
const bcrypt = require('bcryptjs');

// Create Sequelize instance using development config
const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
    port: config.development.port,
    logging: false
  }
);

// Define User model to match your migration
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'users'
});

async function addJdUser() {
  try {
    // Check if jd user already exists
    const existingUser = await User.findOne({ where: { username: 'jd' } });
    
    if (existingUser) {
      console.log('User "jd" already exists in the database.');
      return;
    }
    
    // Create a new user with username 'jd'
    const hashedPassword = bcrypt.hashSync('password', 10); // You can change 'password' to your preferred password
    
    const newUser = await User.create({
      name: 'JD User',
      username: 'jd',
      email: 'jd@example.com',
      password: hashedPassword
    });
    
    console.log('User "jd" created successfully:');
    console.log(`- ${newUser.id}: ${newUser.name} (${newUser.username}, ${newUser.email})`);
    console.log('Password is set to: "password" (without quotes)');
    
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    await sequelize.close();
  }
}

addJdUser();

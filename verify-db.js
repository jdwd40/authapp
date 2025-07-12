const { Sequelize, DataTypes } = require('sequelize');
const config = require('./config/config.js');

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

async function verifyDatabase() {
  try {
    // Test connection
    await sequelize.authenticate();
    console.log('Connection established successfully.');
    
    // Query users
    const users = await User.findAll();
    console.log(`Found ${users.length} users in the database:`);
    
    // Display user information (excluding passwords)
    users.forEach(user => {
      console.log(`- ${user.id}: ${user.name} (${user.username}, ${user.email})`);
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await sequelize.close();
  }
}

verifyDatabase();

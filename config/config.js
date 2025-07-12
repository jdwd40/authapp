require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

module.exports = {
  development: {
    username: process.env.DB_USER || 'jd',
    password: process.env.DB_PASSWORD || 'K1ller1921',
    database: process.env.DB_DATABASE || 'authapp_db',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,
    logging: true
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE+'_test',
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    logging: false
  }
};

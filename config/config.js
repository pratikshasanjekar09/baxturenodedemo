require('dotenv').config();

module.exports = {
  local: {
    username: process.env.username,
    password: process.env.password,
    database: process.env.DATABASE,
    host: process.env.DBHOST,
    dialect: process.env.dialect
  },
  development: {
    username: process.env.DBUSERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.DBHOST,
    dialect: process.env.DIALECT
  },
  production: {
    username: process.env.DBUSERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.DBHOST,
    dialect: process.env.DIALECT
  }
};
'use strict'

const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  development: {
    database: process.env.DB_DATABASE || '',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
    },
    logging: process.env.DEBUG === 'true' ? (...msg) => console.log(msg) : console.log,
  },

  production: {
    database: process.env.DB_DATABASE || '',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
}

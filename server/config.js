'use strict'

module.exports = {
  db: {
    database: process.env.DB_NAME || 'platziverse',
    username: process.env.DB_USER || 'luis',
    password: process.env.DB_PASS || 'jimyluis',
    host: process.env.DB_HOST || 'localhost'
  },
  settings: {
    secret: process.env.SECRET || 'EventAppSecret',
    name: process.env.NAME || 'EventApi',
    port: process.env.PORT || 2715,
    exp: process.env.EXP || 86400
  }
}

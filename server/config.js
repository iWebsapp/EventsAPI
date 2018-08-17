'use strict'

module.exports = {
  settings: {
    db: process.env.DB || 'mongodb://localhost:27017/EventDB',
    secret: process.env.SECRET || 'EventAppSecret',
    name: process.env.NAME || 'EventApi',
    port: process.env.PORT || 2715,
    exp: process.env.EXP || 86400,
    url: process.env.LINK || "localhost:2715"
  }
}

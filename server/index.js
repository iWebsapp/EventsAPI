'use strict'

const express = require('express')
const chalk = require('chalk')
const http = require('http')
const Debug = require('debug')
const bodyParser = require('body-parser')
const config = require('./config')
const formData = require('express-form-data')
const docs = require('./html')
const src = require('./src-router')
const mongoose = require('mongoose')
const async = require('async')
// MODULE CHAT
const app = express()
const { users, about, privacy, places, help, report } = require('./routes')
// CREATE SERVER FROM EXPRESS
const server = http.Server(app)
// PORT API
const PORT = config.settings.port
const debug = new Debug(`${config.settings.name}:lobby`)

const options = {
  keepExtenions: true,
  autoClean: true
}

// uploadDir: 'imgs',
app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(formData.parse(options))
app.use(formData.format())

if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS')
    next()
  })
}

if (!module.parent) {
  process.on('uncaughtException', handleFatalError)
  process.on('unhandledRejection', handleFatalError)

  mongoose.Promise = global.Promise
  mongoose.connect(config.settings.db, { autoIndex: false, useNewUrlParser: true }).then( data => {
    server.listen(PORT, () => {
      debug(`${config.settings.name} esta corriendo en el puerto ${PORT}`)
    })
  }).catch( err => {
    console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  })

}

function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

app.get('/', function (req, res) {
  res.render(__dirname + '/html/docs/login.ejs')
})

// ALL ROUTES FROM SRC
app.use('/src', src)
// ALL ROUTES FROM DOCS
app.use('/docs/v1', docs)

// ALL ROUTES FROM API V1
app.use('/api/v1/users', users)
app.use('/api/v1/abouts', about)
app.use('/api/v1/privacy', privacy)
app.use('/api/v1/help', help)
app.use('/api/v1/report', report)
app.use('/api/v1/places', places)

'use strict'

const express = require('express')
const chalk = require('chalk')
const http = require('http')
const Debug = require('debug')
const bodyParser = require('body-parser')
const config = require('./config')
const formData = require('express-form-data')
const docs = require('./docs-router')
const src = require('./src-router')
// MODULE CHAT
const app = express()
import { users } from './routes'
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

// ALL ERRORS
app.use((err, req, res, next) => {
  debug(`Error: ${err.message}`)

  if (err.message.match(/User not found/)) {
    return res.status(404).send({ error: err.message })
  }

  if (err.message.match(/The password do not match/)) {
    return res.status(400).send({ error: err.message })
  }

  return res.status(500).send({ error: err.message })
})

function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

if (!module.parent) {
  process.on('uncaughtException', handleFatalError)
  process.on('unhandledRejection', handleFatalError)

  server.listen(PORT, () => {
    debug(`${config.settings.name} esta corriendo en el puerto ${PORT}`)
  })
}

app.get('/docs', function(req, res){
  res.render(__dirname + '/html/docs/login.ejs')
})

//ALL ROUTES FROM SRC
app.use('/src', src)
//ALL ROUTES FROM DOCS
app.use('/docs/v1', docs)
// ALL ROUTES FROM USERS
app.use('/api/v1/users', users)

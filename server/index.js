'use strict'

const express = require('express')
const chalk = require('chalk')
const http = require('http')
const Debug = require('debug')
const bodyParser = require('body-parser')
const config = require('./config')
const formData = require('express-form-data')

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

//ROUTES
// ALL MODULS FROM USERS
app.use('/api/users', users)

//STATIC HTML
//IMAGES
// LOGIN DOCS
app.get('/', function(req, res){
  res.sendFile(__dirname + '/html/docs/login.html')
})

// IMAGENES ROUTES
app.get('/pictures/:name', function(req, res){
  const name = req.params.name
  res.sendFile(__dirname + '/images/' + name)
})

// RESOURCES ROUTES
app.get('/resources/:type/:name', function(req, res){
  const type = req.params.type
  const name = req.params.name
  res.sendFile(__dirname + '/html/resources/' + type + "/" + name)
})

//ACTIVATE USER
app.get('/activate/user', function(req, res){
  res.sendFile(__dirname + '/html/docs/email.html')
})

// MAIN DOCS
app.get('/docs/v1/', function(req, res){
  res.sendFile(__dirname + '/html/docs/inicio.html')
})

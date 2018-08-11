'use strict'

const express = require("express")
const chalk = require("chalk")
const http = require("http")
const Debug = require("debug")
const bodyParser = require("body-parser")
const config = require("./config")
const formData = require("express-form-data")

//MODULE CHAT
const app = express()
import { users } from './routes'
//CREATE SERVER FROM EXPRESS
const server = http.Server(app)
//PORT API
const PORT = config.settings.port
const debug = new Debug(`${config.settings.name}:lobby`)

app.use(express.static('client'))

const options = {
  keepExtenions: true,
  autoClean: true
}
//uploadDir: 'imgs',
app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({ extended: true }))
app.use( formData.parse(options) )
app.use( formData.format() )

if (process.env.NODE_ENV === 'development') {
  app.use( (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS')
    next()
  })
}

//ALL ERRORS
app.use((err, req, res, next) => {
  debug(`Error: ${err.message}`)

  if (err.message.match(/not found/)) {
    return res.status(404).send({ error: err.message })
  }

  res.status(500).send({ error: err.message })
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

//ALL MODULS FROM USERS
app.use('/api/users', users)

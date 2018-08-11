const express = require('express')
const config = require('../config')
const jwt = require('jsonwebtoken')
const helper = require('sendgrid').mail
const auth = require('express-jwt')
const guard = require('express-jwt-permissions')()
const async = require('async')
const Debug = require('debug')

const app = express.Router()
const debug = new Debug(`${config.settings.name}:router:users`)

//route login
app.post('/login', (req, res, next) => {

    debug('this is a login')
    res.status(200).json({
      message: 'Login success'
    })

})

export default app

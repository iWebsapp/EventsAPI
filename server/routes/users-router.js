const express = require('express')
const config = require('../config')
const async = require('async')
const Debug = require('debug')
const { findAllUsersFunction, loginUserFunction, createUserFunction } = require('../functions')
const app = express.Router()
const debug = new Debug(`${config.settings.name}:router:users`)

//route login
app.post('/login', loginUserFunction, (req, res, next) => {

    debug('this is a login')
    res.status(200).json({
      message: 'Login success'
    })

})

//route create user
app.post('/login', createUserFunction, (req, res, next) => {

    debug('this is a cerate user')
    res.status(200).json({
      message: 'create success'
    })

})
export default app

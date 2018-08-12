'use strict'

const express = require('express')
const config = require('../config')
const async = require('async')
const Debug = require('debug')
const { findAllUsersFunction, loginUserFunction, createUserFunction } = require('../functions')
const { loginUserValid } = require('../validations')
const app = express.Router()
const debug = new Debug(`${config.settings.name}:router:users`)

//route login
app.post('/login', loginUserValid, loginUserFunction, (req, res, next) => {

    try {
        const { message, token, idUser } = req
        if (message == 'Login success'){
            res.status(200).json({
                message,
                token,
                idUser
            })
        }
    } catch (e) {
        return handleFatalError(e)
    }

})

//route create user
app.post('/login', createUserFunction, (req, res, next) => {

    debug('this is a cerate user')
    res.status(200).json({
      message: 'create success'
    })

})

function handleFatalError (err) {
  console.error(`${chalk.red('[Error]')} ${err.message}`)
  console.error(err.stack)
}

export default app

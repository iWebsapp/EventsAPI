'use strict'

const express = require('express')
const config = require('../config')
const async = require('async')
const Debug = require('debug')
const { findAllUsersFunction, loginUserFunction, createUserFunction, activateUserFunction, verifyTokenFunction } = require('../functions')
const { loginUserValid, idValid } = require('../validations')
const app = express.Router()
const debug = new Debug(`${config.settings.name}:router:users`)
const usersModel = require('../models/users-model')

// route login
app.post('/login', loginUserValid, loginUserFunction, (req, res, next) => {
  try {
    const { message, token, idUser } = req
    if (message == 'Login success') {
      res.status(200).json({
        message,
        token,
        idUser
      })
    } else {
      res.status(500).json({ message: 'An error has occurred' })
    }
  } catch (e) {
    return handleError(e)
  }
})

// route create user
app.post('/create', loginUserValid, createUserFunction, (req, res, next) => {
  try {
    const { message } = req
    if (message == 'Create success') {
      res.status(200).json({
        message
      })
    } else {
      res.status(500).json({ message: 'An error has occurred' })
    }
  } catch (e) {
    return handleError(e)
  }
})


// route activate user
app.post('/activate/:id', activateUserFunction, (req, res, next) => {
  try{
      const { message } = req
      if (message == 'This user has been activated with success') {
          res.status(200).json({
            message
          })
      } else {
          res.status(500).json({ message: 'An error has occurred' })
      }
  } catch(e){
      return handleError(e)
  }
})

function handleError (err) {
  console.error(`${chalk.red('[Error]')} ${err.message}`)
  console.error(err.stack)
}

export default app

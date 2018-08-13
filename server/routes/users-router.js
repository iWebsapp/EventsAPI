'use strict'

const express = require('express')
const config = require('../config')
const async = require('async')
const Debug = require('debug')
const { findAllUsersFunction, loginUserFunction, createUserFunction,
        activateUserFunction, verifyTokenFunction, changeBirthdayUserFunction,
        changePasswordUserFunction, changeEmailUserFunction, verifyHeadersTokenFunction
      } = require('../functions')
const { loginUserValid, emailValid, passwordChangeValid, passwordValid } = require('../validations')
const app = express.Router()
const debug = new Debug(`${config.settings.name}:router:users`)
const usersModel = require('../models/users-model')
const guard = require('express-jwt-permissions')()

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
    return handleFatalError(e)
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
    return handleFatalError(e)
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
      return handleFatalError(e)
  }
})



// route change email user
app.post('/change/email', verifyHeadersTokenFunction, emailValid, changeEmailUserFunction, (req, res, next) => {
  try{
      const { message } = req
      if (message == 'The email has been changed with this user') {
          res.status(200).json({
            message
          })
      } else {
          return handleFatalError(e)
          res.status(500).json({ message: 'An error has occurred' })
      }
  } catch(e){
      return handleFatalError(e)
  }
})



// route change password user
app.post('/change/password', verifyHeadersTokenFunction, passwordValid, passwordChangeValid, changePasswordUserFunction, (req, res, next) => {
  try{
      const { message } = req
      if (message == 'The password has been changed with this user') {
          res.status(200).json({
            message
          })
      } else {
          res.status(500).json({ message: 'An error has occurred' })
      }
  } catch(e){
      return handleFatalError(e)
  }
})


// route change email user
app.post('/change/birthday', verifyHeadersTokenFunction, changeBirthdayUserFunction, (req, res, next) => {
  try{
      const { message } = req
      if (message == 'The birthday has been changed with this user') {
          res.status(200).json({
            message
          })
      } else {
          res.status(500).json({ message: 'An error has occurred' })
      }
  } catch(e){
      return handleFatalError(e)
  }
})

function handleFatalError (res, err) {
  console.error(`${chalk.red('[Error]')} ${err.message}`)
  console.error(err.stack)
  return res.status(500).json({
    message: 'An error has occurred',
    error: err.message,
    stack: err.stack
  })
}

export default app

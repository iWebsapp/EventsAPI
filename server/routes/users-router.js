'use strict'

const express = require('express')
const chalk = require('chalk')
const { loginUserFunction, createUserFunction,
  activateUserFunction, changeBirthdayUserFunction,
  changePasswordUserFunction, changeEmailUserFunction,
  verifyHeadersTokenFunction, allUsersFunction,
  handleError, handleFatalError
} = require('../functions')
const { idValid,  loginUserValid, emailValid, passwordChangeValid, passwordValid, birthdayValid } = require('../validations')
const app = express.Router()
// const guard = require('express-jwt-permissions')()

// route login
app.post('/login', loginUserValid, loginUserFunction, (req, res, next) => {
  try {
    const { message, token, idUser } = req
    if (message === 'Login success') {
      res.status(200).json({
        status: 200,
        message,
        token,
        idUser
      })
    } else {
      return handleError(res)
    }
  } catch (err) {
    return handleFatalError(res, err)
  }
})

// route create user
app.post('/create', loginUserValid, createUserFunction, (req, res, next) => {
  try {
    const { message } = req
    if (message === 'Create success') {
      res.status(200).json({
        status: 200,
        message
      })
    } else {
      return handleError(res)
    }
  } catch (err) {
    return handleFatalError(res, err)
  }
})

// route activate user
app.post('/activate/:id', idValid, activateUserFunction, (req, res, next) => {
  try {
    const { message } = req
    if (message === 'This user has been activated with success') {
      res.status(200).json({
        status: 200,
        message
      })
    } else {
      return handleError(res)
    }
  } catch (err) {
    return handleFatalError(res, err)
  }
})

// route change email user
app.post('/change/email', verifyHeadersTokenFunction, emailValid, changeEmailUserFunction, (req, res, next) => {
  try {
    const { message } = req
    if (message === 'The email has been changed with this user') {
      res.status(200).json({
        status: 200,
        message
      })
    } else {
      return handleError(res)
    }
  } catch (err) {
    return handleFatalError(res, err)
  }
})

// route change password user
app.post('/change/password', verifyHeadersTokenFunction, passwordValid, passwordChangeValid, changePasswordUserFunction, (req, res, next) => {
  try {
    const { message } = req
    if (message === 'The password has been changed with this user') {
      res.status(200).json({
        status: 200,
        message
      })
    } else {
      return handleError(res)
    }
  } catch (err) {
    return handleFatalError(res, err)
  }
})

// route change email user
app.post('/change/birthday', verifyHeadersTokenFunction, birthdayValid, changeBirthdayUserFunction, (req, res, next) => {
  try {
    const { message } = req
    if (message === 'The birthday has been changed with this user') {
      res.status(200).json({
        status: 200,
        message
      })
    } else {
      return handleError(res)
    }
  } catch (err) {
    return handleFatalError(res, err)
  }
})

// get all users
app.get('/all', verifyHeadersTokenFunction, allUsersFunction, (req, res, next) => {
  try {
    const { message, data } = req
    if (message === 'List of all users') {
      res.status(200).json({
        status: 200,
        message,
        data
      })
    } else {
      return handleError(res)
    }
  } catch (err) {
    return handleFatalError(res, err)
  }
})

export default app

'use strict'

const express = require('express')
const chalk = require('chalk')
const { loginUserFunction, createUserFunction,
  activateUserFunction, changeBirthdayUserFunction,
  changePasswordUserFunction, changeEmailUserFunction,
  verifyHeadersTokenFunction, allUsersFunction
} = require('../functions')
const app = express.Router()
// const guard = require('express-jwt-permissions')()

// route login
app.post('/login', loginUserFunction, (req, res, next) => {
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
      return handleError(e)
    }
  } catch (e) {
    return handleFatalError(e)
  }
})

// route create user
app.post('/create', createUserFunction, (req, res, next) => {
  try {
    const { message } = req
    if (message === 'Create success') {
      res.status(200).json({
        status: 200,
        message
      })
    } else {
      return handleError(e)
    }
  } catch (e) {
    return handleFatalError(e)
  }
})

// route activate user
app.post('/activate/:id', activateUserFunction, (req, res, next) => {
  try {
    const { message } = req
    if (message === 'This user has been activated with success') {
      res.status(200).json({
        status: 200,
        message
      })
    } else {
      return handleError(e)
    }
  } catch (e) {
    return handleFatalError(e)
  }
})

// route change email user
app.post('/change/email', verifyHeadersTokenFunction, changeEmailUserFunction, (req, res, next) => {
  try {
    const { message } = req
    if (message === 'The email has been changed with this user') {
      res.status(200).json({
        status: 200,
        message
      })
    } else {
      return handleError(e)
    }
  } catch (e) {
    return handleFatalError(e)
  }
})

// route change password user
app.post('/change/password', verifyHeadersTokenFunction, changePasswordUserFunction, (req, res, next) => {
  try {
    const { message } = req
    if (message === 'The password has been changed with this user') {
      res.status(200).json({
        status: 200,
        message
      })
    } else {
      return handleError(e)
    }
  } catch (e) {
    return handleFatalError(e)
  }
})

// route change email user
app.post('/change/birthday', verifyHeadersTokenFunction, changeBirthdayUserFunction, (req, res, next) => {
  try {
    const { message } = req
    if (message === 'The birthday has been changed with this user') {
      res.status(200).json({
        status: 200,
        message
      })
    } else {
      return handleError(e)
    }
  } catch (e) {
    return handleFatalError(e)
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
      return handleError(e)
    }
  } catch (e) {
    return handleFatalError(e)
  }
})

function handleError (res, err) {
  console.error(`${chalk.red('[Error]')} ${err.message}`)
  console.error(err.stack)
  return res.status(500).json({
    status: 500,
    error: err.message,
    stack: err.stack
  })
}


function handleFatalError (res, err) {
  console.error(`${chalk.red('[Fatal Error]')} ${err.message}`)
  console.error(err.stack)
  return res.status(500).json({
    status: 500,
    error: err.message,
    stack: err.stack
  })
  process.exit(1)
}

export default app

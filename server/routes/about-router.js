'use strict'

const express = require('express')
const chalk = require('chalk')
const { createAboutsFunction, deleteAboutsFunction, allAboutsFunction,
        verifyHeadersTokenFunction, handleError, handleFatalError  } = require('../functions')
const { addAboutValid } = require('../validations')
const app = express.Router()
// const guard = require('express-jwt-permissions')()

// route create user
app.post('/create', verifyHeadersTokenFunction, addAboutValid, createAboutsFunction, (req, res, next) => {
  try {
    const { message } = req
    if (message === 'Create about success') {
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
app.get('/all', allAboutsFunction, (req, res, next) => {
  try {
    const { message, data } = req
    if (message === 'List of all abouts') {
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

// route activate user
app.delete('/delete', verifyHeadersTokenFunction, deleteAboutsFunction, (req, res, next) => {
  try {
    const { message } = req
    if (message === 'This about has been deleted with success') {
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



export default app

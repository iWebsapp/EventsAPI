'use strict'

const express = require('express')
const { createPrivacyFunction, deletePrivacyFunction, allPrivacyFunction,
  verifyHeadersTokenFunction, handleError, handleFatalError } = require('../functions')
const { addAboutValid } = require('../validations')
const app = express.Router()
// const guard = require('express-jwt-permissions')()

// route create user
app.post('/create', verifyHeadersTokenFunction, addAboutValid, createPrivacyFunction, (req, res, next) => {
  try {
    const { message } = req
    if (message === 'Create privacy success') {
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
app.get('/all', allPrivacyFunction, (req, res, next) => {
  try {
    const { message, data } = req
    if (message === 'List of all privacy') {
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

// route activate user
app.delete('/delete', verifyHeadersTokenFunction, deletePrivacyFunction, (req, res, next) => {
  try {
    const { message } = req
    if (message === 'This privacy has been deleted with success') {
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

export default app

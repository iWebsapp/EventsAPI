'use strict'

const express = require('express')
const chalk = require('chalk')
const { createPrivacyFunction, deletePrivacyFunction, allPrivacyFunction,
        verifyHeadersTokenFunction, handleError, handleFatalError  } = require('../functions')
const { idValid, addAboutValid } = require('../validations')
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
      return handleError(e)
    }
  } catch (e) {
    return handleFatalError(e)
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
      return handleError(e)
    }
  } catch (e) {
    return handleFatalError(e)
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
      return handleError(e)
    }
  } catch (e) {
    return handleFatalError(e)
  }
})



export default app

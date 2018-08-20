'use strict'

const express = require('express')
const chalk = require('chalk')
const { createPlaceFunction, getAllPlacesFunction, getAllMyPlacesFunction,
        verifyHeadersTokenFunction, handleError, handleFatalError  } = require('../functions')
const { idValid, addPlacesValid } = require('../validations')
const app = express.Router()
// const guard = require('express-jwt-permissions')()

// route create user
app.post('/create', verifyHeadersTokenFunction, addPlacesValid, createPlaceFunction, (req, res, next) => {
  try {
    const { message } = req
    if (message === 'Create places success') {
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


app.get('/all', verifyHeadersTokenFunction, getAllPlacesFunction, (req, res, next) => {
  try {
    const { message, data } = req
    if (message === 'List of all places') {
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


app.get('/my/all', verifyHeadersTokenFunction, getAllMyPlacesFunction, (req, res, next) => {
  try {
    const { message, data } = req
    if (message === 'List of all my places') {
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

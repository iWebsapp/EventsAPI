'use strict'

const express = require('express')
const chalk = require('chalk')
const { createReportsFunction, deleteReportsFunction, allReportsFunction, getReportFunction,
        verifyHeadersTokenFunction, handleError, handleFatalError  } = require('../functions')
const { idValid, addReportValid } = require('../validations')
const app = express.Router()
// const guard = require('express-jwt-permissions')()

// route create user
app.post('/create', addReportValid, createReportsFunction, (req, res, next) => {
  try {
    const { message } = req
    if (message === 'Create report success') {
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
app.get('/all', allReportsFunction, (req, res, next) => {
  try {
    const { message, data } = req
    if (message === 'List of all reports') {
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

// get all users
app.get('/:id', idValid, getReportFunction, (req, res, next) => {
  try {
    const { message, data } = req
    if (message === 'This is a report') {
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
app.delete('/delete/:id', verifyHeadersTokenFunction, idValid, deleteReportsFunction, (req, res, next) => {
  try {
    const { message } = req
    if (message === 'This report has been deleted with success') {
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

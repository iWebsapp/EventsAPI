'use strict'

const express = require('express')
const chalk = require('chalk')
const { createReportFunction, createComentReportFunction, allReportsFunction, getReportFunction,
  verifyHeadersTokenFunction, handleError, handleFatalError } = require('../functions')
const app = express.Router()
// const guard = require('express-jwt-permissions')()

// route create report
app.post('/create', verifyHeadersTokenFunction, createReportFunction, (req, res, next) => {
  try {
    const { message } = req
    if (message === 'Create report success') {
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


// route create comment
app.post('/comment', verifyHeadersTokenFunction, createComentReportFunction, (req, res, next) => {
  try {
    const { message } = req
    if (message === 'Create comment success') {
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
app.get('/all', verifyHeadersTokenFunction, allReportsFunction, (req, res, next) => {
  try {
    const { message, data } = req
    if (message === 'List of all reports') {
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

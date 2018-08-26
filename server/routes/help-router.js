'use strict'

const express = require('express')
const { createHelpFunction, deleteHelpFunction, allHelpFunction, getHelpFunction, editHelpFunction,
  verifyHeadersTokenFunction, handleError, handleFatalError } = require('../functions')
const { idValid, addHelpValid } = require('../validations')
const app = express.Router()
// const guard = require('express-jwt-permissions')()

// route create user
app.post('/create', addHelpValid, createHelpFunction, (req, res, next) => {
  try {
    const { message } = req
    if (message === 'Create help success') {
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
app.get('/all', allHelpFunction, (req, res, next) => {
  try {
    const { message, data } = req
    if (message === 'List of all helps') {
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

// get all users
app.get('/:id', idValid, getHelpFunction, (req, res, next) => {
  try {
    const { message, data } = req
    if (message === 'This is a help') {
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
app.delete('/delete/:id', verifyHeadersTokenFunction, idValid, deleteHelpFunction, (req, res, next) => {
  try {
    const { message } = req
    if (message === 'This help has been deleted with success') {
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
app.post('/edit/:id', verifyHeadersTokenFunction, idValid, addHelpValid, editHelpFunction, (req, res, next) => {
  try {
    const { message } = req
    if (message === 'This help has been edited with success') {
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

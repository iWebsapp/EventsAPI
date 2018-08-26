'use strict'

const express = require('express')
const { profilePlacesFunction, profileInfoPlacesFunction,
  verifyHeadersTokenFunction, handleError, handleFatalError } = require('../functions')
const { idValid } = require('../validations')
const app = express.Router()
// const guard = require('express-jwt-permissions')()

app.get('/:id', verifyHeadersTokenFunction, idValid, profilePlacesFunction, (req, res, next) => {
  try {
    const { message, data } = req
    if (message === 'This menu belongs to this place') {
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

app.get('/info/:id', verifyHeadersTokenFunction, idValid, profileInfoPlacesFunction, (req, res, next) => {
  try {
    const { message, data } = req
    if (message === 'This information is from this place') {
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

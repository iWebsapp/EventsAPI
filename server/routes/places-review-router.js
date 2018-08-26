'use strict'

const express = require('express')
const chalk = require('chalk')
const { createReviewPlacesFunction, getAllReviewPlacesFunction,
        verifyHeadersTokenFunction, handleError, handleFatalError  } = require('../functions')
const { idValid, addReviewValid } = require('../validations')
const app = express.Router()
// const guard = require('express-jwt-permissions')()


app.post('/create/:id', verifyHeadersTokenFunction, idValid, addReviewValid, createReviewPlacesFunction, (req, res, next) => {
  try {
    const { message, data } = req
    if (message === 'Create review success') {
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

app.get('/all/:id', verifyHeadersTokenFunction, idValid, getAllReviewPlacesFunction, (req, res, next) => {
  try {
    const { message, data } = req
    if (message === 'Reviews list of this place') {
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

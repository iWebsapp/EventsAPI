'use strict'

const express = require('express')
const { createPlaceFunction, getAllPlacesFunction, getAllMyPlacesFunction, deleteMyPlacesFunction, editMyPlacesFunction,
  profilePlacesFunction, profileInfoPlacesFunction,
  verifyHeadersTokenFunction, handleError, handleFatalError } = require('../functions')
const { idValid, addPlacesValid } = require('../validations')
const app = express.Router()
// const guard = require('express-jwt-permissions')()

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

app.delete('/delete/:id', verifyHeadersTokenFunction, idValid, deleteMyPlacesFunction, (req, res, next) => {
  try {
    const { message } = req
    if (message === 'This places has been deleted') {
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

app.post('/edit/:id', verifyHeadersTokenFunction, idValid, addPlacesValid, editMyPlacesFunction, (req, res, next) => {
  try {
    const { message } = req
    if (message === 'This places has been edited') {
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

app.get('/profile/:id', verifyHeadersTokenFunction, idValid, profilePlacesFunction, (req, res, next) => {
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

app.get('/profile/info/:id', verifyHeadersTokenFunction, idValid, profileInfoPlacesFunction, (req, res, next) => {
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

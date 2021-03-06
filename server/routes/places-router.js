'use strict'

const express = require('express')
const chalk = require('chalk')
const { allPlacesFunction, allMyPlacesFunction, allItemsMenuPlacesFunction,
  getInfoPlacesFunction, getReviewsPlacesFunction, createReviewsPlacesFunction,
  allCouponsFunction, allPromotionsFunction, allProductsFunction, allGuaranteedFunction,
  allItemsGuaranteedFunction, createGuaranteedFunction, cancelGuaranteedFunction, getProductFunction,
  createMyCouponsFunction,
  verifyHeadersTokenFunction, handleError, handleFatalError  } = require('../functions')
  const { idValid, addReviewsValid, addGuaranteedValid, idPlacesValid } = require('../validations')
const app = express.Router()
// const guard = require('express-jwt-permissions')()

// route show all places
app.get('/all', verifyHeadersTokenFunction, allPlacesFunction, (req, res, next) => {
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


// route show all my places
app.get('/my/all', verifyHeadersTokenFunction, allMyPlacesFunction, (req, res, next) => {
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

// get menu of the places
app.get('/menu/:id', verifyHeadersTokenFunction, idValid, allItemsMenuPlacesFunction, (req, res, next) => {
  try {
    const { message, data } = req
    if (message === 'List the items menu places') {
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

// get show information
app.get('/info/:id', verifyHeadersTokenFunction, idValid, getInfoPlacesFunction, (req, res, next) => {
  try {
    const { message, data } = req
    if (message === 'List the places information') {
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

// route show all reviews
app.get('/reviews/:id', verifyHeadersTokenFunction, idValid, getReviewsPlacesFunction, (req, res, next) => {
  try {
    const { message, data } = req
    if (message === 'List the places reviews') {
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



// route new review
app.post('/review/create/:id', verifyHeadersTokenFunction, idValid, addReviewsValid, createReviewsPlacesFunction, (req, res, next) => {
  try {
    const { message } = req
    if (message === 'This review has been created with success') {
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



// route show all coupons
app.get('/coupons/all/:id', verifyHeadersTokenFunction, idValid, allCouponsFunction, (req, res, next) => {
  try {
    const { message, data } = req
    if (message === 'List the places coupons') {
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


// route show all coupons
app.post('/coupons/create/my/:id', verifyHeadersTokenFunction, idValid, createMyCouponsFunction, (req, res, next) => {
  try {
    const { message } = req
    if (message === 'Add my coupons with success') {
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


// route show all promotions
app.get('/promotions/all/:id', verifyHeadersTokenFunction, idValid, allPromotionsFunction, (req, res, next) => {
  try {
    const { message, data } = req
    if (message === 'List the places promotions') {
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


// route show all product
app.get('/products/all/:id', verifyHeadersTokenFunction, idValid, allProductsFunction, (req, res, next) => {
  try {
    const { message, data } = req
    if (message === 'List the places products') {
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


// route show guaranteed
app.get('/guaranteed/all/:id', verifyHeadersTokenFunction, idValid, allGuaranteedFunction, (req, res, next) => {
  try {
    const { message, data } = req
    if (message === 'List the guaranteed tables') {
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



// route show guaranteed items
app.get('/guaranteed/items/:id', verifyHeadersTokenFunction, idValid, allItemsGuaranteedFunction, (req, res, next) => {
  try {
    const { message, data } = req
    if (message === 'List the items guaranteed tables') {
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


// route new guaranteed
app.post('/guaranteed/create/:id', verifyHeadersTokenFunction, idValid, addGuaranteedValid, createGuaranteedFunction, (req, res, next) => {
  try {
    const { message } = req
    if (message === 'This guaranteed has been created with success') {
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


// route cancel guaranteed
app.get('/guaranteed/cancel/:id', verifyHeadersTokenFunction, idValid, cancelGuaranteedFunction, (req, res, next) => {
  try {
    const { message } = req
    if (message === 'This guaranteed has been canceled with success') {
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



  // route show one product
  app.get('/product/:idPlace/:id', verifyHeadersTokenFunction, idValid, idPlacesValid, getProductFunction, (req, res, next) => {
    try {
      const { message, data } = req
      if (message === 'This is a product') {
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

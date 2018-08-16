'use strict'

const Debug = require('debug')
const config = require('../config')
const privacyModel = require('../models/privacy-model')
const { verifyToken } = require('./')
const debug = new Debug(`${config.settings.name}:functions:privacy`)


export const createPrivacyFunction = (req, res, next) => {
    const token = req.token
    const verify = verifyToken(token)
    if (verify === 'Correct verification'){
        const { content } = req.body
        const newAbout = {
          content
        }
        privacyModel['privacy'] = newAbout
        req.status = 200
        req.message = 'Create privacy success'
        next()
    } else {
      res.status(401).json({ status: 401, message: 'This token is invalid' })
    }
}

export const allPrivacyFunction = (req, res, next) => {
    req.message = 'List of all privacy'
    req.data = privacyModel['privacy']
    next()
}

export const deletePrivacyFunction = (req, res, next) => {
  const token = req.token
  const verify = verifyToken(token)
  if (verify === 'Correct verification'){
      privacyModel['privacy'] = []
      req.status = 200
      req.message = 'This privacy has been deleted with success'
      next()
  } else {
      res.status(401).json({ status: 401, message: 'This token is invalid' })
  }
}

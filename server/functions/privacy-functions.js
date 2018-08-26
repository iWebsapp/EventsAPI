'use strict'

// const Debug = require('debug')
// const config = require('../config')
const Privacy = require('../models/privacy-model')
const { verifyToken } = require('./')
// const debug = new Debug(`${config.settings.name}:functions:privacy`)

export const createPrivacyFunction = async (req, res, next) => {
  const token = req.token
  const verify = verifyToken(token)
  if (verify === 'Correct verification') {
    const { content } = req.body
    const newPrivacy = new Privacy({
      content
    })
    await Privacy.remove()
    await newPrivacy.save()
    req.status = 200
    req.message = 'Create privacy success'
    next()
  } else {
    res.status(401).json({ status: 401, message: 'This token is invalid' })
  }
}

export const allPrivacyFunction = async (req, res, next) => {
  req.message = 'List of all privacy'
  const privacy = await Privacy.find()
  req.data = privacy
  next()
}

export const deletePrivacyFunction = async (req, res, next) => {
  const token = req.token
  const verify = verifyToken(token)
  if (verify === 'Correct verification') {
    await Privacy.remove()
    req.status = 200
    req.message = 'This privacy has been deleted with success'
    next()
  } else {
    res.status(401).json({ status: 401, message: 'This token is invalid' })
  }
}

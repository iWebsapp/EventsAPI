'use strict'

// const Debug = require('debug')
// const config = require('../config')
const Abouts = require('../models/abouts-model')
const { verifyToken } = require('./')
// const debug = new Debug(`${config.settings.name}:functions:abouts`)

export const createAboutsFunction = async (req, res, next) => {
  const token = req.token
  const verify = verifyToken(token)
  if (verify === 'Correct verification') {
    const { content } = req.body
    const newAbout = new Abouts({
      content
    })
    await Abouts.remove()
    await newAbout.save()
    req.status = 200
    req.message = 'Create about success'
    next()
  } else {
    res.status(401).json({ status: 401, message: 'This token is invalid' })
  }
}

export const allAboutsFunction = async (req, res, next) => {
  req.message = 'List of all abouts'
  const about = await Abouts.find()
  req.data = about
  next()
}

export const deleteAboutsFunction = async (req, res, next) => {
  const token = req.token
  const verify = verifyToken(token)
  if (verify === 'Correct verification') {
    await Abouts.remove()
    req.status = 200
    req.message = 'This about has been deleted with success'
    next()
  } else {
    res.status(401).json({ status: 401, message: 'This token is invalid' })
  }
}

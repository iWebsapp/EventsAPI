'use strict'

const Debug = require('debug')
const config = require('../config')
const aboutsModel = require('../models/abouts-model')
const { verifyToken } = require('./')
const debug = new Debug(`${config.settings.name}:functions:abouts`)


export const createAboutsFunction = (req, res, next) => {
    const token = req.token
    const verify = verifyToken(token)
    if (verify === 'Correct verification'){
        const { content } = req.body
        const newAbout = {
          content
        }
        aboutsModel['abouts'] = newAbout
        req.status = 200
        req.message = 'Create about success'
        next()
    } else {
      res.status(401).json({ status: 401, message: 'This token is invalid' })
    }
}

export const allAboutsFunction = (req, res, next) => {
    req.message = 'List of all abouts'
    req.data = aboutsModel['abouts']
    next()
}

export const deleteAboutsFunction = (req, res, next) => {
  const token = req.token
  const verify = verifyToken(token)
  if (verify === 'Correct verification'){
      aboutsModel['abouts'] = []
      req.status = 200
      req.message = 'This about has been deleted with success'
      next()
  } else {
      res.status(401).json({ status: 401, message: 'This token is invalid' })
  }
}

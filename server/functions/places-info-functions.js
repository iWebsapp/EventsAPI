'use strict'

const Debug = require('debug')
const config = require('../config')
const InfoPlaces = require('../models/infoplaces-model')
const MenuPlaces = require('../models/menuPlaces-model')
const { verifyToken, meetInfoToken } = require('./')
const debug = new Debug(`${config.settings.name}:functions:places`)
const fs = require('fs')

export const profilePlacesFunction = async (req, res, next) => {
    const token = req.token
    const verify = verifyToken(token)
    if (verify === 'Correct verification'){
      const id = req.params.id
      const data = await MenuPlaces.find({ _place:id })
      req.data = data
      req.message = 'This menu belongs to this place'
      next()
    } else {
        res.status(401).json({ status: 401, message: 'This token is invalid' })
    }
}

export const profileInfoPlacesFunction = async (req, res, next) => {
    const token = req.token
    const verify = verifyToken(token)
    if (verify === 'Correct verification'){
      const id = req.params.id
      //populate
      const data = await InfoPlaces.find({ _place:id })
      req.data = data
      req.message = 'This information is from this place'
      next()
    } else {
        res.status(401).json({ status: 401, message: 'This token is invalid' })
    }
}

'use strict'

const Debug = require('debug')
const config = require('../config')
const debug = new Debug(`${config.settings.name}:functions:reports`)
const placesModel = require('../models/places-model')
const couponsModel = require('../models/coupons-model')
const infoModel = require('../models/info-model')
const promotionsModel = require('../models/promotions-model')
const reviewsModel = require('../models/reviews-model')
const guaranteedModel = require('../models/guaranteed-model')
const itemsPlacesMenuModel = require('../models/itemPlacesMenu-model')
const { verifyToken, meetInfoToken } = require('./')

export const allPlacesFunction = (req, res, next) => {
  const token = req.token
  const verify = verifyToken(token)
  if (verify === 'Correct verification') {
    req.message = 'List of all places'
    req.data = placesModel["places"]
    next()
  } else {
    res.status(401).json({ status: 401, message: 'This token is invalid' })
  }
}

export const allMyPlacesFunction = (req, res, next) => {
  const token = req.token
  const verify = verifyToken(token)
  let arrayPlaces = []
  if (verify === 'Correct verification') {
    const idU = meetInfoToken(token)
    for (var i = 0; i < placesModel['places'].length; i++) {
      if (placesModel['places'][i].idUser === idU.idUser) {
        arrayPlaces.push(placesModel['places'][i])
      }
    }
    req.message = 'List of all my places'
    req.data = arrayPlaces
    next()
  } else {
    res.status(401).json({ status: 401, message: 'This token is invalid' })
  }
}


export const allItemsMenuPlacesFunction = (req, res, next) => {
  const token = req.token
  const verify = verifyToken(token)
  const idU = req.params.id
  if (verify === 'Correct verification') {
    let itemPlaces = []
    for (var i = 0; i < itemsPlacesMenuModel['placesMenu'].length; i++) {
      if (itemsPlacesMenuModel['placesMenu'][i].idPlaces == idU) {
        itemPlaces.push(itemsPlacesMenuModel['placesMenu'][i].items)
      }
    }
    req.message = 'List the items menu places'
    req.data = itemPlaces
    next()
  } else {
     res.status(401).json({ status: 401, message: 'This token is invalid' })
  }
}

'use strict'

const Debug = require('debug')
const config = require('../config')
const debug = new Debug(`${config.settings.name}:functions:reports`)
const usersModel = require('../models/users-model')
const placesModel = require('../models/places-model')
const couponsModel = require('../models/coupons-model')
const infoModel = require('../models/info-model')
const promotionsModel = require('../models/promotions-model')
const reviewsModel = require('../models/reviews-model')
const guaranteedModel = require('../models/guaranteed-model')
const itemsPlacesMenuModel = require('../models/itemPlacesMenu-model')
const { verifyToken, meetInfoToken, findUserByEmail } = require('./')
const async = require('async')
const fs = require('fs')


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



export const getInfoPlacesFunction = (req, res, next) => {
  const token = req.token
  const verify = verifyToken(token)
  const idU = req.params.id
  if (verify === 'Correct verification') {
    let itemInfo = []
    for (var i = 0; i < infoModel["info"].length; i++) {
       if (infoModel["info"][i].idPlaces == idU) {
          itemInfo.push(infoModel["info"][i])
       }
    }
    req.message = 'List the places information'
    req.data = itemInfo
    next()
  } else {
     res.status(401).json({ status: 401, message: 'This token is invalid' })
  }
}


function joinUserFromReviews (reviews){
    let itemFinal = []
    for (var i = 0; i < reviews.length; i++) {
        for (var j = 0; j < usersModel['users'].length; j++) {
            let idUser = usersModel['users'][j].idUser
            if( idUser == reviews[i].idUser ){
                const itemId = usersModel['users'][i].idUser
                const itemName = usersModel['users'][i].name
                const itemLastname = usersModel['users'][i].lastname
                const itemAvatar = usersModel['users'][i].avatar

                const reviewCreatedAt = reviews[i].createdAt
                const reviewMessage = reviews[i].message
                const reviewPicture = reviews[i].picture

                itemFinal.push({
                  idUser: itemId,
                  name: itemName,
                  lastname: itemLastname,
                  avatar: itemAvatar,
                  message: reviewMessage,
                  picture: reviewPicture,
                  createdAt: reviewCreatedAt
                })

            }
        }
    }

    return itemFinal
}


export const getReviewsPlacesFunction = (req, res, next) => {
  const token = req.token
  const verify = verifyToken(token)
  const idU = req.params.id
  if (verify === 'Correct verification') {
    let itemReviews = []
    for (var i = 0; i < reviewsModel["reviews"].length; i++) {
        if (reviewsModel["reviews"][i].idPlaces == idU) {
           itemReviews.push(reviewsModel["reviews"][i])
        }
    }

    const data = [{
      idPlaces: itemReviews[0].idPlaces,
      reviews: joinUserFromReviews(itemReviews[0].reviews)
    }]

    req.message = 'List the places reviews'
    req.data = data
    next()
  } else {
     res.status(401).json({ status: 401, message: 'This token is invalid' })
  }
}


export const createReviewsPlacesFunction = async (req, res, next) => {
  const token = req.token
  const verify = verifyToken(token)
  const idPlaces = req.params.id
  if (verify === 'Correct verification') {
    const review = req.body
    const idU = meetInfoToken(token)
    review.idPlaces = idPlaces
    review.idUser =  idU.idUser
    review.createdAt = +new Date()

    if(req.files.picture !== undefined){
      const imgName = +new Date()
      const extensionImage = req.files.picture.name.split(".").pop()
      const updoadFile = await fs.rename(req.files.picture.path, 'server/images/'+ imgName +'.'+extensionImage)
      const namePicture = imgName + '.' + extensionImage
      review.picture = namePicture
    }

    const allReviews = reviewsModel['reviews']

    for (var i = 0; i < allReviews.length; i++) {
        if (allReviews[i].idPlaces == idPlaces) {
            allReviews[i]["reviews"].push(review)
        }
    }

    req.message = 'This review has been created with success'
    next()
  } else {
     res.status(401).json({ status: 401, message: 'This token is invalid' })
  }
}



export const allCouponsFunction = async (req, res, next) => {
  const token = req.token
  const verify = verifyToken(token)
  if (verify === 'Correct verification') {
    let data = []
    const idPlaces = req.params.id
    for(var i = 0; i < couponsModel["coupons"].length; i ++){
      if(couponsModel["coupons"][i].idPlaces == idPlaces){
        data.push(couponsModel["coupons"][i])
      }
    }
    req.message = 'List the places coupons'
    req.data = await data
    next()
  } else {
    res.status(401).json({ status: 401, message: 'This token is invalid' })
  }
}



export const allPromotionsFunction = async (req, res, next) => {
  const token = req.token
  const verify = verifyToken(token)
  if (verify === 'Correct verification') {
    let data = []
    const idPlaces = req.params.id
    for(var i = 0; i < promotionsModel["promotions"].length; i ++){
      if(promotionsModel["promotions"][i].idPlaces == idPlaces){
        data.push(promotionsModel["promotions"][i])
      }
    }
    req.message = 'List the places promotions'
    req.data = await data
    next()
  } else {
    res.status(401).json({ status: 401, message: 'This token is invalid' })
  }
}

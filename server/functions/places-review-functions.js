'use strict'

// const Debug = require('debug')
// const config = require('../config')
const ReviewPlaces = require('../models/reviews-model')
const { verifyToken, meetInfoToken } = require('./')
// const debug = new Debug(`${config.settings.name}:functions:places:review`)
const fs = require('fs')

export const createReviewPlacesFunction = async (req, res, next) => {
  const token = req.token
  const verify = verifyToken(token)
  if (verify === 'Correct verification') {
    const idU = meetInfoToken(token)
    const idPlace = req.params.id
    const { message } = req.body
    var namePicture = ''

    if (req.files.picture) {
      const imgName = +new Date() + '_review'
      const extensionImage = req.files.picture.name.split('.').pop()
      await fs.rename(req.files.picture.path, 'server/images/' + imgName + '.' + extensionImage)
      namePicture = imgName + '.' + extensionImage
    }

    const review = ReviewPlaces({
      _place: idPlace,
      _user: idU._id,
      message,
      picture: namePicture || undefined
    })

    await review.save()
    req.message = 'Create review success'
    next()
  } else {
    res.status(401).json({ status: 401, message: 'This token is invalid' })
  }
}

export const getAllReviewPlacesFunction = async (req, res, next) => {
  const token = req.token
  const verify = verifyToken(token)
  if (verify === 'Correct verification') {
    const id = req.params.id
    const data = await ReviewPlaces.find({ _place: id }, { message: true, createdAt: true }).populate('_user', { avatar: true, name: true, lastname: true })
    req.data = data
    req.message = 'Reviews list of this place'
    next()
  } else {
    res.status(401).json({ status: 401, message: 'This token is invalid' })
  }
}

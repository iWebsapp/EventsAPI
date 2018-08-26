'use strict'

// const Debug = require('debug')
// const config = require('../config')
// const debug = new Debug(`${config.settings.name}:places:valid`)

// THIS FUNCTION IS THE ONE IN CHARGE THE VAILDATE NEW USER
export const addReviewValid = (req, res, next) => {
  const validater = []

  if (!req.body.message) {
    const v = { fields: 'name', message: 'The name is required' }
    validater.push(v)
  } else {
    if (req.body.message.length < 5) {
      const v = { fields: 'name', message: 'The name must have more than 5 characters' }
      validater.push(v)
    }
  }

  if (req.files.picture) {
    if (req.files.picture.type !== 'image/jpeg') {
      if (req.files.picture.type !== 'image/png') {
        const v = { fields: 'picture', message: 'The picture ( png, jpeg )' }
        validater.push(v)
      }
    }
  }

  if (validater.length === 0) {
    next()
  } else {
    return res.status(400).json(validater)
  }
}

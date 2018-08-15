'use strict'

const Debug = require('debug')
const config = require('../config')
const debug = new Debug(`${config.settings.name}:about:valid`)

// THIS FUNCTION IS THE ONE IN CHARGE THE VAILDATE NEW USER
export const addAboutValid = (req, res, next) => {
  const validater = []
  
  if (!req.body.content) {
    const v = { fields: 'content', message: 'The content is required' }
    validater.push(v)
  } else {
    if (req.body.content.length < 8) {
      const v = { fields: 'content', message: 'The content must have more than 8 characters' }
      validater.push(v)
    }
  }

  if (validater.length === 0) {
    next()
  } else {
    return res.status(400).json(validater)
  }
}

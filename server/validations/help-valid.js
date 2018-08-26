'use strict'

// const Debug = require('debug')
// const config = require('../config')
// const debug = new Debug(`${config.settings.name}:report:valid`)

// THIS FUNCTION IS THE ONE IN CHARGE THE VAILDATE NEW USER
export const addHelpValid = (req, res, next) => {
  const validater = []

  if (!req.body.cuestion) {
    const v = { fields: 'cuestion', message: 'The cuestion is required' }
    validater.push(v)
  } else {
    if (req.body.cuestion.length < 5) {
      const v = { fields: 'cuestion', message: 'The cuestion must have more than 5 characters' }
      validater.push(v)
    }
  }

  if (!req.body.answer) {
    const v = { fields: 'answer', message: 'The answer is required' }
    validater.push(v)
  } else {
    if (req.body.answer.length < 5) {
      const v = { fields: 'answer', message: 'The answer must have more than 5 characters' }
      validater.push(v)
    }
  }

  if (validater.length === 0) {
    next()
  } else {
    return res.status(400).json(validater)
  }
}

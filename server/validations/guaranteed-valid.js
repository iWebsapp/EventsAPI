'use strict'

// const Debug = require('debug')
// const config = require('../config')
// const debug = new Debug(`${config.settings.name}:about:valid`)

// THIS FUNCTION IS THE ONE IN CHARGE THE VAILDATE NEW USER
export const addGuaranteedValid = (req, res, next) => {
  const validater = []

  if (!req.body.numberOfPeople) {
    const v = { fields: 'numberOfPeople', message: 'The numberOfPeople is required' }
    validater.push(v)
  } else {
    if (isNaN(req.body.numberOfPeople)) {
      const v = { fields: 'numberOfPeople', message: 'The numberOfPeople is not a number' }
      validater.push(v)
    }
  }

  if (!req.body.characteristics) {
    const v = { fields: 'characteristics', message: 'The characteristics is required' }
    validater.push(v)
  } else {
    let conta = 0
    const characteristicsArray = req.body.characteristics.split(',')

    for (var i = 0; i < characteristicsArray.length; i++) {
      if (characteristicsArray[i] === 'smokers') {
        conta++
      }
      if (characteristicsArray[i] === 'bar') {
        conta++
      }
      if (characteristicsArray[i] === 'table') {
        conta++
      }
      if (characteristicsArray[i] === 'nearWindow') {
        conta++
      }
      if (characteristicsArray[i] === 'nearKitchen') {
        conta++
      }
      if (characteristicsArray[i] === 'nearExit') {
        conta++
      }
    }

    if (conta === 0) {
      const v = { fields: 'characteristics', message: 'The characteristics should be ( smokers,bar,table,nearWindow,nearKitchen,nearExit )' }
      validater.push(v)
    }
  }

  if (validater.length === 0) {
    next()
  } else {
    return res.status(400).json(validater)
  }
}

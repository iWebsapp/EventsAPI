'use strict'

const Debug = require('debug')
const config = require('../config')
const debug = new Debug(`${config.settings.name}:report:valid`)


// THIS FUNCTION IS THE ONE IN CHARGE THE VAILDATE NEW USER
export const addReportValid = (req, res, next) => {
  const validater = []

  if (req.files.screenshot) {
    if (req.files.screenshot.type !== 'image/jpeg') {
      if (req.files.screenshot.type !== 'image/png') {
        const v = { fields: 'screenshot', message: 'The screenshot ( png, jpeg )' }
        validater.push(v)
      }
    }
  }

  if (!req.body.report) {
    const v = { fields: 'report', message: 'The report is required' }
    validater.push(v)
  } else {
    if (req.body.report.length < 5) {
      const v = { fields: 'report', message: 'The report must have more than 5 characters' }
      validater.push(v)
    }
  }

  if (validater.length === 0) {
    next()
  } else {
    return res.status(400).json(validater)
  }
}

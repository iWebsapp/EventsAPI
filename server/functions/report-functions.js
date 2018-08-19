'use strict'

const Debug = require('debug')
const config = require('../config')
const Reports = require('../models/report-model')
const { verifyToken, meetInfoToken } = require('./')
const debug = new Debug(`${config.settings.name}:functions:reports`)
const fs = require('fs')

export const createReportFunction = async (req, res, next) => {
  const token = req.token
  const verify = verifyToken(token)
  if (verify === 'Correct verification') {
    const report = req.body
    const idU = meetInfoToken(token)

    if(req.files.screenshot !== undefined){

        const imgName = +new Date() + '_report'
        const extensionImage = req.files.screenshot.name.split(".").pop()
        const updoadFile = await fs.rename(req.files.screenshot.path, 'server/images/'+ imgName +'.'+extensionImage)
        const namePicture = imgName + '.' + extensionImage
        const data = new Reports({
          report: report.report,
          type: "report",
          screenshot: namePicture,
          user: idU._id
        })
        await data.save()
        req.status = 200
        req.message = 'Create report success'
        next()

    } else {
        const data = new Reports({
          report: report.report,
          type: "report",
          user: idU._id
        })
        await data.save()
        req.status = 200
        req.message = 'Create report success'
        next()
    }


  } else {
    res.status(401).json({ status: 401, message: 'This token is invalid' })
  }
}


export const createComentReportFunction = async (req, res, next) => {
  const token = req.token
  const verify = verifyToken(token)
  if (verify === 'Correct verification') {
      const report = req.body
      const idU = meetInfoToken(token)

      const data = new Reports({
        report: report.report,
        type: "report comment",
        user: idU._id,
      })

      await data.save()
      req.status = 200
      req.message = 'Create comment success'
      next()
  } else {
    res.status(401).json({ status: 401, message: 'This token is invalid' })
  }
}


export const allReportsFunction = async (req, res, next) => {
  const token = req.token
  const verify = verifyToken(token)
  if (verify === 'Correct verification') {
    const data = await Reports.find().populate('user')
    req.status = 200
    req.message = 'List of all reports'
    req.data = data
    next()
  } else {
    res.status(401).json({ status: 401, message: 'This token is invalid' })
  }
}

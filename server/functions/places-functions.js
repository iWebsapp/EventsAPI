'use strict'

const Debug = require('debug')
const config = require('../config')
const reportsModel = require('../models/reports-model')
const { verifyToken } = require('./')
const debug = new Debug(`${config.settings.name}:functions:reports`)


export const createReportsFunction = (req, res, next) => {
    const report = req.body
    const newReport = {
      idReport: +new Date(),
      open: false,
      cuestion: report.cuestion,
      answer: [report.answer],
      state: 0,
      createdAt: new Date()
    }
    reportsModel.reports.push(newReport)
    req.status = 200
    req.message = 'Create report success'
    next()
}

export const deleteReportsFunction = (req, res, next) => {
  const token = req.token
  const verify = verifyToken(token)
  const idU = req.params.id
  if (verify === 'Correct verification'){
      for (var i = 0; i < reportsModel.reports.length; i++) {
          if (reportsModel.reports[i].idReport == idU) {
              reportsModel.reports.splice(i, 1)
          }
      }
      req.status = 200
      req.message = 'This report has been deleted with success'
      next()
  } else {
      res.status(401).json({ status: 401, message: 'This token is invalid' })
  }
}

export const getReportFunction = (req, res, next) => {
  const idU = req.params.id
  let arrayUser = []
  for (var i = 0; i < reportsModel.reports.length; i++) {
    if (reportsModel.reports[i].idReport == idU) {
      arrayUser.push(reportsModel.reports[i])
    }
  }
  req.message = 'This is a report'
  req.data = arrayUser
  next()
}

export const allReportsFunction = (req, res, next) => {
    req.message = 'List of all reports'
    req.data = reportsModel["reports"]
    next()
}

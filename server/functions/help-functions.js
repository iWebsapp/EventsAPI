'use strict'

// const Debug = require('debug')
// const config = require('../config')
const Helps = require('../models/helps-model')
const { verifyToken } = require('./')
// const debug = new Debug(`${config.settings.name}:functions:reports`)

export const createHelpFunction = async (req, res, next) => {
  const help = req.body
  const r = await Helps.findOne({ cuestion: help.cuestion })
  if (r === undefined) {
    const newReport = new Helps({
      cuestion: help.cuestion,
      answer: [help.answer]
    })

    await newReport.save()
    req.status = 200
    req.message = 'Create help success'
    next()
  } else {
    res.status(202).json({ status: 202, message: 'This help already exist' })
  }
}

export const deleteHelpFunction = async (req, res, next) => {
  const token = req.token
  const verify = verifyToken(token)
  const idU = req.params.id
  if (verify === 'Correct verification') {
    await Helps.remove({ _id: idU })
    req.status = 200
    req.message = 'This help has been deleted with success'
    next()
  } else {
    res.status(401).json({ status: 401, message: 'This token is invalid' })
  }
}

export const getHelpFunction = async (req, res, next) => {
  const idU = req.params.id
  const data = await Helps.find({ _id: idU })
  req.message = 'This is a help'
  req.data = data
  next()
}

export const allHelpFunction = async (req, res, next) => {
  req.message = 'List of all helps'
  const data = await Helps.find()
  req.data = data
  next()
}

export const editHelpFunction = async (req, res, next) => {
  const token = req.token
  const verify = verifyToken(token)
  const idU = req.params.id
  if (verify === 'Correct verification') {
    const help = await Helps.findOne({ _id: idU })
    help.cuestion = help.cuestion
    help.answer = [ help.answer ]
    await help.save()
    req.status = 200
    req.message = 'This help has been edited with success'
    next()
  } else {
    res.status(401).json({ status: 401, message: 'This token is invalid' })
  }
}

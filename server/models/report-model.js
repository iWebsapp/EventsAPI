'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = Schema.Types

const ReportSchema = Schema({
  report: { type: String, required: true },
  state: { type: String, default: 0, required: true },
  type: { type: String, required: true },
  screenshot: { type: String },
  createdAt: { type: String, default: Date.now, required: true },
  _user: { type: ObjectId, ref: 'users', required: true }
})

module.exports = mongoose.model('reports', ReportSchema)

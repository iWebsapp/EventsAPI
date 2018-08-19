'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PrivacySchema = Schema({
  content: { type: String, required: true},
  createdAt: { type: String, default: Date.now, required: true }
})

module.exports = mongoose.model('privacys', PrivacySchema)

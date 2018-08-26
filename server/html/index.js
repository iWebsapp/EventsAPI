'use strict'

const path = require('path')
const express = require('express')
const docs = express.Router()
const config = require('../config')
const url = config.settings.url + '/api/v1/'
// MAIN DOCS
docs.get('/', function (req, res) {
  res.render(path.join(__dirname, '/docs/inicio.ejs'), { selected: req.url, url: url + 'api/users' })
})

// ACTIVATE USER
docs.get('/activate/user', function (req, res) {
  res.render(path.join(__dirname, '/docs/email.ejs'), { selected: req.url })
})

// SETTINGS DOCS
docs.get('/settings', function (req, res) {
  res.render(path.join(__dirname, '/docs/config.ejs'), { selected: req.url })
})

// ABOUT DOCS
docs.get('/about', function (req, res) {
  res.render(path.join(__dirname, '/docs/about.ejs'), { selected: req.url })
})

// REPORT PROBLEMS DOCS
docs.get('/report-problem', function (req, res) {
  res.render(path.join(__dirname, '/docs/report-problem.ejs'), { selected: req.url })
})

// REPORT PROBLEMS DOCS
docs.get('/help-service', function (req, res) {
  res.render(path.join(__dirname, '/docs/help-service.ejs'), { selected: req.url })
})

// PRIVACITY PROBLEMS DOCS
docs.get('/privacity', function (req, res) {
  res.render(path.join(__dirname, '/docs/privacity.ejs'), { selected: req.url })
})

module.exports = docs

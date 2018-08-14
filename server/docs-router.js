'use strict'

const express = require('express')
const docs = express.Router()

// docs.get('/*', function(req, res){
//   res.render(__dirname + '/html/docs/notfound.ejs')
// })

// MAIN DOCS
docs.get('/', function(req, res){
  res.render(__dirname + '/html/docs/inicio.ejs')
})

//ACTIVATE USER
docs.get('/activate/user', function(req, res){
  res.render(__dirname + '/html/docs/email.ejs')
})

// SETTINGS DOCS
docs.get('/settings', function(req, res){
  res.render(__dirname + '/html/docs/config.ejs')
})

// ABOUT DOCS
docs.get('/about', function(req, res){
  res.render(__dirname + '/html/docs/about.ejs')
})

// REPORT PROBLEMS DOCS
docs.get('/report-problem', function(req, res){
  res.render(__dirname + '/html/docs/report-problem.ejs')
})

// REPORT PROBLEMS DOCS
docs.get('/help-service', function(req, res){
  res.render(__dirname + '/html/docs/help-service.ejs')
})

// PRIVACITY PROBLEMS DOCS
docs.get('/privacity', function(req, res){
  res.render(__dirname + '/html/docs/privacity.ejs')
})

module.exports = docs

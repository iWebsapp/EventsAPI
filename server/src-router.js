'use strict'

const express = require('express')
const src = express.Router()

// IMAGENES ROUTES
src.get('/:pictures', function (req, res) {
  res.sendFile(__dirname + '/images/' + req.params.pictures)
})

// RESOURCES ROUTES
src.get('/:type/:name', function (req, res) {
  res.sendFile(__dirname + '/html/src/' + req.params.type + '/' + req.params.name)
})

module.exports = src

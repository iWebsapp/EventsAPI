'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = Schema.Types

const PlacesSchema = Schema({
  _user: { type:ObjectId, ref: 'users', required: true },
  name: { type: String, required: true },
  picture: { type: String, default: 'default__place.png',required: true },
  state: { type: Number, default:1, required: true },
  createdAt: { type: String, default: Date.now, required: true }
})

module.exports = mongoose.model('places', PlacesSchema)

// export const places = [{
//   idPlaces: 1,
//   idUser: 1,
//   name: 'nombre del negocio',
//   picture: '1.jpg',
//   state: 0,
//   createdAt: new Date()
// },{
//   idPlaces: 2,
//   idUser: 1,
//   name: 'nombre del negocio',
//   picture: '2.jpg',
//   state: 0,
//   createdAt: new Date()
// },{
//   idPlaces: 3,
//   idUser: 2,
//   name: 'nombre del negocio',
//   picture: '3.jpg',
//   state: 0,
//   createdAt: new Date()
// },{
//   idPlaces: 4,
//   idUser: 2,
//   name: 'nombre del negocio',
//   picture: '4.jpg',
//   state: 0,
//   createdAt: new Date()
// }]

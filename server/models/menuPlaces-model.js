'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = Schema.Types

const itemsSchema = Schema({
  icon: { type: String, required: true },
  title: { type: String, required: true }
})

const menuPlaceSchema = Schema({
  _place: { type:ObjectId, ref: 'places', required: true },
  items: [ itemsSchema ]
})

module.exports = mongoose.model('menuPlaces', menuPlaceSchema)

// export const placesMenu = [{
//   idPlaces: 4,
  // items: [{
  //   icon: "icon-info",
  //   title: "Información"
  // },{
  //   icon: "icon-comments",
  //   title: "Comentarios"
  // },{
  //   icon: "icon-coupons",
  //   title: "Cupones"
  // },{
  //   icon: "icon-promotions",
  //   title: "Promociones"
  // },{
  //   icon: "icon-products",
  //   title: "Productos"
  // },{
  //   icon: "icon-table-food",
  //   title: "Mesa garantizada"
  // }]
// }]

'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = Schema.Types

const schedulesSchema = Schema({
    monday: { type: String },
    tuesday: { type: String },
    wednesday: { type: String },
    thursday: { type: String },
    friday: { type: String },
    saturday: { type: String },
    sunday: { type: String }
})

const contactSchema = Schema({
    phone: { type: String },
    cellphone: { type: String },
    email: { type: String },
    website: { type: String }
})

const socialSchema = Schema({
  facebook: { type: String },
  twitter: { type: String },
  instagram: { type: String },
})

const PlacesInfoSchema = Schema({
  _place: { type:ObjectId, ref: 'places', required: true },
  social: [ socialSchema ],
  contact: [ contactSchema ],
  schedules: [ schedulesSchema ],
  services: [{ type: String, required: true }],
  description: { type: String, required: true },
  address: { type: String, default: Date.now, required: true }
})

module.exports = mongoose.model('placesinfo', PlacesInfoSchema)

// export const info = [{
  // idPlaces: 1,
  // schedules: [{
  //   monday: "6 am - 8 pm",
  //   tuesday: "6 am - 8 pm",
  //   wednesday: "6 am - 8 pm",
  //   thursday: "6 am - 8 pm",
  //   friday: "6 am - 8 pm",
  //   saturday: "6 am - 8 pm",
  //   sunday: "6 am - 8 pm"
  // }],
  // contact: [{
  //   phone: "26 - 08 - 35 - 95",
  //   cellphone: "(044) 55 - 19 - 68 - 45 - 17",
  //   email: "demo@mail.com"
  // }],
  // social: [{
  //   facebook: "https://facebook.com",
  //   twitter: "https://twitter.com",
  //   instagram: "https://instagram.com"
  // }],
  // services: {
  //   "icon-info",
  //   "Información"
  // },
  // description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident',
  // address: "addrress"
// },{
//   idPlaces: 2,
//   schedules: [{
//     monday: "6 am - 8 pm",
//     tuesday: "6 am - 8 pm",
//     wednesday: "6 am - 8 pm",
//     thursday: "6 am - 8 pm",
//     friday: "6 am - 8 pm",
//     saturday: "6 am - 8 pm",
//     sunday: "6 am - 8 pm"
//   }],
//   contact: [{
//     phone: "26 - 08 - 35 - 95",
//     cellphone: "(044) 55 - 19 - 68 - 45 - 17",
//     email: "demo@mail.com"
//   }],
//   social: [{
//     facebook: "https://facebook.com",
//     twitter: "https://twitter.com",
//     instagram: "https://instagram.com"
//   }],
//   description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//   address: "addrress"
// },{
//   idPlaces: 3,
//   schedules: [{
//     monday: "6 am - 8 pm",
//     tuesday: "6 am - 8 pm",
//     wednesday: "6 am - 8 pm",
//     thursday: "6 am - 8 pm",
//     friday: "6 am - 8 pm",
//     saturday: "6 am - 8 pm",
//     sunday: "6 am - 8 pm"
//   }],
//   contact: [{
//     phone: "26 - 08 - 35 - 95",
//     cellphone: "(044) 55 - 19 - 68 - 45 - 17",
//     email: "demo@mail.com"
//   }],
//   social: [{
//     facebook: "https://facebook.com",
//     twitter: "https://twitter.com",
//     instagram: "https://instagram.com"
//   }],
//   description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//   address: "addrress"
// },{
//   idPlaces: 4,
//   schedules: [{
//     monday: "6 am - 8 pm",
//     tuesday: "6 am - 8 pm",
//     wednesday: "6 am - 8 pm",
//     thursday: "6 am - 8 pm",
//     friday: "6 am - 8 pm",
//     saturday: "6 am - 8 pm",
//     sunday: "6 am - 8 pm"
//   }],
//   contact: [{
//     phone: "26 - 08 - 35 - 95",
//     cellphone: "(044) 55 - 19 - 68 - 45 - 17",
//     email: "demo@mail.com"
//   }],
//   social: [{
//     facebook: "https://facebook.com",
//     twitter: "https://twitter.com",
//     instagram: "https://instagram.com"
//   }],
//   description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//   address: "addrress"
// }]

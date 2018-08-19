'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')

const UserSchema = Schema({
  avatar: { type: String, default: 'default.png', required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String },
  lastname: { type: String },
  birthday: { type: String },
  state: { type: String, default: -1, required: true },
  permissions: [ { type: String, required: true } ],
  createdAt: { type: String, default: Date.now, required: true }
})

UserSchema.plugin(uniqueValidator)
module.exports = mongoose.model('users', UserSchema)

// export const users = [{
//   idUser: 1,
//   avatar: '1.jpg',
//   email: 'luis@mail.com',
//   password: 'jimyluis',
//   name: 'Luis Manuel',
//   lastname: 'Castillo Zamorano',
//   birthday: '19/10/1993',
//   permissions: {
//     normal: false,
//     premium: false,
//     admin: [{
//         info: 'admin',
//         reviews: 'admin',
//         coupons: 'admin',
//         promotions: 'admin',
//         products: 'admin',
//         table: 'admin'
//     }]
//   },
//   state: 0,
//   createdAt: new Date()
// }, {
//   idUser: 2,
//   avatar: '2.jpg',
//   email: 'jim@mail.com',
//   password: 'jimyluis',
//   name: 'Ana Mireya',
//   lastname: 'Jimenez Perez',
//   birthday: '27/01/1997',
//   permissions: {
//     normal: false,
//     premium: [{
//       info: 'premium',
//       reviews: 'premium',
//       coupons: 'premium',
//       promotions: 'premium',
//       products: 'premium',
//       table: 'premium'
//     }]
//   },
//   state: 0,
//   createdAt: new Date()
// }, {
//   idUser: 3,
//   avatar: '3.jpg',
//   email: 'dolores@mail.com',
//   password: 'jimyluis',
//   name: 'Dolores Imelda',
//   lastname: 'Zamorano Lugo',
//   birthday: '01/04/1966',
//   permissions: {
//     normal: true
//   },
//   state: 0,
//   createdAt: new Date()
// }]

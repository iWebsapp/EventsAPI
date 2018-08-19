'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HelpSchema = Schema({
  open: { type: Boolean, default: false, required: true },
  cuestion: { type: String, required: true },
  answer: [ { type: String, default: [], required: true } ],
  state: { type: Number, default: 1, required: true },
  createdAt: { type: String, default: Date.now, required: true }
})

module.exports = mongoose.model('helps', HelpSchema)

//
// export const helps = [{
//   idHelp: 1,
//   open: false,
//   cuestion: 'Como se escucha el panda show',
//   answer: ['A toda maquina baboso!!!!'],
//   state: 0,
//   createdAt: new Date()
// },{
//   idHelp: 2,
//   open: false,
//   cuestion: 'Como se escucha el panda show',
//   answer: ['A toda maquina baboso!!!!'],
//   state: 0,
//   createdAt: new Date()
// },{
//   idHelp: 3,
//   open: false,
//   cuestion: 'Como se escucha el panda show',
//   answer: ['A toda maquina baboso!!!!'],
//   state: 0,
//   createdAt: new Date()
// },{
//   idHelp: 4,
//   open: false,
//   cuestion: 'Como se escucha el panda show',
//   answer: ['A toda maquina baboso!!!!'],
//   state: 0,
//   createdAt: new Date()
// }]

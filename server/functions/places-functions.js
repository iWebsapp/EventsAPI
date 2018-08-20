'use strict'

const Debug = require('debug')
const config = require('../config')
const Places = require('../models/places-model')
const InfoPlaces = require('../models/infoplaces-model')
const { verifyToken, meetInfoToken } = require('./')
const debug = new Debug(`${config.settings.name}:functions:places`)
const fs = require('fs')

export const createPlaceFunction = async (req, res, next) => {
  const token = req.token
  const verify = verifyToken(token)
  if (verify === 'Correct verification'){
    const { name,
            monday, tuesday, wednesday, thursday, friday, saturday, sunday,
            phone, cellphone, email, website,
            facebook, twitter, instagram,
            services, description, address
           } = req.body
    const idU = meetInfoToken(token)
    var p = {}
    var namePicture = ""

    if (req.files.picture) {
      const imgName = +new Date() + '_place'
      const extensionImage = req.files.picture.name.split(".").pop()
      const updoadFile = await fs.rename(req.files.picture.path, 'server/images/'+ imgName +'.'+ extensionImage)
      namePicture = imgName + '.' + extensionImage
    }

    p = new Places({
      _user: idU._id,
      name: name,
      picture: namePicture || undefined
    })

    const u = await p.save()

    const i = new InfoPlaces({
      _place: u._id,
      description,
      address,
      services,
      social: [{
        facebook: facebook || undefined,
        twitter: twitter || undefined,
        instagram: instagram || undefined
      }],
      contact: [{
        phone: phone || undefined,
        cellphone: cellphone || undefined,
        email: email || undefined,
        website: website || undefined
      }],
      schedules: [{
        monday: monday || undefined,
        tuesday: tuesday || undefined,
        wednesday: wednesday || undefined,
        thursday: thursday || undefined,
        friday: friday || undefined,
        saturday: saturday || undefined,
        sunday: sunday || undefined
      }]
    })

    await i.save()
    req.message = 'Create places success'
    next()
  } else {
      res.status(401).json({ status: 401, message: 'This token is invalid' })
  }
}


export const getAllPlacesFunction = async (req, res, next) => {
    const token = req.token
    const verify = verifyToken(token)
    if (verify === 'Correct verification'){
      const data = await Places.find().populate('_user', { avatar:true, state:true, createdAt:true })
      req.data = data
      req.message = 'List of all places'
      next()
    } else {
        res.status(401).json({ status: 401, message: 'This token is invalid' })
    }
}



export const getAllMyPlacesFunction = async (req, res, next) => {
    const token = req.token
    const verify = verifyToken(token)
    if (verify === 'Correct verification'){
      const idU = meetInfoToken(token)
      const data = await Places.find({ _user:idU._id }).populate('_user', { avatar:true, state:true, createdAt:true })
      req.data = data
      req.message = 'List of all my places'
      next()
    } else {
        res.status(401).json({ status: 401, message: 'This token is invalid' })
    }
}

'use strict'

const Debug = require('debug')
const config = require('../config')
const Places = require('../models/places-model')
const InfoPlaces = require('../models/infoplaces-model')
const MenuPlaces = require('../models/menuPlaces-model')
const { verifyToken, meetInfoToken } = require('./')
const debug = new Debug(`${config.settings.name}:functions:places`)
const fs = require('fs')

export function dataInfoPlaces (req, u) {
  const { monday, tuesday, wednesday, thursday, friday, saturday, sunday,
    phone, cellphone, email, website,
    facebook, twitter, instagram,
    services, description, address
  } = req.body
  const info = new InfoPlaces({
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
  return info
}

export function dataMenuPlaces (u) {
  const menu = new MenuPlaces({
    _place: u._id,
    items: [{
      icon: 'icon-info',
      title: 'Información'
    }, {
      icon: 'icon-comments',
      title: 'Comentarios'
    }]
  })
  return menu
}

export const createPlaceFunction = async (req, res, next) => {
  const token = req.token
  const verify = verifyToken(token)
  if (verify === 'Correct verification') {
    debug(req.body)
    const { name } = req.body
    const placeName = await Places.findOne({ name })
    if (placeName === undefined) {
      const idU = meetInfoToken(token)
      var p = {}
      var namePicture = ''

      if (req.files.picture) {
        const imgName = +new Date() + '_place'
        const extensionImage = req.files.picture.name.split('.').pop()
        await fs.rename(req.files.picture.path, 'server/images/' + imgName + '.' + extensionImage)
        namePicture = imgName + '.' + extensionImage
      }

      p = new Places({
        _user: idU._id,
        name: name,
        picture: namePicture || undefined
      })

      const u = await p.save()
      await dataInfoPlaces(req, u).save()
      await dataMenuPlaces(u).save()
      req.message = 'Create places success'
      next()
    } else {
      res.status(500).json({ status: 500, message: 'This place already exists' })
    }
  } else {
    res.status(401).json({ status: 401, message: 'This token is invalid' })
  }
}

export const getAllPlacesFunction = async (req, res, next) => {
  const token = req.token
  const verify = verifyToken(token)
  if (verify === 'Correct verification') {
    const data = await Places.find({ state: 1 }).populate('_user', { avatar: true, state: true, createdAt: true })
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
  if (verify === 'Correct verification') {
    const idU = meetInfoToken(token)
    const data = await Places.find({ _user: idU._id, state: 1 }).populate('_user', { avatar: true, state: true, createdAt: true })
    req.data = data
    req.message = 'List of all my places'
    next()
  } else {
    res.status(401).json({ status: 401, message: 'This token is invalid' })
  }
}

export const deleteMyPlacesFunction = async (req, res, next) => {
  const token = req.token
  const verify = verifyToken(token)
  if (verify === 'Correct verification') {
    const id = req.params.id
    const idU = meetInfoToken(token)
    const all = await Places.find({ _id: id })
    if (all[0] !== undefined) {
      if (all[0]._user === idU._id) {
        const places = await Places.findOne({ _id: id })
        places.state = 0
        await places.save()
        req.message = 'This places has been deleted'
        next()
      } else {
        res.status(500).json({ status: 500, message: 'This id is invalid because is not the this user' })
      }
    } else {
      res.status(500).json({ status: 500, message: "This places not can't delete because has been deleted with before" })
    }
  } else {
    res.status(401).json({ status: 401, message: 'This token is invalid' })
  }
}

export const editMyPlacesFunction = async (req, res, next) => {
  const token = req.token
  const verify = verifyToken(token)
  if (verify === 'Correct verification') {
    const { name, services, description, address,
      phone, cellphone, email, website,
      monday, tuesday, wednesday, thursday, friday, saturday, sunday,
      facebook, twitter, instagram } = req.body
    const id = req.params.id
    const all = await InfoPlaces.find({ _place: id })
    const idU = meetInfoToken(token)
    var namePicture = ''
    if (all[0]._place === id) {
      if (req.files.picture) {
        const imgName = +new Date() + '_place'
        const extensionImage = req.files.picture.name.split('.').pop()
        await fs.rename(req.files.picture.path, 'server/images/' + imgName + '.' + extensionImage)
        namePicture = imgName + '.' + extensionImage
      }
      const places = await Places.findOne({ _id: id })
      places.name = name
      places.picture = namePicture
      await places.save()

      const placesinfo = await InfoPlaces.findOne({ _user: idU.id })
      placesinfo.services = [ services ]
      placesinfo.description = description
      placesinfo.address = address

      placesinfo.social[0].facebook = facebook
      placesinfo.social[0].twitter = twitter
      placesinfo.social[0].instagram = instagram

      placesinfo.contact[0].phone = phone
      placesinfo.contact[0].cellphone = cellphone
      placesinfo.contact[0].email = email
      placesinfo.contact[0].website = website

      placesinfo.schedules[0].monday = monday
      placesinfo.schedules[0].tuesday = tuesday
      placesinfo.schedules[0].wednesday = wednesday
      placesinfo.schedules[0].thursday = thursday
      placesinfo.schedules[0].friday = friday
      placesinfo.schedules[0].saturday = saturday
      placesinfo.schedules[0].sunday = sunday

      await placesinfo.save()
      req.message = 'This places has been edited'
      next()
    } else {
      res.status(500).json({ status: 500, message: 'This id is invalid because is not the this user' })
    }
  } else {
    res.status(401).json({ status: 401, message: 'This token is invalid' })
  }
}

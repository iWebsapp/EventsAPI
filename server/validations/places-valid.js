'use strict'

// const Debug = require('debug')
// const config = require('../config')
// const debug = new Debug(`${config.settings.name}:places:valid`)

// THIS FUNCTION IS THE ONE IN CHARGE THE VAILDATE NEW USER
export const addPlacesValid = (req, res, next) => {
  const validater = []

  if (!req.body.name) {
    const v = { fields: 'name', message: 'The name is required' }
    validater.push(v)
  } else {
    if (req.body.name.length < 5) {
      const v = { fields: 'name', message: 'The name must have more than 5 characters' }
      validater.push(v)
    }
  }

  if (!req.body.services) {
    const v = { fields: 'services', message: 'The services is required' }
    validater.push(v)
  } else {
    if (req.body.services.length < 5) {
      const v = { fields: 'services', message: 'The services must have more than 5 characters' }
      validater.push(v)
    }
  }

  if (!req.body.description) {
    const v = { fields: 'description', message: 'The description is required' }
    validater.push(v)
  } else {
    if (req.body.description.length < 5) {
      const v = { fields: 'description', message: 'The description must have more than 5 characters' }
      validater.push(v)
    }
  }

  if (!req.body.address) {
    const v = { fields: 'address', message: 'The address is required' }
    validater.push(v)
  } else {
    if (req.body.address.length < 5) {
      const v = { fields: 'address', message: 'The address must have more than 5 characters' }
      validater.push(v)
    }
  }

  if (!req.files.picture) {
    const v = { fields: 'picture', message: 'The picture is required' }
    validater.push(v)
  } else {
    if (req.files.picture.type !== 'image/jpeg') {
      if (req.files.picture.type !== 'image/png') {
        const v = { fields: 'picture', message: 'The picture ( png, jpeg )' }
        validater.push(v)
      }
    }
  }

  if (req.body.monday) {
    if (req.body.monday.length < 5) {
      const v = { fields: 'monday', message: 'The monday must have more than 5 characters' }
      validater.push(v)
    }
  }

  if (req.body.tuesday) {
    if (req.body.tuesday.length < 5) {
      const v = { fields: 'name', message: 'The tuesday must have more than 5 characters' }
      validater.push(v)
    }
  }

  if (req.body.wednesday) {
    if (req.body.wednesday.length < 5) {
      const v = { fields: 'name', message: 'The wednesday must have more than 5 characters' }
      validater.push(v)
    }
  }

  if (req.body.thursday) {
    if (req.body.thursday.length < 5) {
      const v = { fields: 'thursday', message: 'The thursday must have more than 5 characters' }
      validater.push(v)
    }
  }

  if (req.body.friday) {
    if (req.body.friday.length < 5) {
      const v = { fields: 'friday', message: 'The friday must have more than 5 characters' }
      validater.push(v)
    }
  }

  if (req.body.saturday) {
    if (req.body.saturday.length < 5) {
      const v = { fields: 'saturday', message: 'The saturday must have more than 5 characters' }
      validater.push(v)
    }
  }

  if (req.body.sunday) {
    if (req.body.sunday.length < 5) {
      const v = { fields: 'sunday', message: 'The sunday must have more than 5 characters' }
      validater.push(v)
    }
  }

  if (req.body.phone) {
    if (req.body.phone.length < 5) {
      const v = { fields: 'phone', message: 'The phone must have more than 5 characters' }
      validater.push(v)
    }
  }

  if (req.body.cellphone) {
    if (req.body.cellphone.length < 5) {
      const v = { fields: 'cellphone', message: 'The cellphone must have more than 5 characters' }
      validater.push(v)
    }
  }

  if (req.body.email) {
    if (req.body.email.length < 5) {
      const v = { fields: 'email', message: 'The email must have more than 5 characters' }
      validater.push(v)
    }
  }

  if (req.body.website) {
    if (req.body.website.length < 5) {
      const v = { fields: 'website', message: 'The website must have more than 5 characters' }
      validater.push(v)
    }
  }

  if (req.body.facebook) {
    if (req.body.facebook.length < 5) {
      const v = { fields: 'facebook', message: 'The facebook must have more than 5 characters' }
      validater.push(v)
    }
  }

  if (req.body.twitter) {
    if (req.body.twitter.length < 5) {
      const v = { fields: 'twitter', message: 'The twitter must have more than 5 characters' }
      validater.push(v)
    }
  }

  if (req.body.instagram) {
    if (req.body.instagram.length < 5) {
      const v = { fields: 'instagram', message: 'The instagram must have more than 5 characters' }
      validater.push(v)
    }
  }

  if (validater.length === 0) {
    next()
  } else {
    return res.status(400).json(validater)
  }
}

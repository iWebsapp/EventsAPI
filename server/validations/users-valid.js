'use strict'

const Debug = require('debug')
const config = require('../config')
const User = require('../models/users-model')
const jwt = require('jsonwebtoken')
const debug = new Debug(`${config.settings.name}:users:valid`)
const { verifyToken, meetInfoToken, findUserById } = require('../functions')

// THIS FUNCTION IS THE ONE IN CHARGE THE HAVE LOGIN
export const loginUserValid = (req, res, next) => {
  const validater = []
  if (!req.body.email) {
    const v = { fields: 'email', message: 'The email is required' }
    validater.push(v)
  } else {
    if (!(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(req.body.email))) {
      const v = { fields: 'email', message: 'This is not a valid email' }
      validater.push(v)
    }
  }

  if (!req.body.password) {
    const v = { fields: 'password', message: 'The password is required' }
    validater.push(v)
  } else {
    if (req.body.password.length < 8) {
      const v = { fields: 'password', message: 'The password must have more than 8 characters' }
      validater.push(v)
    }
  }

  if (validater.length === 0) {
    next()
  } else {
    return res.status(400).json(validater)
  }
}

// THIS FUNCTION IS THE ONE IN CHARGE THE VAILDATE NEW USER
export const addUserValid = (req, res, next) => {
  const validater = []
  // if (req.files.avatar) {
  //   if (req.files.avatar.type !== 'image/jpeg') {
  //     if (req.files.avatar.type !== 'image/png') {
  //       const v = { fields: 'avatar', message: 'The avatar ( png, jpeg )' }
  //       validater.push(v)
  //     }
  //   }
  // }

  if (!req.body.email) {
    const v = { fields: 'email', message: 'The email is required' }
    validater.push(v)
  } else {
    if (!(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(req.body.email))) {
      const v = { fields: 'email', message: 'This is not a valid email' }
      validater.push(v)
    }
  }

  if (!req.body.password) {
    const v = { fields: 'password', message: 'The password is required' }
    validater.push(v)
  } else {
    if (req.body.password.length < 8) {
      const v = { fields: 'password', message: 'The password must have more than 8 characters' }
      validater.push(v)
    }
  }

  if (validater.length === 0) {
    next()
  } else {
    return res.status(400).json(validater)
  }
}




// THIS FUNCTION IS THE ONE IN CHARGE THE VALIDATE ID IS NUMERIC OR REQUIRED
export const idValid = (req, res, next) => {
  const validater = []
  if (!req.params.id) {
    const v = { fields: 'id', message: 'The id is required' }
    validater.push(v)
  } else {
    if (isNaN(req.params.id)) {
      const v = { fields: 'id', message: 'The id is not a number' }
      validater.push(v)
    }
  }

  if (validater.length === 0) {
    next()
  } else {
    debug(validater)
    return res.status(400).json(validater)
  }
}


// THIS FUNCTION IS THE ONE IN CHARGE THE VALIDATE ID IS NUMERIC OR REQUIRED
export const idPlacesValid = (req, res, next) => {
  const validater = []
  if (!req.params.idPlace) {
    const v = { fields: 'idPlace', message: 'The idPlace is required' }
    validater.push(v)
  } else {
    if (isNaN(req.params.idPlace)) {
      const v = { fields: 'idPlace', message: 'The idPlace is not a number' }
      validater.push(v)
    }
  }

  if (validater.length === 0) {
    next()
  } else {
    debug(validater)
    return res.status(400).json(validater)
  }
}

// THIS FUNCTION IS THE ONE IN CHARGE THE VALIDATE ID IS NUMERIC OR REQUIRED
export const emailValid = (req, res, next) => {
  const validater = []
  if (!req.body.email) {
    const v = { fields: 'email', message: 'The email is required' }
    validater.push(v)
  } else {
    if (!(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(req.body.email))) {
      const v = { fields: 'email', message: 'This is not a valid email' }
      validater.push(v)
    }
  }

  if (validater.length === 0) {
    next()
  } else {
    debug(validater)
    return res.status(400).json(validater)
  }
}

// THIS FUNCTION IS THE ONE IN CHARGE THE VALIDATE ID IS NUMERIC OR REQUIRED
export const passwordValid = (req, res, next) => {
  const validater = []
  if (!req.body.password) {
    const v = { fields: 'password', message: 'The password is required' }
    validater.push(v)
  } else {
    if (req.body.password.length < 8) {
      const v = { fields: 'password', message: 'The password must have more than 8 characters' }
      validater.push(v)
    }
  }

  if (validater.length === 0) {
    next()
  } else {
    debug(validater)
    return res.status(400).json(validater)
  }
}

// THIS FUNCTION IS THE ONE IN CHARGE THE VALIDATE ID IS NUMERIC OR REQUIRED
export const passwordChangeValid = async (req, res, next) => {
  const validater = []
  const token = req.token
  const password = req.body.password
  const verify = await verifyToken(token)

  if (!req.body.newpass) {
    const v = { fields: 'newpass', message: 'The newpass is required' }
    validater.push(v)
  } else {
    if (req.body.newpass.length < 8) {
      const v = { fields: 'newpass', message: 'The newpass must have more than 8 characters' }
      validater.push(v)
    } else {
      if (verify === 'Correct verification') {
        const u = meetInfoToken(token)
        const usr = await User.findOne({ _id: u._id })
        const pss = await usr.password
        if( pss != password ){
          const v = { fields: 'password', message: 'This password is incorrect, try with another' }
          validater.push(v)
        }
      } else {
        const v = { fields: 'token', message: 'The token is invalid' }
        validater.push(v)
      }
    }
  }

  if (validater.length === 0) {
    next()
  } else {
    debug(validater)
    return res.status(400).json(validater)
  }

}

// THIS FUNCTION IS THE ONE IN CHARGE THE VALIDATE ID IS NUMERIC OR REQUIRED
export const birthdayValid = (req, res, next) => {
  const validater = []

  if (!req.body.birthday) {
    const v = { fields: 'birthday', message: 'The id is required' }
    validater.push(v)
  } else {
    if (!(/^\d{2}\/\d{2}\/\d{4}$/i.test(req.body.birthday))) {
      const v = { fields: 'birthday', message: 'This is not a valid birthday (dd/mm/yyyy)' }
      validater.push(v)
    }
  }

  if (validater.length === 0) {
    next()
  } else {
    debug(validater)
    return res.status(400).json(validater)
  }
}

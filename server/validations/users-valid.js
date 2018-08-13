'use strict'

const Debug = require('debug')
const config = require('../config')
const usersModel = require('../models/users-model')
const jwt = require('jsonwebtoken')
const debug = new Debug(`${config.settings.name}:users:valid`)

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
export const passwordChangeValid = (req, res, next) => {
  const validater = []
  const token = req.token
  const password = req.body.password
  const verify = verifyToken(token)

  if (!req.body.newpass) {
    const v = { fields: 'newpass', message: 'The newpass is required' }
    validater.push(v)
  } else {
    if (req.body.newpass.length < 8) {
      const v = { fields: 'newpass', message: 'The newpass must have more than 8 characters' }
      validater.push(v)
    } else {


      if (verify == "Correct verification"){
          const user = findUserById(token)
          if (user.length == 1) {
            const passDB = user[0].password
            if(passDB !== password){
              const v = { fields: 'password', message: 'This password is incorrect, try with another' }
              validater.push(v)
            }
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


function verifyToken (token) {
  return jwt.verify(token, config.settings.secret, (err, auth) => {
    if(err){
      return 'This token is invalid'
    } else {
      return 'Correct verification'
    }
  })
}

function findUserById(token){
  const idU = meetInfoToken(token)
  const actual = idU.idUser
  let arrayUser = []
  for (var i = 0; i < usersModel.users.length; i++) {
    if (usersModel.users[i].idUser == actual) {
      arrayUser.push(usersModel.users[i])
    }
  }
  return arrayUser
}

function meetInfoToken(token){
  const tokenArray = token.split(".")
  const tokenString = tokenArray[1].toString()
  const tokenDesencryp = Buffer.from(tokenString, 'base64').toString()
  const tokenObject = JSON.parse(tokenDesencryp)
  return tokenObject.users
}

'use strict'

const Debug = require('debug')
const config = require('../config')
const usersModel = require('../models/users-model')
const debug = new Debug(`${config.settings.name}:functions:users`)
const async = require('async')
const { createToken, verifyToken, meetInfoToken, verifyHeadersTokenFunction, sendEmail } = require('./')

// function find user by email
function findUserByEmail (email) {
  let arrayUser = []
  for (var i = 0; i < usersModel.users.length; i++) {
    if (usersModel.users[i].email === email) {
      arrayUser.push(usersModel.users[i])
    }
  }
  return arrayUser
}

// function find user by passoword
function findUserByPassword (pass) {
  for (var i = 0; i < usersModel.users.length; i++) {
    if (usersModel.users[i].password === pass) {
      return true
    }
  }
  return false
}


// function create new user
export const createUserFunction = (req, res, next) => {
  const { email, password } = req.body
  const user = findUserByEmail(email)
  const allUsers = usersModel['users']
  if (user.length === 0) {
    user.idUser = +new Date()
    user.email = email
    user.password = password
    user.createdAt = new Date()
    user.state = -1
    user.avatar = 'default.png'
    user.permissions = {
      free: true
    }

    async.parallel([
      function (callback) {
        sendEmail(
          callback,
          'support@gloomitty.com',
          [user.email],
          'Bienvenido a ' + config.settings.name,
          'Bienvenido a ' + config.settings.name,
          '<p style="font-size: 32px;">Bienvenido</p>'
        )
      }
    ], function (err, results) {
      if (!err) {
        req.message = 'Create success'
        allUsers.push(user)
        next()
      } else {
        res.status(202).json({ status: 202, message: 'An error has occurred, the email has not been sent' })
      }
    })
  } else {
    res.status(202).json({ status: 202, message: 'This user already exist' })
  }
}

// funcion login user
export const loginUserFunction = (req, res, next) => {
  const { email, password } = req.body
  const user = findUserByEmail(email)

  if (user.length > 0) {
    if (user[0].state === 0 || user[0].state === 1) {
      const valid = findUserByPassword(password)
      if (!valid) {
        debug('the passwords do not match')
        res.status(400).json({ status: 400, message: 'The password do not match' })
      } else {
        const token = createToken(user[0])
        req.message = 'Login success'
        req.token = token
        req.idUser = user.idUser
        next()
      }
    } else {
      res.status(500).json({ status: 500, message: 'This user not has been activated' })
    }
  } else {
    debug(`User with email ${email} not found`)
    res.status(404).json({ status: 404, message: 'User not found' })
  }
}

export const activateUserFunction = (req, res, next) => {
  const token = req.params.id
  const verify = verifyToken(token)
  if (verify === 'Correct verification') {
    const idU = meetInfoToken(token)
    for (var i = 0; i < usersModel['users'].length; i++) {
      if (usersModel['users'][i].idUser === idU.idUser) {
        const user = usersModel['users'][i]
        user.state = 0
        usersModel['users'].splice(i, 1, user)
      }
    }
    req.message = 'This user has been activated with success'
    next()
  } else {
    res.status(401).json({ status: 401, message: 'This token is invalid' })
  }
}

export const changeEmailUserFunction = (req, res, next) => {
  const token = req.token
  const data = req.body
  const user = findUserByEmail(data['email'])
  debug(user)
  if (user.length > 0) {
    res.status(400).json({ status: 400, message: 'This email already exists' })
  } else {
    const verify = verifyToken(token)
    if (verify === 'Correct verification') {
      const idU = meetInfoToken(token)
      for (var i = 0; i < usersModel['users'].length; i++) {
        if (usersModel['users'][i].idUser === idU.idUser) {
          const user = usersModel['users'][i]
          user.email = data.email
          usersModel['users'].splice(i, 1, user)
        }
      }
      req.message = 'The email has been changed with this user'
      next()
    } else {
      res.status(401).json({ status: 401, message: 'This token is invalid' })
    }
  }
}

export const changePasswordUserFunction = (req, res, next) => {
  const token = req.token
  const data = req.body
  const verify = verifyToken(token)
  if (verify === 'Correct verification') {
    const idU = meetInfoToken(token)
    for (var i = 0; i < usersModel['users'].length; i++) {
      if (usersModel['users'][i].idUser === idU.idUser) {
        const user = usersModel['users'][i]
        user.password = data.newpass
        usersModel['users'].splice(i, 1, user)
      }
    }
    req.message = 'The password has been changed with this user'
    next()
  } else {
    res.status(401).json({ status: 401, message: 'This token is invalid' })
  }
}

export const changeBirthdayUserFunction = (req, res, next) => {
  const token = req.token
  const data = req.body
  const verify = verifyToken(token)
  if (verify === 'Correct verification') {
    const idU = meetInfoToken(token)
    for (var i = 0; i < usersModel['users'].length; i++) {
      if (usersModel['users'][i].idUser === idU.idUser) {
        const user = usersModel['users'][i]
        user.birthday = data.birthday
        usersModel['users'].splice(i, 1, user)
      }
    }
    req.message = 'The birthday has been changed with this user'
    next()
  } else {
    res.status(401).json({ status: 401, message: 'This token is invalid' })
  }
}

export const allUsersFunction = (req, res, next) => {
  const token = req.token
  const data = req.body
  const verify = verifyToken(token)
  if (verify === 'Correct verification') {
    req.message = 'List of all users'
    req.data = usersModel
    next()
  } else {
    res.status(401).json({ status: 401, message: 'This token is invalid' })
  }
}

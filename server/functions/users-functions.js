'use strict'

// const Debug = require('debug')
const config = require('../config')
const User = require('../models/users-model')
// const debug = new Debug(`${config.settings.name}:functions:users`)
const async = require('async')
const { createToken, verifyToken, meetInfoToken, sendEmail } = require('./')
const fs = require('fs')

// function create new user
export const createUserFunction = async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user === undefined) {
    const u = new User({
      email,
      password,
      permissions: [
        'normal'
      ]
    })

    async.parallel([
      function (callback) {
        sendEmail(
          callback,
          'support@gloomitty.com',
          [email],
          'Bienvenido a ' + config.settings.name,
          'Bienvenido a ' + config.settings.name,
          '<p style="font-size: 32px;">Bienvenido</p>'
        )
      }
    ], function (err, results) {
      if (!err) {
        u.save()
        req.message = 'Create success'
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
export const loginUserFunction = async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user !== null) {
    if (user['state'] === 0 || user['state'] === 1) {
      if (!(user['password'] === password)) {
        res.status(400).json({ status: 400, message: 'The password do not match' })
      } else {
        const token = createToken(user)
        req.message = 'Login success'
        req.token = token
        next()
      }
    } else {
      res.status(500).json({ status: 500, message: 'This user not has been activated' })
    }
  } else {
    res.status(404).json({ status: 404, message: 'User not found' })
  }
}

export const activateUserFunction = async (req, res, next) => {
  const token = req.params.id
  const verify = verifyToken(token)
  if (verify === 'Correct verification') {
    const idU = meetInfoToken(token)
    const user = await User.findOne({ _id: idU._id })
    user.state = 0
    await user.save()
    req.message = 'This user has been activated with success'
    next()
  } else {
    res.status(401).json({ status: 401, message: 'This token is invalid' })
  }
}

export const changeEmailUserFunction = async (req, res, next) => {
  const token = req.token
  const data = req.body
  const verify = verifyToken(token)
  if (verify === 'Correct verification') {
    const idU = meetInfoToken(token)
    const user = await User.findOne({ _id: idU._id })
    user.email = data.email
    await user.save()
    req.message = 'The email has been changed with this user'
    next()
  } else {
    res.status(401).json({ status: 401, message: 'This token is invalid' })
  }
}

export const changePasswordUserFunction = async (req, res, next) => {
  const token = req.token
  const data = req.body
  const verify = verifyToken(token)
  if (verify === 'Correct verification') {
    const idU = meetInfoToken(token)
    const user = await User.findOne({ _id: idU._id })
    user.password = data.newpass
    await user.save()
    req.message = 'The password has been changed with this user'
    next()
  } else {
    res.status(401).json({ status: 401, message: 'This token is invalid' })
  }
}

export const changeBirthdayUserFunction = async (req, res, next) => {
  const token = req.token
  const data = req.body
  const idU = meetInfoToken(token)
  const user = await User.findOne({ _id: idU._id })
  user.birthday = data.birthday
  await user.save()
  req.message = 'The birthday has been changed with this user'
  next()
}

export const allUsersFunction = async (req, res, next) => {
  const token = req.token
  const verify = verifyToken(token)
  if (verify === 'Correct verification') {
    req.message = 'List of all users'
    req.data = await User.find()
    next()
  } else {
    res.status(401).json({ status: 401, message: 'This token is invalid' })
  }
}

export const changeAvatarUserFunction = async (req, res, next) => {
  const token = req.token
  const verify = verifyToken(token)
  if (verify === 'Correct verification') {
    const idU = meetInfoToken(token)
    const user = await User.findOne({ _id: idU._id })
    const imgName = +new Date() + '_avatar'
    const extensionImage = req.files.avatar.name.split('.').pop()
    await fs.rename(req.files.avatar.path, 'server/images/' + imgName + '.' + extensionImage)
    const namePicture = imgName + '.' + extensionImage
    user.avatar = namePicture
    await user.save()
    req.message = 'The picture has been successfully loaded with user'
    next()
  } else {
    res.status(401).json({ status: 401, message: 'This token is invalid' })
  }
}

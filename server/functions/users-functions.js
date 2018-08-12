'use strict'

const Debug = require('debug')
const config = require('../config')
const usersModel = require('../models/users-model')
const jwt = require('jsonwebtoken')
const helper = require('sendgrid').mail
const auth = require('express-jwt')
const guard = require('express-jwt-permissions')()
const debug = new Debug(`${config.settings.name}:functions:users`)
const chalk = require('chalk')
const async = require('async')
const fs = require('fs')

// function find user by email
function findUserByEmail (email) {
  let arrayUser = []
  for (var i = 0; i < usersModel.users.length; i++) {
    if (usersModel.users[i].email == email) {
      arrayUser.push(usersModel.users[i])
    }
  }
  return arrayUser
}

// function find user by passoword
function findUserByPassword (pass) {
  for (var i = 0; i < usersModel.users.length; i++) {
    if (usersModel.users[i].password == pass) {
      return true
    }
  }
  return false
}

// function create token from user
function createToken (user) {
  const newUser = {
    idUser: user.idUser,
    permissions: user.permissions
  }
  return jwt.sign({ newUser }, config.settings.secret, { expiresIn: config.settings.exp })
}

// funcion cromprobate valid token
function validToken (user) {
  return jwt.sign({ user }, config.settings.secret, { expiresIn: config.settings.exp })
}

// function send email with create user
function sendEmail (
  parentCallback,
  fromEmail,
  toEmails,
  subject,
  textContent,
  htmlContent
) {
  const errorEmails = []
  const successfulEmails = []
  const sg = require('sendgrid')('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')
  async.parallel([
    function (callback) {
      // Add to emails
      for (let i = 0; i < toEmails.length; i += 1) {
        // Add from emails
        const senderEmail = new helper.Email(fromEmail)
        // Add to email
        const toEmail = new helper.Email(toEmails[i])
        // HTML Content
        const content = new helper.Content('text/html', htmlContent)
        const mail = new helper.Mail(senderEmail, subject, toEmail, content)
        var request = sg.emptyRequest({
          method: 'POST',
          path: '/v3/mail/send',
          body: mail.toJSON()
        })
        sg.API(request, function (error, response) {
          // console.log('SendGrid');
          if (error) {
            console.log('Error response received')
          }
          // console.log(response.statusCode);
          // console.log(response.body);
          // console.log(response.headers);
        })
      }
      callback(null, true)
    }
  ], function (err, results) {
    console.log('Done')
  })
  parentCallback(null, {
    successfulEmails: successfulEmails,
    errorEmails: errorEmails
  })
}

// function create new user
export const createUserFunction = (req, res, next) => {
  const { email, password } = req.body
  const user = findUserByEmail(email)
  const allUsers = usersModel['users']
  if (user.length == 0) {
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
        res.status(202).json({ message: 'An error has occurred, the email has not been sent' })
      }
    })
  } else {
    res.status(202).json({ message: 'This user already exist' })
  }
}

// funcion login user
export const loginUserFunction = (req, res, next) => {
  const { email, password } = req.body
  const secret = config.settings.secret
  const user = findUserByEmail(email)

  if (user.length > 0) {
    if (user[0].state === 0 || user[0].state === 1) {
      const valid = findUserByPassword(password)
      if (!valid) {
        debug('the passwords do not match')
        res.status(400).json({ message: 'The password do not match' })
      } else {
        const token = createToken(user[0])
        req.message = 'Login success'
        req.token = token
        req.idUser = user.idUser
        next()
      }
    } else {
      res.status(500).json({ message: 'This user not has been activated' })
    }
  } else {
    debug(`User with email ${email} not found`)
    res.status(404).json({ message: 'User not found' })
  }
}

export const uploadAvatarUserFunction = (req, res, next) => {
  if (req.files.avatar === undefined) {
    user.avatar = 'default.png'
  } else {
    const imgName = user.idUser
    const extensionImage = req.files.avatar.name.split('.').pop()
    fs.rename(req.files.avatar.path, 'server/images/' + imgName.idUser + '.' + extensionImage)
    user.avatar = imgName.idUser + '.' + extensionImage
  }
}

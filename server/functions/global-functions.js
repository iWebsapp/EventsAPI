'use strict'

const Debug = require('debug')
const config = require('../config')
const usersModel = require('../models/users-model')
const jwt = require('jsonwebtoken')
const helper = require('sendgrid').mail
const debug = new Debug(`${config.settings.name}:functions:users`)
const async = require('async')
const chalk = require('chalk')

export function findUserById (token) {
  const idU = meetInfoToken(token)
  const actual = idU.idUser
  let arrayUser = []
  for (var i = 0; i < usersModel.users.length; i++) {
    if (usersModel.users[i].idUser === actual) {
      arrayUser.push(usersModel.users[i])
    }
  }
  return arrayUser
}
// function create token from user
export function createToken (user) {
  const users = {
    idUser: user.idUser,
    permissions: user.permissions
  }
  return jwt.sign({ users }, config.settings.secret, { expiresIn: config.settings.exp })
}

// function verify token
export function verifyToken (token) {
  return jwt.verify(token, config.settings.secret, (err, auth) => {
    if (err) {
      return 'This token is invalid'
    } else {
      return 'Correct verification'
    }
  })
}

// meet information the jwt
export function meetInfoToken (token) {
  const tokenArray = token.split('.')
  const tokenString = tokenArray[1].toString()
  const tokenDesencryp = Buffer.from(tokenString, 'base64').toString()
  const tokenObject = JSON.parse(tokenDesencryp)
  return tokenObject.users
}


// FORMAT OF TOKEN
// Authorization <access_token>
export const verifyHeadersTokenFunction = (req, res, next) => {
  const bearerHeader = req.headers['authorization']
  if (typeof bearerHeader !== 'undefined') {
    req.token = bearerHeader
    next()
  } else {
    res.status(403).json({ status: 403, message: 'Requires a token' })
  }
}

export function handleError (res, err) {
  console.error(`${chalk.red('[Error]')} ${err.message}`)
  console.error(err.stack)
  return res.status(500).json({
    status: 500,
    error: err.message
  })
}


export function handleFatalError (res, err) {
  console.error(`${chalk.red('[Fatal Error]')} ${err.message}`)
  console.error(err.stack)
  return res.status(500).json({
    status: 500,
    error: err.message
  })
  process.exit(1)
}

// function send email with create user
export function sendEmail (
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
            return res.status(500).json({
              status: 500,
              error: error.message,
              stack: error.stack
            })
          }
          // console.log(response.statusCode);
          // console.log(response.body);
          // console.log(response.headers);
        })
      }
      callback(null, true)
    }
  ], function (err, results) {
    if (err) {
      return res.status(500).json({
        status: 500,
        error: err.message,
        stack: err.stack
      })
    } else {
      console.log('Done: ', results)
    }
  })
  parentCallback(null, {
    successfulEmails: successfulEmails,
    errorEmails: errorEmails
  })
}

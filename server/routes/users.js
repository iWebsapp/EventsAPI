import express from 'express'
import Debug from 'debug'
import config from '../config'
import { required, users, findUserByEmail, usersMiddleware, userMiddleware } from '../meddleware'
import { loginValidate, addUserValidate, idValidate, isExistEmail }  from '../validate'
var helper = require('sendgrid').mail;
const async = require('async');
import jwt from 'jsonwebtoken'
import fs from 'fs'

const app = express.Router()

const debug = new Debug(config.settings.name + ':auth-routes')

const createToken = (user) => jwt.sign({ user }, config.settings.secret, { expiresIn: 86400 })

function comparePasswords(providedPassword, userPassword) {
    return providedPassword === userPassword
}

app.post('/login', loginValidate, (req, res, next) => {

    debug('this is a login')
    // const { email, password } = req.body
    // const user = findUserByEmail(email)
    //
    // if (!user) {
    //   debug(`User with email ${email} not found`)
    //   return handleLoginFailed(res)
    // }
    //
    // if (!comparePasswords(password, user.password)) {
    //   debug(`Passwords do not match: ${password} !== ${user.password}`)
    //   return handleLoginFailed(res, 'El correo y la contraseña no coinciden')
    // }
    //
    // const token = createToken(user)
    res.status(200).json({
      message: 'Login success'
    })

})

app.post('/add', addUserValidate, isExistEmail, usersMiddleware, (req, res) => {

    const user = req.body
    user.idUser = +new Date()
    user.createdAt = new Date()
    user.state = 0
    req.users.push(user)

    if(req.files.avatar === undefined){
      user.avatar = "avatar.jpg"
    } else {
      const imgName = findUserByEmail(user.email)
      const extensionImage = req.files.avatar.name.split(".").pop()
      fs.rename(req.files.avatar.path, 'server/images/'+ imgName.idUser +'.'+extensionImage)
      user.avatar = imgName.idUser + '.' + extensionImage
    }

    async.parallel([
      function (callback) {
        sendEmail(
          callback,
          'support@gloomitty.com',
          [user.email],
          'Bienvenido a Gloomitty',
          'Bienvenido a Gloomitty',
          '<p style="font-size: 32px;">Bienvenido</p>'
        );
      }
    ], function(err, results) {
      res.status(201).json({
        message: 'The user has been created successfully'
      })
      // res.send({
      //   success: true,
      //   message: 'Emails sent',
      //   successfulEmails: results[0].successfulEmails,
      //   errorEmails: results[0].errorEmails,
      // });
    });



})


app.post('/edit/:id', idValidate, addUserValidate, isExistEmail, usersMiddleware, (req, res) => {

  const user = req.body
  const idU = req.params.id
  user.idUser = idU
  user.createdAt = new Date()

  for (var i = 0; i < req.users.length; i++){
      if (req.users[i].idUser == idU){
          req.users.splice(i, 1, user)
      }
  }

  res.status(201).json({
    message: 'The user has been edited successfully'
  })

})


app.post('/change/email/:id', idValidate, isExistEmail, usersMiddleware, (req, res) => {

  const newEmail = req.body.email
  const idU = req.params.id

  for (var i = 0; i < req.users.length; i++){
      if (req.users[i].idUser == idU){
          const user = req.users[i]
          user.email = newEmail
          req.users.splice(i, 1, user)
      }
  }

  res.status(201).json({
    message: 'The email has been edited successfully'
  })

})


app.post('/change/password/:id', idValidate, isExistEmail, usersMiddleware, (req, res) => {

  const oldPassword = req.body.oldPassword
  const newPassword = req.body.newPassword
  const idU = req.params.id

  for (var i = 0; i < req.users.length; i++){

      if (req.users[i].idUser == idU){
          const user = req.users[i]
          const userOld = user.password
          if(userOld == oldPassword){
              user.password = newPassword
              req.users.splice(i, 1, user)
              res.status(201).json({
                message: 'The password has been change successfully'
              })
          } else {
              res.status(401).json({
                message: 'This password is incorrect try it with another'
              })
          }
      }

  }

})



app.post('/change/birthday/:id', idValidate, isExistEmail, usersMiddleware, (req, res) => {

  const newBirthday = req.body.birthday
  const idU = req.params.id
  const validformat=/^\d{2}\/\d{2}\/\d{4}$/ //Basic check for format validity

  if (!validformat.test(newBirthday)){
    res.status(201).json({
      message: 'The format birthday is incorrect ( MM/dd/yyyy )'
    })
  } else {

      for (var i = 0; i < req.users.length; i++){
          if (req.users[i].idUser == idU){
              const user = req.users[i]
              user.birthday = newBirthday
              req.users.splice(i, 1, user)
              res.status(201).json({
                message: 'The birthday has been edited successfully'
              })
          }
      }

  }

})



app.post('/conextion/active/:id', usersMiddleware, (req, res) => {

  const idU = req.params.id
  for (var i = 0; i < req.users.length; i++){
    if (req.users[i].idUser == idU){
      const user = req.users[i]
      user.state = 1
      req.users.splice(i, 1, user)
    }
  }

  res.status(201).json({
    message: 'The conextion has been actived successfully'
  })

})


app.post('/conextion/desactive/:id', usersMiddleware, (req, res) => {

  const idU = req.params.id
  for (var i = 0; i < req.users.length; i++){
    if (req.users[i].idUser == idU){
      const user = req.users[i]
      user.state = 0
      req.users.splice(i, 1, user)
    }
  }

  res.status(201).json({
    message: 'The conextion has been desactived successfully'
  })

})

app.delete('/delete/:id', idValidate, usersMiddleware, (req, res) => {

    const user = req.body
    const idU = req.params.id

    for (var i = 0; i < req.users.length; i++){
        if (req.users[i].idUser == idU){
            req.users.splice(i, 1)
        }
    }

    res.status(201).json({
      message: 'The user has been removed successfully'
    })

})

app.get('/', usersMiddleware, (req, res) => {
  //setTimeout( () => {
    res.status(200).json(req.users)
  //}, 2000)
})

function handleLoginFailed(res, message) {
  return res.status(401).json({
    message: 'Login failed',
    error: message || 'Email and password don\'t match'
  })
}

function sendEmail(
    parentCallback,
    fromEmail,
    toEmails,
    subject,
    textContent,
    htmlContent
  ) {
    const errorEmails = [];
    const successfulEmails = [];
     const sg = require('sendgrid')('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');
     async.parallel([
      function(callback) {
        // Add to emails
        for (let i = 0; i < toEmails.length; i += 1) {
          // Add from emails
          const senderEmail = new helper.Email(fromEmail);
          // Add to email
          const toEmail = new helper.Email(toEmails[i]);
          // HTML Content
          const content = new helper.Content('text/html', htmlContent);
          const mail = new helper.Mail(senderEmail, subject, toEmail, content);
          var request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON()
          });
          sg.API(request, function (error, response) {
            //console.log('SendGrid');
            if (error) {
              console.log('Error response received');
            }
            //console.log(response.statusCode);
            //console.log(response.body);
            //console.log(response.headers);
          });
        }
        callback(null, true);
      }
    ], function(err, results) {
      console.log('Done');
    });
    parentCallback(null,{
        successfulEmails: successfulEmails,
        errorEmails: errorEmails,
    });
}

export default app

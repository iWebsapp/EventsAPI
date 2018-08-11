const Debug = require('debug')
const config = require('../config')
const usersModel = require('../models/users-model')
const jwt = require('jsonwebtoken')
const helper = require('sendgrid').mail
const auth = require('express-jwt')
const guard = require('express-jwt-permissions')()

const debug = new Debug(`${config.settings.name}:functions:users`)

//function find user email
function findUserByEmail(email){
    let arrayUser = []
    for(var i = 0; i < usersModel.users.length; i ++){
        if(usersModel.users[i].email == email){
            arrayUser.push(usersModel.users[i])
        }
    }
    return arrayUser
}

function findUserByPassword(pass){
  for(var i = 0; i < usersModel.users.length; i ++){
      if(usersModel.users[i].password == pass){
          return true
      }
  }
  return false
}

//note remove passowrd form the token
function createToken(user){
  return jwt.sign({ user }, config.settings.secret, { expiresIn: config.settings.exp })
}

function validToken(user){
  return jwt.sign({ user }, config.settings.secret, { expiresIn: config.settings.exp })
}

//function create new user
export const createUserFunction = ( req, res, next ) => {

}

//funcion login user
export const loginUserFunction = ( req, res, next ) => {
    const { email, password } = req.body
    const secret = config.settings.secret
    const user = findUserByEmail(email)

    if(user.length > 0){

      const valid = findUserByPassword(password)
      if(!valid){
        debug('the passwords do not match')
        return next(new Error('The password do not match'))
      } else {
        const token = createToken(user)
        res.status(200).json({
          message: 'Login success',
          token,
          idUser: user.idUser
        })
      }

    } else {
      debug(`User with email ${email} not found`)
      return next(new Error('user not found'))
    }
}

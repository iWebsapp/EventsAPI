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

//function find user by email
function findUserByEmail(email){
    let arrayUser = []
    for(var i = 0; i < usersModel.users.length; i ++){
        if(usersModel.users[i].email == email){
            arrayUser.push(usersModel.users[i])
        }
    }
    return arrayUser
}

//function find user by passoword
function findUserByPassword(pass){
  for(var i = 0; i < usersModel.users.length; i ++){
      if(usersModel.users[i].password == pass){
          return true
      }
  }
  return false
}

//function create token from user
function createToken(user){
  const newUser = {
    idUser: user.idUser,
    permissions: user.permissions
  }
  return jwt.sign({ newUser }, config.settings.secret, { expiresIn: config.settings.exp })
}

//funcion cromprobate valid token
function validToken(user){
  return jwt.sign({ user }, config.settings.secret, { expiresIn: config.settings.exp })
}

//function create new user
export const createUserFunction = ( req, res, next ) => {
  const { email, password } = req.body
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
        res.status(400).json({ message: "The password do not match" })
      } else {
        const token = createToken(user[0])
        req.message = 'Login success'
        req.token = token
        req.idUser = user.idUser
        next()
      }

    } else {
      debug(`User with email ${email} not found`)
      res.status(404).json({ message: "User not found" })
    }
}

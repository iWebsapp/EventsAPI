'use strict'

const Debug = require("debug")
const config = require("../config")

const debug = new Debug(`${config.settings.name}:users:valid`)

//THIS FUNCTION IS THE ONE IN CHARGE THE HAVE LOGIN
export const loginUserValid = (req, res, next) => {

    const validater = []
    if (!req.body.email) { const v = { fields: 'email', message: 'The email is required' }
      validater.push(v)
    } else {

      if ( !(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(req.body.email) ) ){
        const v = { fields: 'email', message: 'This is not a valid email' }
        validater.push(v)
      }

   }

    if (!req.body.password) { const v = { fields: 'password', message: 'The password is required' }
      validater.push(v)
    } else {

      if (req.body.password.length < 8 ) { const v = { fields: 'password', message: 'The password must have more than 8 characters' }
        validater.push(v)
      }

    }

    if(validater.length == 0){
      next()
    } else {
      return res.status(400).json(validater)
    }

}

//THIS FUNCTION IS THE ONE IN CHARGE THE VAILDATE NEW USER
export const addUserValid = (req, res, next) => {

    const validater = []
    if (req.files.avatar) {
      if (req.files.avatar.type != 'image/jpeg' ) {
        if (req.files.avatar.type != 'image/png' ) { const v = { fields: 'avatar', message: 'The avatar ( png, jpeg )' }
          validater.push(v)
        }
      }
    }

    if (!req.body.email) { const v = { fields: 'email', message: 'The email is required' }
      validater.push(v)
    } else {
      if ( !(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(req.body.email) ) ){
        const v = { fields: 'email', message: 'This is not a valid email' }
        validater.push(v)
      }
    }

    if (!req.body.password) { const v = { fields: 'password', message: 'The password is required' }
      validater.push(v)
    } else {
      if (req.body.password.length < 8 ) { const v = { fields: 'password', message: 'The password must have more than 8 characters' }
        validater.push(v)
      }
    }

    if(validater.length == 0){
      next()
    } else {
      return res.status(400).json(validater)
    }

}

//THIS FUNCTION IS THE ONE IN CHARGE THE VALIDATE ID IS NUMERIC OR REQUIRED
export const idValid = (req, res, next) => {

    const validater = []
    if (!req.params.id) { const v = { fields: 'id', message: 'The id is required' }
      validater.push(v)
    } else {
      if( isNaN(req.params.id) ){
        const v = { fields: 'id', message: 'The id is not a number' }
        validater.push(v)
      }
    }

    if(validater.length == 0){
      next()
    } else {
      debug(validater)
      return res.status(400).json(validater)
    }

}

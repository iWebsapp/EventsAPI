import Debug from 'debug'
import { apiName } from '../config'
import { user } from '../models/user'

const debug = new Debug(apiName + ':users-validate')
const users = user

//THIS FUNCTION IS THE ONE IN CHARGE THE HAVE LOGIN
export const loginValidate = (req, res, next) => {

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
export const addUserValidate = (req, res, next) => {

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

    // if (!req.body.name) { const v = { fields: 'name', message: 'The name is required' }
    //   validater.push(v)
    // }
    //
    // if (!req.body.lastname) { const v = { fields: 'lastname', message: 'The lastname is required' }
    //   validater.push(v)
    // }

    if (!req.body.typeUser) { const v = { fields: 'typeUser', message: 'The typeUser is required' }
      validater.push(v)
    } else {
      if (req.body.typeUser != 'free') {
        if (req.body.typeUser != 'admin') {
            if (req.body.typeUser != 'root') {
                if (req.body.typeUser != 'premium') { const v = { fields: 'typeUser', message: 'The typeUser is: (free, premium, admin or root)' }
                  validater.push(v)
                }
            }
        }
      }
    }

    if(validater.length == 0){
      next()
    } else {
      return res.status(400).json(validater)
    }

}

//THIS FUNCTION IS THE ONE IN CHARGE THE VALIDATE ID IS NUMERIC OR REQUIRED
export const idValidate = (req, res, next) => {

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

//THIS FUNCTION IS THE ONE IN CHARGE THE COMPROBATE IS EMAIL EXIST
export const isExistEmail = (req, res, next) => {

    const isExist = []
    for(var i = 0; i < users.length; i++){
      if (users[i].email == req.body.email) {
        isExist.push(users[i])
      }
    }

    if(isExist.length == 0){
      next()
    } else {
      res.status(201).json({
        message: 'The email already exists'
      })
    }

}

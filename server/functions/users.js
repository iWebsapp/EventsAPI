import Debug from 'debug'
import { secret, apiName } from '../config'
import { user } from '../models/user'
import jwt from 'jsonwebtoken'

const debug = new Debug(apiName + ':auth-meddleware')

const users = user

export const findUserByEmail = e => users.find(({ email }) => email === e)

export const usersMiddleware = (req, res, next) => {
  req.users = users
  next()
}

export const userMiddleware = (req, res, next) => {
  const idU = req.params.id
  users.filter( function(element) {
    if (element.idUser == idU) {
      req.user = element
    }
  })
  next()
}

export const required = ( req, resp, next ) => {
  jwt.verify(req.headers.token, secret, (error, token) => {

    if (error) {
        debug('JWT was not encryped with our secret')
        return resp.status(401).json({
            message: 'Unauthorized',
            error: error
        })
    } else {
        debug(`Token verified ${token}`)
        req.user = token.user
        next()
    }

  })
}

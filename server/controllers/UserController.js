const User = require('../models/User')
const { validationResult } = require('express-validator')
const { checkPassword } = require('../helpers/bcrypt')
const { generateToken } = require ('../helpers/jwt')

class UserController {
  static async register (req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next({ name: 'Validation Errors', errors: errors.errors })
      }

      const { email, password } = req.body

      let userData = await User.create(email, password)
      res.status(201).json({ messages: `User with email ${userData} registered successfully` })

    } catch (err) {
      next (err)
    }
  }

  static async login (req, res, next) {
    try {
      const { email, password } = req.body

      const user = await User.findOne(email)

      if (!user) {
        next ({name: 'Invalid email / password'})
      } else {
        let checkedPassword = checkPassword(password, user.password)
        if (!checkedPassword) {
          next ({name: 'Invalid email / password'})
        } else {
          const payload = {
            id: user.id,
            email: user.email
          }
          const access_token = generateToken (payload)

          res.status(200).json({ access_token, name: user.name })
        }
      }
      
    } catch (err) {
      next(err)
    }
  }
}

module.exports = UserController
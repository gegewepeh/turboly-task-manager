const router = require ('express').Router()
const { body } = require('express-validator')
const UserController = require ('../controllers/UserController')

router.post(
  '/register',
  body('email').isEmail().withMessage('Email format invalid!'), 
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters!'),
  UserController.register
)

router.post ('/login', UserController.login)

module.exports = router
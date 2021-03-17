const { checkToken } = require ('../helpers/jwt')
const User = require ('../models/User')
const Task = require('../models/Task')

async function authenticate (req, res, next) {
  try {
    let decoded = checkToken (req.headers.access_token)

    let currentUser = await User.findOne(decoded.email)

    if (!currentUser) {
      next({ name: 'Not Logged In' })
    } else {
      req.user = {}
      req.user.id = currentUser.id
      req.user.email = currentUser.email
      next()
    }
  } catch (err) {
    next(err)
  }
}

async function authorize (req, res, next) {
  try {
    let currentUser = await User.findOne(req.user.email)

    if (!currentUser) {
      next({ name: 'Not Logged In' })
    } else {
      let targetTask = await Task.findOne(req.params.taskId)
      if (!targetTask) {
        next({ name: 'Not Found' })
      } else if (targetTask.userid !== req.user.id) {
        next({ name: 'Unauthorized' })
      } else if (targetTask.userid === req.user.id) {
        next()
      }
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  authenticate,
  authorize
}
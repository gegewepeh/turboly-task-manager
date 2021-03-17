function errorHandler (err, req, res, next) {
  console.log (err.name, 'errorhandler name')
  console.log (err.message, 'errorhandler message')
  console.log(err, 'errhandler')

  if (err.errors?.length > 0) {
    var validationErrReturn = err.errors.map(err => {
      return { param: err.param, msg: err.msg }
    })
  }

  if (err.message === 'error: duplicate key value violates unique constraint "users_email_key"') {
    err.name = 'Email not available'
  }
  
  switch (err.name) {
    case 'Validation Errors':
      res.status(400).json(validationErrReturn)
      break
    case 'Invalid email / password':
      res.status(400).json({ messages: 'Invalid email / password' })
      break
    case 'Email not available':
      res.status(403).json({ messages: 'Email not available' })
      break
    case 'JsonWebTokenError':
      res.status (403).json({messages: 'Please login first'})
      break
    case 'Not Found':
      res.status(404).json({ errors: 'Not Found' })
      break
    case 'Not Logged In':
      res.status (403).json({messages: 'Please login first'})
      break
    case 'Unauthorized':
      res.status(403).json({ messages: 'Unauthorized Access' })
      break
    default:
      res.status(500).json({ errors: 'Internal Server Error'})
  }
}

module.exports = errorHandler
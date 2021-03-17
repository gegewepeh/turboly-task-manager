if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const express = require('express')
const cors = require ('cors')
const router = require ('./routes/index')
const errorHandler = require ('./middlewares/errorHandler')
const port = process.env.PORT || 4000

const app = express()

app.use (cors ())

app.use (express.json())
app.use (express.urlencoded ({ extended: false }))

app.use ('/', router)

app.use (errorHandler)

app.listen(port, () => {
  console.log(`Turboly Task Manager listening at http://localhost:${port}`)
})
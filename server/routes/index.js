const router = require ('express').Router()
const userRouter = require ('../routes/userRouter')
const taskRouter = require ('../routes/taskRouter')

router.use (userRouter)

router.use (taskRouter)

module.exports = router
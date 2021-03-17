const router = require('express').Router()
const TaskController = require('../controllers/TaskController')
const { body } = require('express-validator')
const { authenticate, authorize } = require('../middlewares/auth')

router.get('/task', authenticate, TaskController.findAllByUserId)

router.post('/task', 
authenticate,
body('title').isLength({ min: 1 }).withMessage('Title required!'),
body('priority').isNumeric().withMessage('Priority required!'),
body('dueDate').isLength({ min: 1 }).withMessage('Due Date required!'),
TaskController.create)

router.patch('/task/:taskId', authenticate, authorize, TaskController.patchStatus)

router.put('/task/:taskId', authenticate, authorize, TaskController.editTask)

router.delete('/task/:taskId', authenticate, authorize, TaskController.delete)

module.exports = router
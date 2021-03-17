const Task = require('../models/Task')

class TaskController {
  static async create (req, res, next) {
    try {   
      const { title, description, priority, dueDate } = req.body
      let task = await Task.create(req.user.id, title, description, priority, dueDate)
      
      res.status(201).json(task)

    } catch (err) {
      next(err)
    }
  }

  static async findAllByUserId (req, res, next) {
    try {
      let tasks = await Task.findAllByUserId(req.user.id)
      
      res.status(200).json(tasks)

    } catch (err) {
      next(err)
    }
  }

  static async patchStatus (req, res, next) {
    try {
      let task = await Task.patchStatus(req.params.taskId, req.body.status)

      if (task === 'Not Found') {
        return next({ name: 'Not Found' })
      }
      res.status(200).json(task)

    } catch (err) {
      next(err)
    }
  }

  static async editTask (req, res, next) {
    try {
      const { title, description, dueDate, status } = req.body

      let tasks = await Task.editTask(req.params.taskId, title, description, dueDate, status)
      if (tasks === 'Not Found') {
        return next({ name: 'Not Found' })
      }
      res.status(200).json(tasks)

    } catch (err) {
      next(err)
    }
  }

  static async delete (req, res, next) {
    try {
      let task = await Task.delete(req.params.taskId)

      if (task === 'Not Found') {
        return next({ name: 'Not Found' })
      }

      res.status(200).json({ messages: task })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = TaskController
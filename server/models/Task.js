const db = require('../config/dbConnect')
const convertDate = require('../helpers/convertDate')

class Task {
  constructor (id, title, description, priority, status, dueDate, createdAt, updatedAt) {
    this.id = id
    this.title = title
    this.description = description
    this.priority = priority
    this.status = status
    this.dueDate = dueDate
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  static async create (userId, title, description, priority, dueDate) {
    try {
      let status = false
      let createdAt = new Date ()
      let updatedAt = new Date ()    

      const createTaskQuery = `
      INSERT INTO tasks (userid, title, description, priority, status, "dueDate", "createdAt", "updatedAt")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
      ;`
      const values = [userId, title, description, priority, status, dueDate, createdAt, updatedAt]

      const data = await db.query(createTaskQuery, values)
      const createdTask = data.rows[0]
      return createdTask

    } catch (err) {
      console.log(err, 'err createTaskQuery')
      throw new Error(err)
    }
  }

  static async findAllByUserId (userId) {
    try {
      // include users data
      // const findAllTaskByUserIdQuery = `
      // SELECT tasks.id, tasks.userid, tasks.title, tasks.description, tasks.priority, tasks.status, tasks.dueDate, users.email FROM tasks
      // INNER JOIN users
      //   ON users.id = tasks.userid
      // ;`
      const findAllTaskByUserIdQuery = `
      SELECT * FROM tasks
      WHERE userid = ${userId}
      ;`

      const data = await db.query(findAllTaskByUserIdQuery)
      const tasksData = data.rows
      const instTaskData = tasksData.map(task => {
        return new Task (task.id, task.title, task.description, task.priority, task.status, task.dueDate, task.createdAt, task.updatedAt)
      })
      return instTaskData

    } catch (err) {
      console.log(err, 'findAllTaskByUserIdQuery')
      throw new Error(err)
    }
  }

  static async findOne (taskId) {
    try {
      const findOneTaskQuery = `
      SELECT * FROM tasks
      WHERE id = ${taskId}
      ;`

      const data = await db.query(findOneTaskQuery)
      if (data.rows.length > 0) {
        const taskFound = data.rows[0]
        return taskFound
      } else {
        return null
      }

    } catch (err) {
      console.log(err, 'findAllTaskByUserIdQuery')
      throw new Error(err)
    }
  }

  static async patchStatus (taskId, status) {
    try {
      let newStatus = true
      if (status === 'false') {
        newStatus = false
      }

      let updatedAt = new Date ()
      updatedAt = convertDate(updatedAt)

      const patchStatusQuery = `
      UPDATE tasks
      SET status = ${newStatus},
          "updatedAt" = '${updatedAt}'
      WHERE id = ${taskId}
      RETURNING id, status
      ;`

      const data = await db.query(patchStatusQuery)
      const patched = data.rowCount
      if (patched > 0) {
        const patchedTaskId = data.rows[0].id
        const patchedTaskStatus = data.rows[0].status
        return { id: patchedTaskId, status: patchedTaskStatus }
      } else {
        return 'Not Found'
      }
    
    } catch (err) {
      console.log(err, 'patchStatusQuery')
      throw new Error(err)
    }
  }

  static async editTask (taskId, title, description, dueDate, status) {
    try {
      let newStatus = true
      if (status === 'false') {
        newStatus = false
      }

      let updatedAt = new Date ()
      updatedAt = convertDate(updatedAt)

      const editTaskQuery = `
      UPDATE tasks
      SET title = '${title}',
          description = '${description}',
          "dueDate" = '${dueDate}',
          status = ${newStatus},
          "updatedAt" = '${updatedAt}'
      WHERE id = ${taskId}
      RETURNING *
      ;`

      const data = await db.query(editTaskQuery)
      const editedData = data.rows[0]
      const edited = data.rowCount
      if (edited > 0) {
        return editedData
      } else {
        return 'Not Found'
      }
    } catch (err) {
      console.log(err, 'editTaskQuery')
      throw new Error(err)
    }
  }

  static async delete (taskId) {
    try {
      const deleteTaskQuery = `
      DELETE FROM tasks
      WHERE id = ${taskId}
      ;`

      const data = await db.query(deleteTaskQuery)
      const deleted = data.rowCount
      if (deleted > 0) {
        return 'Task Deleted'
      } else {
        return 'Not Found'
      }

    } catch (err) {
      console.log(err, 'deleteTaskQuery')
      throw new Error(err)
    }
  }
}

module.exports = Task
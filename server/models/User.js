const db = require('../config/dbConnect')
const { hashPassword } = require('../helpers/bcrypt')

class User {
  constructor (id, email, password, createdAt) {
    this.id = id
    this.email = email
    this.password = password
    this.createdAt = createdAt
  }

  static async create (email, password) {
    try {
      password = hashPassword(password)
      let createdAt = new Date()
      const createUserQuery = `
      INSERT INTO users (email, password, "createdAt")
      VALUES ($1, $2, $3)
      RETURNING email
      ;`
      const values = [email, password, createdAt]

      let data = await db.query(createUserQuery, values)
      let registeredEmail = data.rows[0].email
      return registeredEmail

    } catch (err) {
      console.log(err, 'err createUserQuery')
      throw new Error(err)
    }
  }

  static async findOne (email) {
    try {
      const findOneUserQuery = `
      SELECT id, email, password FROM users
      WHERE email = '${email}'
      `

      let data = await db.query(findOneUserQuery)
      let userData = data.rows[0]
      return userData

    } catch (err) {
      console.log(err, 'err')
      throw new Error(err)
    }
  }
}

module.exports = User
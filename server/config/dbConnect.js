const { Pool} = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'turbolyTaskManager',
  password: 'postgresadmiN',
  port: 5432,
})

module.exports = pool

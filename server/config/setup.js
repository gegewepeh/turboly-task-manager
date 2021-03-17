const db = require ('./dbConnect')

const dropUsersTableQuery = `DROP TABLE IF EXISTS users;`
const dropTasksTableQuery = `DROP TABLE IF EXISTS tasks;`

const createUsersTableQuery = `
CREATE TABLE IF NOT EXISTS users (
  "id" SERIAL PRIMARY KEY,
  "email" VARCHAR NOT NULL UNIQUE,
  "password" VARCHAR NOT NULL,
  "createdAt" DATE NOT NULL
);`

const createTasksTableQuery = `
CREATE TABLE IF NOT EXISTS tasks (
  "id" INT GENERATED ALWAYS AS IDENTITY UNIQUE,
  "userid" INT NOT NULL,
  "title" VARCHAR NOT NULL,
  "description" VARCHAR,
  "priority" INT NOT NULL,
  "status" BOOLEAN NOT NULL,
  "dueDate" DATE NOT NULL,
  "createdAt" DATE NOT NULL,
  "updatedAt" DATE NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_user
    FOREIGN KEY ("userid")
      REFERENCES users ("id")
);`


async function setupUsersTable (createUsersTableQuery) {
  new Promise ((resolve, reject) => {
    db.query (createUsersTableQuery)
      .then(res => {
        console.log(res, 'user table created')
        resolve(res)
      })
      .catch(err => {
        console.log(err, 'err setupUsersTable')
        reject(err)
      })
  })
}

async function setupTaskTable (createTasksTableQuery) {
  new Promise ((resolve, reject) => {
    db.query (createTasksTableQuery)
      .then(res => {
        console.log(res, 'tasks table created')
        resolve(res)
      })
      .catch(err => {
        console.log(err, 'err setupTaskTable')
        reject(err)
      })
  })
}

function dropUsersTable (dropUsersTableQuery) {
  db.query (dropUsersTableQuery)
    .then(res => {
      console.log(res, 'users table dropped')
    })
    .catch(err => {
      console.log(err, 'err dropUsersTable')
    })
}

function dropTasksTable (dropTasksTableQuery) {
  db.query (dropTasksTableQuery)
    .then(res => {
      console.log(res, 'tasks table dropped')
    })
    .catch(err => {
      console.log(err, 'err dropTasksTable')
    })
}

async function setupTable () {
  try  {
    await setupUsersTable(createUsersTableQuery)
    await setupTaskTable(createTasksTableQuery)

  } catch (err) {
    console.log(err, 'err setupTable')
  }
}


// dropUsersTable(dropUsersTableQuery)
// dropTasksTable(dropTasksTableQuery)

setupTable()

module.exports = {
  createUsersTableQuery,
  setupUsersTable,
  createTasksTableQuery,
  setupTaskTable,
}
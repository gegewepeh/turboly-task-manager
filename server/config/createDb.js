const pgtools = require('pgtools')

const config = {
  user: 'postgres',
  password: 'postgresadmiN',
  port: 5432,
  host: 'localhost'
}

// pgtools.dropdb(config, "turbolyTaskManager", function (err, res) {
//   if (err) {
//     console.error(err);
//     process.exit(-1);
//   }
//   console.log(res);
// })

pgtools.createdb(config, "turbolyTaskManager", function (err, res) {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
  console.log(res);
})

// initialize ghost
var ghost = require('./core');
ghost();


// inject an admin user from environment variables
var api = require('./core/server/api');
api.users.add({
  name: process.env.user_name,
  email: process.env.user_email,
  password: process.env.user_password
}).then(function (user) {
  console.log('added user');
  console.log(user);
  process.exit(0);
}).otherwise( function (err) {
  console.log(err);
  process.exit(-1);
});

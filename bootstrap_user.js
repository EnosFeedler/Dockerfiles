var api = require('./core/server/api');

// inject an admin user from environment variables
api.users.add({
  name: process.env.user_name,
  email: process.env.user_email,
  password: process.env.user_password
});

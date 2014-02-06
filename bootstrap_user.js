
// initialize ghost
var ghost = require('./core');
ghost();

setTimeout(function () {

  // inject an admin user from environment variables
  var api = require('./core/server/api');
  var config = require('./core/server/config');
  var mailer = require('./core/server/mail');
  api.users.add({
    name: process.env.user_name,
    email: process.env.user_email,
    password: process.env.user_password
  }).then(function (user) {
    console.log('added user');
    console.log(user);

    api.settings.edit('email', process.env.user_email).then(function () {
      var message = {
          to: process.env.user_email,
          subject: 'Your New Ghost Blog',
          html: '<p><strong>Hello!</strong></p>' +
                '<p>Good news! You\'ve successfully created a brand new Ghost blog over on ' + config().url + '</p>' +
                '<p>You can log in to your admin account with the following details:</p>' +
                '<p> Email Address: ' + process.env.user_email + '<br>' +
                'Password: The password you chose when you signed up</p>' +
                '<p>Keep this email somewhere safe for future reference, and have fun!</p>' +
                '<p>xoxo</p>' +
                '<p>Team Ghost<br>' +
                '<a href="https://ghost.org">https://ghost.org</a></p>'
      };
      mailer.send(message).then(function () {
        console.log('message sent!!!');
        process.exit(0);
      }).otherwise(function (err) {
        console.log(err);
        process.exit(-1);
      });
    }).otherwise( function (err) {
      console.log(err);
      process.exit(-1);
    });
  }).otherwise( function (err) {
    console.log(err);
    process.exit(-1);
  });

}, 5000);


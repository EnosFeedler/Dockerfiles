// generate config.js from enviornment variables here

var fs = require('fs');
var path = require('path');

var config = {
  production: {
    url: 'http://' + process.env.public_hostname,
    mail: {
      transport: 'SMTP',
      options: {
        service: 'Mailgun',
        auth: {
          user: process.env.mailgun_username,
          pass: process.env.mailgun_password
        }
      }
    },
    database: {
      client: 'sqlite3',
      connection: {
        filename: path.join(__dirname, '/content/data/ghost.db')
      },
      debug: false
    },
    server: { 
      host: '0.0.0.0',
      port: '2369'
    }
  }
};

var config_src = 'module.exports = ' + JSON.stringify(config) + ';';

fs.writeFile(__dirname + '/config.js', config_src, 'utf8', function (err) {
  console.log(err);
});

/* jshint node: true */

var auth = require('http-auth');


module.exports = function() {
  /*
   * staging should mimic production
   */

  var production = require('./production');
  production.apply(this);


  /*
   * staging specific configurations
   */

  var app = this;
  var basicAuth = auth.basic({
    realm: 'Authorized Only',
  }, function(username, password, callback) {
    callback(process.env.BASICAUTH_NAME == username && process.env.BASICAUTH_PASS == password);
  });

  app
    .middlewares()
    .prepend([
      {name: 'basic-auth', cb: auth.connect(basicAuth)}
    ]);
};


/* jshint node: true */


module.exports = function() {
  /*
   * load development environment
   */
  var environment = require('./development');
  environment.apply(this);


  /*
   * test configuration
   */

  var app = this;

  app
    .middlewares()
    .remove('livereload')
    .remove('logger');
};


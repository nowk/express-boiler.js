/* jshint node: true */

var morgan = require('morgan');


module.exports = function() {
  var app = this;

  app
    .middlewares()
    .before('routes', {name: 'logger', cb: morgan({format: 'dev', immediate: true})});
};


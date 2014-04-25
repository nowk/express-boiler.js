/* jshint node: true */

var compress = require('compression');


module.exports = function() {
  var app = this;

  app
    .middlewares()
    .prepend([
      {name: 'compress', cb: compress()}
    ]);
};


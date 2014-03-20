/* jshint laxcomma: true, node: true */


exports.draw = function() {
  var app = this;
  app.resources('/', require('../app/controllers/default'));
};


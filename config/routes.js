/* jshint laxcomma: true, node: true */


exports.draw = function() {
  var app = this;

  // root last
  app.get('/', require('../app/controllers/default'));
};


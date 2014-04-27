/* jshint laxcomma: true, node: true */


exports.draw = function() {
  var app = this;


  // root last
  app.resource('/', require('../app/controllers/default'));
};


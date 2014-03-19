/* jshint laxcomma: true, node: true */

exports.draw = function() {
  this.resource('/', require('../app/controllers/default'));
};


/* jshint laxcomma: true, node: true */

var mongoose = require('mongoose');


/*
 * Expose mongoose.connect
 */

module.exports = mongoose;


/*
 * connected
 */

mongoose.connection.once('connected', function() {
  console.log('connected to mongodb...');
});


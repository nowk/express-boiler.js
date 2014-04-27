/* jshint laxcomma: true, node: true */

var app = require('./config/application');
var db = require('./config/database');

var PORT = app.get('port');
var databaseUrl = app.get('databaseUrl');


/*
 * Start express
 */

app.listen(PORT, function() {
  console.log('App started on port: '+PORT);
});


/*
 * Connect to database
 */

if (databaseUrl) {
  db.connect(databaseUrl);
}



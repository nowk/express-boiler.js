/* jshint laxcomma: true, node: true */

var express = require('express');
var Resourceful = require('express-resourceful.js');
var sass = require('node-sass');

var app = express();
var Conf = require('./conf');
var Routes = require('./routes');
var Csrf = require('../lib/csrf');

var sassMiddleware = sass.middleware({
  src: __dirname + '/../app/assets',
  dest: __dirname + '/../public',
  // force: true,
  // debug: true
});


/*
 * Expose app
 */

module.exports = exports = app;


/*
 * Configure
 */

app.configure(function() {
  app.set('port', process.env.PORT||1337);
  app.set('views', __dirname+'/../app/views');
  app.set('view engine', 'jade');

  app.use(express.compress());
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(express.cookieParser('secret'));
  app.use(express.session({secret: 'ahugesecret'}));
  app.use(Csrf.csrf());
  app.use(function(req, res, next) {
    res.locals.csrfToken = req.csrfToken();
    next();
  });
  app.use(app.router);
  app.use(sassMiddleware);
  app.use('/build', express.static(__dirname + '/../build')); // component.js build folder
  app.use(express.static(__dirname+'/../public'));
});


/*
 * Environment Configure
 */

var environment = process.env.NODE_ENV || 'development';
var enviroments = ['all', environment];

if (environment in Conf) {
  enviroments.map(configure.bind(app));
} else {
  process.on('exit', function() {
    console.log('No configuration for enviroment: "'+environment+'"');
  });
  process.exit();
}

function configure(env) {
  var conf = Conf[env];
  var middlewares = conf.middlewares;
  var locals = conf.locals;

  this.configure(environment, function() {
    this.set('databaseUrl', conf.databaseUrl);
    this.locals(locals || {});
    for(var i=0; i<middlewares.length; i++) {
      this.use(middlewares[i]);
    }
  });
}


/*
 * Routes
 */

Routes.draw.call(app);


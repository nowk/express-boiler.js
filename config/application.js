/* jshint laxcomma: true, node: true */

var express = require('express')
  , Resourceful = require('express-resourceful.js')
  , sass = require('node-sass');

var app = express()
  , Conf = require('./conf')
  , Routes = require('./routes')
  , sassMiddleware = sass.middleware({
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

  app.use(express.cookieParser('secret'));
  app.use(express.session({secret: 'ahugesecret'}));
  app.use(express.compress());
  app.use(express.methodOverride());
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(app.router);
  app.use(express.csrf());
  app.use(sassMiddleware);
  app.use('/build', express.static(__dirname + '/../build')); // component.js build folder
  app.use(express.static(__dirname+'/../public'));
});


/*
 * Environment Configure
 */

var environment = process.env.NODE_ENV || 'development'
  , enviroments = ['all', environment];

if (environment in Conf) {
  enviroments.map(configure.bind(app));
} else {
  process.on('exit', function() {
    console.log('No configuration for enviroment: "'+environment+'"');
  });
  process.exit();
}

function configure(env) {
  var conf = Conf[env]
    , middlewares = conf.middlewares
    , locals = conf.locals;

  this.configure(environment, function() {
    this.set('databaseUrl', conf.databaseUrl);
    this.locals(locals || {});
    for(var key in middlewares) {
      if (middlewares.hasOwnProperty(key)) {
        this.use(middlewares[key]);
      }
    }
  });
}


/*
 * Routes
 */

Routes.draw.call(app);


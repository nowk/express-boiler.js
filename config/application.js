/* jshint laxcomma: true, node: true */

var express = require('express')
  , Resource = require('express-resource')
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
  app.use(sassMiddleware);
  app.use('/build', express.static(__dirname + '/../build')); // component.js build folder
  app.use(express.static(__dirname+'/../public'));
  app.use(express.csrf());
});


/*
 * Environment Configure
 */

var environments = ['development', 'test', 'staging', 'production'];
environments.map(configure);

function configure(environment) {
  var conf = Conf[environment]
    , middlewares = conf.middlewares;

  app.configure(environment, function() {
    app.set('databaseUrl', conf.databaseUrl);

    for(var key in middlewares) {
      if (middlewares.hasOwnProperty(key)) {
        app.use(middlewares[key]);
      }
    }
  });
}


/*
 * Routes
 */

Routes.draw.call(app);


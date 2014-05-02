/* jshint node: true */

var express = require('express');

var MiddleEarth = require('middle-earth');
var Resourceful = require('express-resourceful.js');

var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var Csrf = require('../lib/csrf');
var erros = require('../lib/erros');


/*
 * route configuration
 */

var Routes = require('./routes');


/*
 * app + expose
 */

var app = module.exports = express();


/*
 * Configure
 */

app.set('port', (process.env.PORT || 1337));
app.set('views', __dirname+'/../app/views');
app.set('view engine', 'jade');

app
  .middlewares([
    {name: 'body-parser', cb: bodyParser()},
    {name: 'method-override', cb: methodOverride()},
    {name: 'cookie-parser', cb: cookieParser('secret')},
    {name: 'session', cb: session({secret: 'secret', key: 'sid', cookie: {secure: true}})},
    {name: 'csrf', cb: Csrf.csrf()},
    {name: 'csrf-local-token', cb: Csrf.localToken()},
    {name: 'static', cb: express.static(__dirname+'/../public')},
    {name: 'error-handler', cb: erros.handler({views: __dirname+'/app/views'})}
  ])
  .before('static', {name: 'routes', fn: Routes.draw.bind(app)});


/*
 * env configuration
 */

var environment = require('./environment');
environment.apply(app);


/*
 * finish
 */

app
  .middlewares()
  .finish();


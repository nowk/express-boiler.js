/* jshint laxcomma: true, node: true */

var express = require('express');
var errorHandler = require('../lib/middlewares/error_handler');


/*
 * Enviroment configurations
 */

module.exports = {
  all: {
    middlewares: [],
    locals: {}
  },
  development: {
    databaseUrl: null,
    middlewares: [
      function(req, res, next) {
        next();
      },
      errorHandler
    ],
    locals: {}
  },
  test: {
    databaseUrl: null,
    middlewares: [],
    locals: {}
  },
  staging: {
    databaseUrl: null,
    middlewares: [
      express.basicAuth(process.env.BASICAUTH_LOGIN, process.env.BASICAUTH_PASSWD),
      errorHandler
    ],
    locals: {}
  },
  production: {
    databaseUrl: null,
    middlewares: [
      errorHandler
    ],
    locals: {}
  }
};


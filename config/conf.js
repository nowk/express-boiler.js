/* jshint laxcomma: true, node: true */

var express = require('express');
var errorHandler = require('../lib/middlewares/error_handler');


/*
 * Enviroment configurations
 */

module.exports = {
  all: {
    middlewares: [
      errorHandler
    ],
    locals: {}
  },
  development: {
    databaseUrl: null,
    middlewares: [
      function(req, res, next) {
        next();
      }
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
      express.basicAuth(process.env.BASICAUTH_LOGIN, process.env.BASICAUTH_PASSWD)
    ],
    locals: {}
  },
  production: {
    databaseUrl: null,
    middlewares: [],
    locals: {}
  }
};


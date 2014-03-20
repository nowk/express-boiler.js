/* jshint laxcomma: true, node: true */

var express = require('express');


/*
 * Enviroment configurations
 */

module.exports = {
  all: {
    middlewares: {},
    locals: {}
  },
  development: {
    databaseUrl: null,
    middlewares: {
      justNext: function(req, res, next) {
        next();
      }
    },
    locals: {}
  },
  test: {
    databaseUrl: null,
    middlewares: {},
    locals: {}
  },
  staging: {
    databaseUrl: null,
    middlewares: {
      basicAuth: express.basicAuth(process.env.BASICAUTH_LOGIN, process.env.BASICAUTH_PASSWD)
    },
    locals: {}
  },
  production: {
    databaseUrl: null,
    middlewares: {},
    locals: {}
  }
};


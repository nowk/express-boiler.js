/* jshint laxcomma: true, node: true */

var express = require('express');


module.exports = {
  development: {
    databaseUrl: null,
    middlewares: {
      justNext: function(req, res, next) {
        next();
      }
    }
  },
  test: {
    databaseUrl: null
  },
  staging: {
    databaseUrl: null,
    middlewares: {
      basicAuth: express.basicAuth(process.env.BASICAUTH_LOGIN, process.env.BASICAUTH_PASSWD)
    }
  },
  production: {
    databaseUrl: null
  }
};


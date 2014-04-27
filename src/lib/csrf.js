/* jshint node: true */

var csrf = require('csurf');


/*
 * expose csrf
 */

exports.csrf = csrf;


/*
 * save token to locals
 */

exports.localToken = function() {
  return function(req, res, next) {
    res.locals.csrfToken = req.csrfToken();
    next();
  };
};


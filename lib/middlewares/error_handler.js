/* jshint node: true */

/*
 * error handler
 */

module.exports = function(err, req, res, next) {
  res.render('500');
};


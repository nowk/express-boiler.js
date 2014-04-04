/* jshint node: true */

/*
 * error handler
 */

module.exports = function(err, req, res, next) {
  // output to console
  console.error(err.stack);

  if (['production', 'staging'].indexOf(process.env.NODE_ENV) >= 0) {
    res.statusCode = 500;
    return res.render('500');
  }

  res.send(err.stack, 500);
};


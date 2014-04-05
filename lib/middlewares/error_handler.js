/* jshint node: true */

/*
 * error handler
 */

module.exports = function(err, req, res, next) {
  if (process.env.NODE_ENV !== 'test') {
    console.error(err.stack); // output to console
  }

  var statusCode = parseInt(err.message);

  if (isNaN(statusCode)) {
    res.statusCode = 500;
  } else {
    res.statusCode = statusCode;
  }

  return res.render(statusCode.toString());
};


/* jshint node: true */

process.env.NODE_ENV = 'test';

var path = require('path');


/*
 * clear require cache
 *
 * in most test this needs to be run before and after for it to work within test suites
 */

exports.requireReset = function(_path) {
  // try {
    var resolvedPath = path.resolve(__dirname, _path);
    delete require.cache[resolvedPath];
    // delete require.cache[require.resolve('')];
  // } catch(e) {
  //   if ('MODULE_NOT_FOUND' != e.code) {
  //     throw e;
  //   }
  // }
};


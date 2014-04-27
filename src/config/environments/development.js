/* jshint node: true */

var path = require('path');
var express = require('express');
var morgan = require('morgan');
var lessMiddleware = require('less-middleware');
var livereload = require('connect-livereload');


module.exports = function() {
  var app = this;

  // assets-js and assets-css are for development, all js, css (less) will be compiled
  // through `grunt build` during deployment

  /*
   * less middleware
   */

  var csscache = path.resolve(__dirname, '../../css-cache');
  var less = lessMiddleware(path.resolve(__dirname, '../../app/assets'),
    {
      dest: csscache,
      debug: true,
      force: true
    });


  /*
   * both these static references should load before static, this way these are hit before
   * the commited css/js files that come from `grunt build`
   */

  var assetsjs = express.static(path.resolve(__dirname, '../../app/assets/javascripts'));
  var assetscss = express.static(path.join(csscache, 'stylesheets'));

  app
    .middlewares()
    .before('routes', {name: 'livereload', cb: livereload()})
    .before('routes', {name: 'logger', cb: morgan({format: 'dev', immediate: true})})
    .before('static', {name: 'assets-js', cb: assetsjs, path: '/javascripts'})
    .after('assets-js', {name: 'less', cb: less})
    .after('less', {name: 'assets-css', cb: assetscss, path: '/stylesheets'});
};


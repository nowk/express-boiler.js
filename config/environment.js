/* jshint node: true */


module.exports = function() {
  var node_env = (process.env.NODE_ENV || 'development');
  var app = this;

  /*
   * all environment configurations
   */

  //...


  /*
   * load environment specific configuration
   */

  require('./environments/'+node_env)
    .apply(app);
};


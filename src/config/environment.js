/* jshint node: true */



module.exports = function() {
  var node_env = (process.env.NODE_ENV || 'development');
  var app = this;

  /*
   * all environment configurations
   */

  var conf = require('./conf')[node_env];
  app.set('databaseUrl', conf.databaseUrl);


  /*
   * load environment specific configuration
   */

  require('./environments/'+node_env)
    .apply(app);
};


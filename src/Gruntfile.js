
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      production: {
        options: {
          paths: ['app/assets/stylesheets'],
          compress: true
        },
        files: [{
          expand: true,
          cwd: 'app/assets/stylesheets',
          src: ['*.less'],
          dest: 'public/stylesheets',
          ext: '.css'
        }]
      }
    },
    uglify: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/assets/javascripts',
          src: ['**/*.js'],
          dest: 'public/javascripts'
        }]
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'app/**/*.js', 'config/**/*.js', 'lib/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    express: {
      options: {
        port: 1337
      },
      development: {
        options: {
          script: 'index.js',
          node_env: 'development'
        }
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },
    watch: {
      express: {
        files: [
          'Gruntfile.js',
          'package.json',
          'config/**/*js',
          'lib/**/*js',
          'app/models/**/*js',
          'app/controllers/**/*js',
         ],
        tasks: ['express:development'],
        options: {
          spawn: false
        }
      },
      css: {
        files: 'app/assets/stylesheets/**/*.less',
        options: {
          livereload: true
        }
      },
      js: {
        files: 'app/assets/javascripts/**/*.js',
        options: {
          livereload: true
        }
      },
      views: {
        files: 'app/views/**/*.jade',
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-mocha-test');


  /*
   * TODO mochaTests whould run under "real life" conditions, so development
   * assets-js/css middlewares need to be removed so we can use the uglified and lessed
   * versions that were produced in the build task
   */

  grunt.registerTask('build', ['jshint', 'uglify', 'less', 'mochaTest']);
  grunt.registerTask("devs", ['express:development', 'watch']);
};


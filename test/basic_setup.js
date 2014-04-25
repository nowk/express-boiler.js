/* jshint node: true */

var t = require('./test_helper');
var assert = require('chai').assert;
var request = require('supertest');

var app = require('../config/application');


describe("basic setup", function() {
  it("includes thes csrf middleware + local token assignment", function(done) {
    app.get("/test/for/csrf", function(req, res, next) {
      res.send({csrfToken: res.locals.csrfToken});
    });

    request(app)
      .get("/test/for/csrf")
      .expect(200)
      .end(function(err, res) {
        assert.isDefined(res.body.csrfToken);
        done();
      });
  });

  it("includes body-parser", function(done) {
    app.get("/test/for/body-parser", function(req, res, next) {
      res.send(req.body);
    });

    request(app)
      .get("/test/for/body-parser")
      .send({foo: 'bar'})
      .expect(200, {foo: 'bar'})
      .end(done, done);
  });

  it("includes express-resourceful", function(done) {
    app.resources("/test/for/express-resourceful", {
      new: function(req, res, next) {
        res.send({"express-resourceful": true});
      }
    });

    request(app)
      .get("/test/for/express-resourceful/new")
      .expect(200, {"express-resourceful": true})
      .end(done, done);
  });

  it.skip("includes error-handler", function(done) {
    app.get("/test/for/404", function(req, res, next) {
      console.log('foo');
      return next(new Error('500'));
    });

    request(app)
      .get("/test/for/404")
      .expect(404, 'Page Not Found')
      .end(done, done);
  });
});


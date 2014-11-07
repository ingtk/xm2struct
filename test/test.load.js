/* global describe, it */
'use strict';

var expect = require('expect.js');

var load = require('../lib/load');

describe('#load', function() {

  it('should load', function(done) {
    load('./test/fixtures/xml/test1.xml', function(err, result) {
      if (err) {
        return done(err);
      }
      expect(result).to.an('object');
      done();
    });
  });

  it('should be error due to invalid path', function(done) {
    load('./hoge.xml', function(err) {
      expect(err).to.be.ok();
      done();
    });
  });
});


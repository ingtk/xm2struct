/* global describe, it */
'use strict';

var expect = require('expect.js');

var load = require('../lib/load');
var struct = require('../lib/struct');

describe('#struct', function() {

  it('should convert', function(done) {
    load('./test/fixtures/xml/test1.xml', function(err, result) {
      if (err) {
        return done(err);
      }
      struct.analyse(result);
      var res = struct.generate();
      expect(res).to.be('type Result struct {\n\tEmail Email `xml:"email"`\n\tName string `xml:"name"`\n\tAddress string `xml:"address"`\n}\ntype Email struct {\n\tAddr string `xml:"addr"`\n}\n');
      done();
    });
  });
});


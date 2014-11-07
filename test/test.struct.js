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
      var structs = [
        'type Result struct {\n\tEmail Email `xml:"email"`\n\tName string `xml:"name"`\n\tAddress string `xml:"address"`\n}',
        'type Email struct {\n\tAddr string `xml:"addr"`\n}'
      ];
      var checkIndex = 0;
      var _consoleLog =console.log;
      console.log = function(str) {
        expect(str).to.be(structs[checkIndex]);
        checkIndex ++;
      };
      struct.analyse(result);
      struct.generate();
      console.log = _consoleLog;
      done();
    });
  });
});


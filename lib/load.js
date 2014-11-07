'use strict';

var fs = require('fs');
var xml2js = require('xml2js');

module.exports = function(filename, callback) {
  fs.readFile(require('path').resolve(filename), function(err, data) {
    if (err) {
      return callback(err);
    }
    var parser = new xml2js.Parser();
    parser.parseString(data, callback);
  });
};

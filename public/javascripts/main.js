'use strict';

var xml2js = require('xml2js');
var parser = new xml2js.Parser();

var struct = require('../../lib/struct.js');

$(function() {
  $('#convert-btn').click(function() {
    console.log($('#xml').val());
    parser.parseString($('#xml').val(), function(err, data) {
      if (err) {
        return err;
      }
      struct.clear();
      struct.analyse(data);
      var result = struct.generate();
      $('#result').val(result);
      var match = result.match(/\n/g);
      var maxRows = 15;
      var rows = match.length;
      rows = (rows > maxRows) ? maxRows: rows;
      $('#result').attr({ rows: match.length });
    });
  });
});


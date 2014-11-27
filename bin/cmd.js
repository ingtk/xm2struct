#!/usr/bin/env node
'use strict';

var program = require('commander');

program
  .version('0.1.0')
  .option('-i, --infile [infile]', 'Read XML from this file.')
  .option('-o, --outfile [outfile]', 'Write go struct to this file. If unspecified, prints to stdout.')
  .parse(process.argv);

var fs = require('fs');
var struct = require('../lib/struct');
var load = require('../lib/load');

load(program.infile, function(err, result) {
  if (err) {
    return console.error(err);
  }
  struct.analyse(result);

  var generated = struct.generate();
  if (program.outfile) {
    fs.writeFile(require('path').resolve(program.outfile), generated, function(err) {
      if (err) {
        return console.error(err);
      }
      console.log('Generated !!');

    });
  } else {
    console.log(generated);
  }
});

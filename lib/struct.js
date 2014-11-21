#!/usr/bin/env node
'use strict';

var _ = require('lodash');

var StructInfo = function(structName) {
  this.structName = structName;
  this.list = [];
};

var structList = [];

var generator = function(struct) {
  var str = 'type ' + struct.structName + ' struct {\n';
  _.each(struct.list, function(v) {
    str += '\t' + v + '\n';
  });
  str += '}\n';
  return str;
};

var capitalize = function(str) {
  return str.replace(/^[a-z]/g, function(match) {
    return match.toUpperCase();
  });
};

exports.clear = function() {
  structList = [];
};

exports.analyse = function analyser(obj) {

  var elementList = [];
  _.each(obj, function(v, k) {
    if (k === '$') {
      _.each(v, function(v, k) {
        elementList.push(capitalize(k) + ' string `xml:\"' + k + ',attr\"`');
      });
    } else {
      var info;
      var name = capitalize(k);
      if (_.isPlainObject(v)) {
        info = new StructInfo(name);
        info.list = analyser(v);
        structList.push(info);
      } else if (_.isArray(v)) {
        var element = name + " ";
        if (v.length > 2) {
          element += "[]";
        }
        if (_.isPlainObject(v[0])) {
          info = new StructInfo(name);
          info.list = analyser(v[0]);
          element += name;
          structList.push(info);
        } else if(_.isString(v[0])) {
          element += "string";
        }
        element += ' `xml:\"' + k + '\"`';
        elementList.push(element);
      }
    }
  });
  return elementList;
};

exports.generate = function() {
  return _.reduceRight(structList, function(result, v) {
    return (result + generator(v));
  }, '');
};

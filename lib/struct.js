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
  str += '}';
  console.log(str);
};

exports.analyse = function analyser(obj) {

  var elementList = [];
  _.each(obj, function(v, k) {
    if (k === '$') {
      // TODO attribute
      //console.log('@@@ ' + v + ' @@@');
    } else {
      var info;
      var name = k.replace(/^[a-z]/g, function(match) {
        return match.toUpperCase();
      });
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
  _.eachRight(structList, generator);
};

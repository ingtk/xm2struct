'use strict';

var gulp = require('gulp');
var server = require('gulp-express');

gulp.task('server', function () {

  //start the server at the beginning of the task
  server.run({
    args: ['app.js', '-c', './config/development.js']
  });

  //restart the server when file changes
  gulp.watch(['app.js', 'routes/**/*.js'], [server.run]);

});

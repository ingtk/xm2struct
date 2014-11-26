'use strict';

var gulp = require('gulp');
var server = require('gulp-express');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('server', function () {
  //start the server at the beginning of the task
  server.run({
    args: ['app.js', '-c', './config/development.js']
  });

  //restart the server when file changes
  gulp.watch(['app.js', 'routes/**/*.js'], [server.run]);
});

gulp.task('script', function () {
  return browserify('./public/javascripts/main.js')
    .bundle()
    //Pass desired output filename to vinyl-source-stream
    .pipe(source('bundle.js'))
    // Start piping stream to tasks!
    .pipe(gulp.dest('./public/javascripts'));
});

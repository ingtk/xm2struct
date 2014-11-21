'use strict';

var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var debug = require('debug');

var routes = require('./routes/index');

var app = module.exports.app = exports.app = express();
if (app.get('env') === 'development') {
  app.use(require('connect-livereload')());
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + app.get('port'));
});

var io = require('socket.io')(server);
var struct = require('./lib/struct');

var xml2js = require('xml2js');

io.on('connection', function (socket) {
  socket.on('convert', function (data) {
    var parser = new xml2js.Parser();
    parser.parseString(data.xml, function(err, data) {
      if (err) {
        return socket.emit('result', { err: err });
      }
      struct.clear();
      struct.analyse(data);
      var result = struct.generate();
      socket.emit('result', { result: result });
    });
  });
});

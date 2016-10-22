var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var config = require('./libs/config');

var routes = require('./routes/main');
//var users = require('./routes/users');

var app = express();

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.get('mongoose:connection') + config.get('mongoose:name'), config.get('mongoose:options'));
mongoose.set('debug', config.get('mongoose:debug'));

// view engine setup
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// create a write stream (in append mode) 
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});
//app.use(logger('combined', {stream: accessLogStream}))
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
//app.use('/users', users);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Страница не найдена');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('pages/error', {
      status: err.status,
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
    status: err.status,
    message: err.message,
    error: {}
  });
});


module.exports = app;

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('cookie-session');
var settings = require('./settings');

var routes = require('./routes/index');
var login = require('./routes/login');
var dashboard = require('./routes/dashboard');
var compileAndPush = require('./routes/compileAndPush');
var branch = require('./routes/branch');
var profile = require('./routes/profile');
var updateUI = require('./routes/updateUI');
var main = require('./routes/main');
var webhooksPush = require('./routes/webhooksPush');
var updateTip = require('./routes/updateTip');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb', extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//提供session支持
app.use(session({
  secret: settings.cookieSecret
}));

app.use('/', routes);
app.use('/main', main);
app.use('/login', login);
app.use('/dashboard', dashboard);
app.use('/compileAndPush', compileAndPush);
app.use('/branch', branch);
app.use('/profile', profile);
app.use('/updateUI', updateUI);
app.use('/git/webhooks/push', webhooksPush);
// 获取更新提醒已经构建的分支
app.use('/updateTip', updateTip);

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


module.exports = app;
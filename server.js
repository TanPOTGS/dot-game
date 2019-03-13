var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

/*-------------------------------------------------------------------------------------------------------------------------*/

//middleware
const session = require('express-session');
const passport = require('passport');

/*-------------------------------------------------------------------------------------------------------------------------*/

//load the env files
require('dotenv').config();

/*-------------------------------------------------------------------------------------------------------------------------*/

//create the express application
var app = express();

/*-------------------------------------------------------------------------------------------------------------------------*/

//connect to the mongo database
require('./config/database');
//configure passport 
require('./config/passport');

/*-------------------------------------------------------------------------------------------------------------------------*/

//require the routes for the application
var indexRouter = require('./routes/index');
var playersRouter = require('./routes/players');

/*-------------------------------------------------------------------------------------------------------------------------*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//mount the session middleware
app.use(session({
  secret: 'Session is engagged!',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

//mount the appropriate routes
app.use('/', indexRouter);
app.use('/players', playersRouter);

/*-------------------------------------------------------------------------------------------------------------------------*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

/*-------------------------------------------------------------------------------------------------------------------------*/

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
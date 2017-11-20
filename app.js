var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');
var hbss = require('hbs');

var routes_config = require('./routes/_config');
var _bundle = require('./functions/_bundle');

var app = express();

// view engine setup
app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'app',
  layoutsDir: __dirname + '/views/',
  helpers: {
    ifSame: function(val1, val2, options){
      if (val1 === val2)
        return (options.fn(this));
      else
        return (options.inverse(this));
    }
  }
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//Registering partials
hbss.registerPartials(__dirname + '/views/partials/');

/*hbss.registerHelper('ifSame', (val1, val2, options) => {
  if (val1 === val2)
    return (options.fn(this));
  else
    return (options.inverse(this));
});*/

/*hbss.registerHelper('xif', function (expression, options) {
  return Handlebars.helpers["x"].apply(this, [expression, options]) ? options.fn(this) : options.inverse(this);
});*/

/*hbss.registerHelper('ifv', function (conditional, options) {
  if (options.hash.value === conditional) {
    return options.fn(this)
  } else {
    return options.inverse(this);
  }
});*/

var _this = hbs.create({
  helpers:{
    ifv: function (conditional, options) {
      if (options.hash.value === conditional) {
        return options.fn(this)
      } else {
        return options.inverse(this);
      }
    },
    foo: function(){
      return 'foo';
    }
  }
});


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var index = require('./routes/index');
var about = require('./routes/about');
var home = require('./routes/home/home');
var message = require('./routes/home/message/message');
var confirm_reg = require('./routes/confirm-registration');
var friends = require('./routes/home/friends/friends');
var profile = require('./routes/home/profile/profile');

app.use('/', index);
app.use('/', home);
app.use('/about', about);
app.use(message);
app.use(confirm_reg);
app.use(friends);
app.use(profile);

//Building routes
_bundle.build_routes.ft_build_routes(
  app,
  './routes',
  routes_config.routes
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

localStorage.setItem('api_url', 'http://127.0.0.1:8383/matcha/public');

module.exports = app;
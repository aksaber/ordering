var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var ejs = require('ejs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var foodRouter = require('./routes/food');
var afoodRouter = require('./routes/afood');
var asellerRouter = require('./routes/aseller');
var aratingsRouter = require('./routes/aratings');
var ordersRouter = require('./routes/orders');
var adminRouter = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//配置读取html文件
app.engine('.html', ejs.__express);
//app.engine('.jade', ejs.__express);
app.set('view engine', 'html');
//app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//登录拦截
app.use(function(req, res, next) {
	if(req.cookies.userName){
		next();
	}else{
		if(req.originalUrl == '/users' || req.originalUrl == '/users/login' 
			|| req.originalUrl == '/users/logout' || req.originalUrl == '/food' 
			|| req.originalUrl == '/users/signup' || req.originalUrl == '/users/address' 
			|| req.originalUrl == '/aseller' || req.originalUrl == '/' 
			|| req.originalUrl == '/admin' || req.originalUrl == '/afood' 
			|| req.originalUrl == '/aratings' || req.originalUrl == '/aseller' 
			|| req.originalUrl == '/afood/delGoods' 
			|| req.originalUrl == '/users/userAdmin' || req.originalUrl == '/afood/editGoods' 
			|| req.originalUrl == '/afood/addGoods' || req.originalUrl == '/orders/findOrder' 
			|| req.originalUrl == '/orders/takeOrder' || req.originalUrl == '/orders/takeOrder' 
			|| req.originalUrl == '/users/delUserAdmin'){
			next();
		}else{
			res.json({
				status: '10001',
				msg: '当前未登录',
				result: ''
			});
		}
	}
});

//一级路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/food', foodRouter);
app.use('/afood', afoodRouter);
app.use('/aseller', asellerRouter);
app.use('/aratings', aratingsRouter);
app.use('/orders', ordersRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;

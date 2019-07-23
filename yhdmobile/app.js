var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var httpResult = require('./config').httpResult;
var sessionOptions = require('./config/index.js').sessionOptions;
var authPathsReg = require('./config/index.js').authPathsReg;
// 引入自定义文件
var indexRouter = require('./routes/index.js');
var subRouter = require('./routes/subcategory.js');
var userRouter = require('./routes/user.js');
var cartRouter = require('./routes/cart.js');
var profileRouter= require('./routes/profile.js');
var detailRouter = require('./routes/detail.js');
var addressRouter = require('./routes/address.js');
var orderRouter = require('./routes/order.js');
var adminRouter = require('./routes/admin.js');
var productRoute = require('./routes/product.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(session(sessionOptions));
app.use(express.static(path.join(__dirname, 'public')));

// 专门针对登录进行验证
app.use('*', function(req, res, next) {
        var isAuthPath = authPathsReg.test(req.baseUrl);
        if(isAuthPath&&!req.session.name) res.send(httpResult.untoken());
        else next();
});
// 一会儿要在这里写代码
app.use('/index', indexRouter);
app.use('/sub', subRouter);
app.use('/login', userRouter);
app.use('/cart', cartRouter);
app.use('/profile', profileRouter);
app.use('/address', addressRouter);
app.use('/order', orderRouter);
app.use('/admin', adminRouter);
app.use('/product', productRoute);

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

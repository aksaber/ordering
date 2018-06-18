var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var food = require('../models/food');

//连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/data');

mongoose.connection.on('connected', function() {
	console.log('连接数据库成功！');
});

mongoose.connection.on('error', function() {
	console.log('连接数据库失败！');
});

mongoose.connection.on('disconnected', function() {
	console.log('断开连接。');
});

router.get('/', function(req, res, next) {
	food.find({}, function(err, doc) {  //因为是get请求所以不需要参数
		if(err){
			res.json({
				status: '1',
				msg: err.message
			});
		}else{
			res.json({
				status: '0',
				msg: '',
				result: {
					count: doc.length,
					list: doc
				}
			});
		}
	});
});

module.exports = router;
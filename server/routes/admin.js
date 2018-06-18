var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var admin = require('../models/admin');

router.post('/', function(req, res, next) {
	admin.find({admin: req.body.adminName, adminpwd: req.body.adminpwd}, function(err, doc) {
		if(err){
			res.send(500);
			console.log(err);
		}else if(doc) {
			res.cookie("admin", 'admin', {  //存进cookie
				path: '/',
				maxAge: 1000*60*60 //存一个小时的时间
			});
			res.json({
				status: '0',
				msg: '',
				result: '成功登录'
			});
		}else{
			res.json({
				status: '0',
				msg: '',
				result: '账号密码错误'
			});
		}
	});
});

module.exports = router;
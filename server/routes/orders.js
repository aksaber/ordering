var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var orders = require('../models/orders');

//生成订单
router.post('/', function(req, res, next) {
	var sellerId = "001";
	var param = {
		"remark": req.body.remark,
		"createTime": req.body.createTime,
		"goods": req.body.goods,
		"address": req.body.address,
		"totalPrice": req.body.totalPrice,
		"takeTime": '',
		"status": "0",
		"id": req.body.id
	}
	var paramArr = [];
	paramArr.push(param);
	orders.update({id: sellerId}, {$push: {orders: paramArr}}, function(err, doc) {
		if(err){
			res.send(500);
			console.log(err);
		}else if(doc){
			res.json({
				status: '0',
				msg: '',
				result: '订单生成'
			});
		}
	});
});

//查找订单 --后台
router.post("/findOrder", function(req, res, next) {
	var sellerId = req.body.sellerId;
	orders.find({id: sellerId}, function(err, doc) {
		if(err){
			res.send(500);
			console.log(err);
		}else if(doc){
			res.json({
				status: '0',
				msg: '',
				result: doc
			});
		}
	});
});

//接单 - 后台
router.post("/takeOrder", function(req, res, next) {
	var sellerId = req.body.sellerId;
	orders.update({id: sellerId, "orders.status": "0"}, {$set: {"orders.$.status": "1"}}, function(err, doc) {
		if(err){
			res.send(500);
			console.log(err);
		}else if(doc){
			res.json({
				status: '0',
				msg: '',
				result: '已接单'
			});
		}
	});
});


module.exports = router;
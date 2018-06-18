var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var aratings = require('../models/aratings');

router.post('/', function(req, res, next) {
	var ratingsId = req.body.ratingsId;
	aratings.find({"id": ratingsId}, function(err, doc) {
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
	})
});

//用户评论成功后添加到aratings数据库
router.post('/addArating', function(req, res, next) {
	var ratingsId = req.body.id;
	var ratings = {
		"username": req.cookies.userName,
		"rateTime": req.body.time,
		"deliveryTime": "",
		"score": 5,
		"rateType": 0,
		"text": req.body.evaluate,
		"avatar": "./static/img/default_user.png",
		"recommend": []
	}
	var ratingArr = [];
	ratingArr.push(ratings);
	aratings.update({"id": ratingsId}, {$push: {ratings: ratingArr}}, function(err, doc) {
		if(err){
			res.send(500);
			console.log(err);
		}else if(doc){
			res.json({
				status: '0',
				msg: '',
				result: "评论添加成功"
			});
		}
	})
});

module.exports = router;
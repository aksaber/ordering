var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var aseller = require('../models/aseller');

router.get('/', function(req, res, next) {
	aseller.find({}, function(err, doc) {
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

module.exports = router;
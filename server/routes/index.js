var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var food = require('../models/food');

/* GET home page. */
router.get('/', function(req, res, next) {
	food.find({}, function(err, doc) {
		if(err){
			res.json({
				status: '1',
				msg: err.message
			});
		}else if(doc){
			res.render('manager', {title: doc.seller});
		}
	})

});

module.exports = router;

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var afood = require('../models/afood');

//菜品管理
router.post('/', function(req, res, next) {
	var foodId = req.body.foodId;
	afood.find({"id": foodId}, function(err, doc) {
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

//菜品管理-修改菜品
router.post('/editGoods', function(req, res, next) {
	var param = {
		goodsId: req.body.goodsId,
		goodsType: req.body.goodsType,
		goodsName: req.body.goodsName,
		goodsPrice: req.body.goodsPrice,
		goodsImg: req.body.goodsImg
	}
	afood.update({"id": param.goodsId}, {$set: {"foods.0.foods.0.price": param.goodsPrice}}, function(err, doc) {
		if(err){
			res.send(500);
			console.log(err);
		}else if(doc){
			afood.update({"id": param.goodsId}, {$set: {"foods.0.foods.0.name": param.goodsName}}, function(err, doc) {
				if(err){
					res.send(500);
					console.log(err);
				}else if(doc){
					afood.update({"id": param.goodsId}, {$set: {"foods.0.foods.0.image": param.goodsImg}}, function(err, doc) {
						if(err){
							res.send(500);
							console.log(err);
						}else if(doc){
							res.json({
								status: '0',
								msg: '',
								result: '666'
							});
						}
					});
				}
			})
		}else{
			res.json({
				status: '0',
				msg: '',
				result: '777'
			});
		}
	})
});

//菜品管理 - 添加商品
router.post('/addGoods', function(req, res, next) {
	var goodsId = req.body.goodsId;
	var param = {
		goodsType: req.body.goodsType,
		goodsName: req.body.goodsName,
		goodsPrice: req.body.goodsPrice,
		goodsImg: req.body.goodsImg,
		goodsDescription: "套餐",
		goodsSellCount: 29,
		goodsRating: 100
	}
	afood.update({"id": goodsId}, {$push: {"foods.0.foods": {
		"type": param.goodsType, 
		"name": param.goodsName, "price": param.goodsPrice, 
		"image": param.goodsImg, "description": param.goodsDescription, 
		"sellCount": param.goodsSellCount, "rating": param.goodsRating }}}, function(err, doc) {
		if(err){
			res.send(500);
			console.log(err);
		}else if(doc){
			res.json({
				status: '0',
				msg: '',
				result: "666"
			});
		}else{
			res.json({
				status: '0',
				msg: '',
				result: '777'
			});
		}
	})
});

//菜品管理 - 删除商品
router.post('/delGoods', function(req, res, next) {
	var goodsId = req.body.goodsId;
	var goodsType = req.body.goodsType;
	afood.update({"id": goodsId}, {$pull: {"foods.0.foods": {type: goodsType}}}, function(err, doc) {
		if(err){
			res.send(500);
			console.log(err);
		}else if(doc){
			res.json({
				status: '0',
				msg: '',
				result: "666"
			});
		}
	})
});

module.exports = router;
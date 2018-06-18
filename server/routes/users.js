var express = require('express');
var router = express.Router();
var Users = require('../models/users');

/* GET users listing. */
//登录接口
router.post('/', function(req, res, next) {
	var param = {   //获取前端post请求的参数
		userName: req.body.userName,
		userPwd: req.body.userPwd
	}
	Users.findOne(param, function(err, doc) {
		if(err){
			res.json({
				status: "1",
				msg: err.message
			});
		}else{
			if(doc){
				res.cookie("userName", doc.userName, {  //存进cookie
					path: '/',
					maxAge: 1000*60*60 //存一个小时的时间
				});
				//req.session.user = doc; //存进session
				res.json({
					status: '0',
					msg: '',
					result: {
						userName: doc.userName
					}
				});
			}else{ //账号密码错误
				res.json({
					status: '0',
					msg: '',
					result: 'error'
				});
			}
		}
	}); //根据此账号密码查询数据库里是否存在
});

//登出接口
router.post("/logout", function(req, res, next) {
	res.cookie("userName", "", {
		path: "/",
		maxAge: -1
	})
	res.json({
		status: "0",
		msg: '',
		result: ''
	})
});

//注册接口
router.post("/signup", function(req, res, next) {
	var param = {
		userName: req.body.signName,
		userPwd: req.body.signPwd,
		address: [],
		collections: [],
		order: []
	}
	Users.findOne({userName: param.userName}, function(err, doc){
		if(err){
			res.send(500);
			console.log(err);
		}else if(doc){
			res.json({
				status: '0',
				msg: '',
				result: '用户名已存在！'
			})
		}else{
			Users.create({
				userName: param.userName,
				userPwd: param.userPwd
			}, function(err, doc) {
				if(err){
					res.send(500);
					console.log(err);
				}else{
					res.json({
						status: '0',
						msg: '1',
						result: '用户名创建成功！'
					});
				}
			});
		}
	})
});

//新增地址接口
router.post("/addAddress", function(req, res, next) {
	var param = {
		adName: req.body.adName,
		adSex: req.body.adSex,
		adAddress: req.body.adAddress,
		adDetailAddress: req.body.adDetailAddress,
		adTel: req.body.adTel,
		adNumber: req.body.adNumber
	};
	var paramArr = [];
	paramArr.push(param);
	if(req.cookies.userName){
		Users.findOne({userName: req.cookies.userName, address: {$exists: true}}, function(err, doc) {
			if(err){
				res.send(500);
				console.log(err);
			}else if(doc){
				Users.update({userName: req.cookies.userName}, {$push: {address: paramArr}}, function(err, doc) {
					if(err){
						res.send(500);
						console.log(err);
					}else{
						res.json({
							status: '0',
							msg: '',
							result: '地址添加成功'
						})
					}
				})
			}else{
				Users.update({userName: req.cookies.userName}, {$set: {address: paramArr}}, function(err, doc) {
					if(err){
						res.send(500);
						console.log(err);
					}else{
						res.json({
							status: '0',
							msg: '',
							result: '地址创建成功'
						})
					}
				});
			}
		});
	}else{
		res.json({
			status: '0',
			msg: '',
			result: '请先登录'
		})
	}
});

//获取地址接口
router.get("/getAddress", function(req, res, next) {
	if(req.cookies.userName){
		Users.findOne({userName: req.cookies.userName}, function(err, doc) {
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
	}else{
		res.json({
			status: '0',
			msg: '',
			result: '请先登录'
		});
	}
});

//删除地址接口
router.post("/delAddress", function(req, res, next) {
	var num = req.body.adNumber;
	if(req.cookies.userName){
		Users.update({userName: req.cookies.userName}, {$pull: {address: {adNumber: num}}}, function(err, doc) {
			if(err){
				res.send(500);
				console.log(err);
			}else if(doc){
				res.json({
					status: '0',
					msg: '',
					result: '地址删除成功'
				});
			}
		});
	}else{
		res.json({
			status: '0',
			msg: '',
			result: '请先登录'
		});
	}
})

//收藏店家
router.post("/collect", function(req, res, next) {
	var alCollect = req.body.collection;
	if(req.cookies.userName){
		Users.findOne({userName: req.cookies.userName, collections: {$exists: true}}, function(err, doc) {
			if(err){
				res.send(500);
				console.log(err);
			}else if(doc){
				Users.update({userName: req.cookies.userName}, {$push: {collections: alCollect}}, function(err, doc) {
					if(err){
						res.send(500);
						console.log(err);
					}else if(doc){
						res.json({
							status: '0',
							msg: '',
							result: '收藏成功'
						})
					}
				})
			}else{
				Users.update({userName: req.cookies.userName}, {$set: {collections: alCollect}}, function(err, doc) {
					if(err){
						res.send(500);
						console.log(err);
					}else if(doc){
						res.json({
							status: '0',
							msg: '',
							result: '收藏成功'
						});
					}
				})
			}
		});
	}else{
		res.json({
			status: '0',
			msg: '',
			result: '请先登录'
		})
	}
})

//取消收藏
router.post("/delCollect", function(req, res, next) {
	var collection = req.body.collection;
	if(req.cookies.userName){
		Users.update({userName: req.cookies.userName}, {$pull: {collections: collection}}, function(err, doc) {
			if(err){
				res.send(500);
				console.log(err);
			}else if(doc){
				res.json({
					status: '0',
					msg: '',
					result: '取消收藏'
				});
			}
		});
	}
})

//查看是否已收藏
router.get("/findCollect", function(req, res, next) {
	if(req.cookies.userName){
		Users.findOne({userName: req.cookies.userName}, function(err, doc) {
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
	}
})

//生成订单
router.post("/addOrder", function(req, res, next) {
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
	if(req.cookies.userName){
		Users.findOne({userName: req.cookies.userName, orders: {$exists: true}}, function(err, doc) {
			if(err){
				res.send(500);
				console.log(err);
			}else if(doc){
				Users.update({userName: req.cookies.userName}, {$push: {orders: paramArr}}, function(err, doc) {
					if(err){
						res.send(500);
						console.log(err);
					}else if(doc){
						Users.findOne({userName: req.cookies.userName, "orders.id": param.id, "orders.status": "0"}, {"orders.$": 1}, function(err, doc) {
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
					}
				})
			}else{
				Users.update({userName: req.cookies.userName}, {$set: {orders: paramArr}}, function(err, doc) {
					if(err){
						res.send(500);
						console.log(err);
					}else if(doc){
						Users.findOne({userName: req.cookies.userName, "orders.id": param.id, "orders.status": "0"}, {"orders.$": 1}, function(err, doc) {
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
					}
				})
			}
		});
	}else{
		res.json({
			status: '0',
			msg: '',
			result: '请先登录'
		})
	}
})

//接单 --后台
router.post("/takeOrder", function(req, res, next) {
	if(req.cookies.userName){
		Users.update({userName: req.cookies.userName, "orders.status": "0"}, {$set: {"orders.$.status": "1"}}, function(err, doc) {
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
	}
});

//用户管理 - 后台
router.get('/userAdmin', function(req, res, next) {
	Users.find({}, function(err, doc) {
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

//删除用户 - 后台
router.post('/delUserAdmin', function(req, res, next) {
	var userName = req.body.userName;
	Users.remove({userName: userName}, function(err, doc) {
		if(err){
			res.send(500);
			console.log(err);
		}else if(doc){
			res.json({
				status: '0',
				msg: '',
				result: "删除" + userName + "成功"
			});
		}
	});
});

//新增评论
router.post("/addEvaluate", function(req, res, next) {
	var evaluate = {
		"text": req.body.evaluate,
		"id": req.body.id
	}
	var evaArr = [];
	evaArr.push(evaluate);
	if(req.cookies.userName){
		Users.findOne({userName: req.cookies.userName, evaluates: {$exists: true}}, function(err, doc) {
			if(err){
				res.send(500);
				console.log(err);
			}else if(doc){
				Users.update({userName: req.cookies.userName}, {$push: {evaluates: evaArr}}, function(err, doc) {
					if(err){
						res.send(500);
						console.log(err);
					}else{
						res.json({
							status: '0',
							msg: '',
							result: '用户评论成功'
						})
					}
				})
			}else{
				Users.update({userName: req.cookies.userName}, {$set: {evaluates: evaArr}}, function(err, doc) {
					if(err){
						res.send(500);
						console.log(err);
					}else{
						res.json({
							status: '0',
							msg: '',
							result: '用户评论成功'
						})
					}
				});
			}
		});
	}else{
		res.json({
			status: '0',
			msg: '',
			result: '请先登录'
		})
	}
});


//新增评论
router.get("/finalEvaluate", function(req, res, next) {
	if(req.cookies.userName){
		Users.update({userName: req.cookies.userName, "orders.status": "1"}, {$set: {"orders.$.status": "2"}}, function(err, doc) {
			if(err){
				res.send(500);
				console.log(err);
			}else if(doc){
				res.json({
					status: '0',
					msg: '',
					result: 'over'
				});
			}
		});
	}
});


module.exports = router;

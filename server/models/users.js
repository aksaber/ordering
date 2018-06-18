var mongoose = require('mongoose');

var goods = new mongoose.Schema({
	"name": String,
	"count": Number
});

var address = new mongoose.Schema({
	"name": String,
	"tel": String,
	"address": String
});

var orders = new mongoose.Schema({
	"remark": String,
	"createTime": String,
	"goods": [goods],
	"address": [address],
	"totalPrice": Number,
	"takeTime": String,
	"id": String,
	"status": String
});

var evaluate = new mongoose.Schema({
	"text": String,
	"id": String
});

var users = new mongoose.Schema({
	"userName": String,
	"userPwd": String,
	"address": Array,
	"collections": Array,
	"orders": [orders],
	"evaluates": [evaluate]
});

module.exports = mongoose.model('user', users);

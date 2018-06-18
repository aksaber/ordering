var mongoose = require('mongoose');

var goodsSchema = new mongoose.Schema({
	"name": String,
	"count": Number
});

var addressSchema = new mongoose.Schema({
	"name": String,
	"tel": String,
	"address": String
});

var orders = new mongoose.Schema({
	"id": String,
	"remark": String,
	"createTime": String,
	"totalPrice": Number,
	"takeTime": String,
	"goods": [goodsSchema],
	"address": [addressSchema],
	"status": String
});

var productSchema = new mongoose.Schema({
	"id": String,
	"orders": [orders]
});

module.exports = mongoose.model('orders', productSchema, "orders");
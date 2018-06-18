var mongoose = require('mongoose');

var childSchema = new mongoose.Schema({
	"type": Number,
	"description": String
});

var productSchema = new mongoose.Schema({
	"supports": [childSchema],
	"infos": Array,
	"name": String,
	"img": String,
	"id": String,
	"description": String,
	"bulletin": String,
	"deliveryTime": Number,
	"score": Number,
	"serviceScore": Number,
	"foodScore": Number,
	"rankRate": Number,
	"minPrice": Number,
	"ratingCount": Number,
	"deliveryPrice": Number,
	"sellCount": Number
});

module.exports = mongoose.model('aseller', productSchema, "aseller");
var mongoose = require('mongoose');

var childSchema = new mongoose.Schema({
	"username": String,
	"rateTime": Number,
	"deliveryTime": Number,
	"score": String,
	"rateType": Number,
	"text": String,
	"avatar": String,
	"recommend": Array
});

var productSchema = new mongoose.Schema({
	"ratings": [childSchema],
	"id": String
});

module.exports = mongoose.model('aratings', productSchema, "aratings");
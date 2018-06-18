var mongoose = require('mongoose');

var childChildSchema = new mongoose.Schema({
	"type": String,
	"name": String,
	"price": Number,
	"description": String,
	"sellCount": Number,
	"rating": Number,
	"image": String
});

var childSchema = new mongoose.Schema({
	"name": String,
	"foods": [childChildSchema]
});

var productSchema = new mongoose.Schema({
	"foods": [childSchema],
	"id": String,
});

module.exports = mongoose.model('afood', productSchema, "afood");
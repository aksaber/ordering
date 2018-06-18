var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
	"admin": String,
	"adminpwd": String
});

module.exports = mongoose.model('admin', productSchema, "admin");
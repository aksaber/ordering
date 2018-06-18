var mongoose = require('mongoose');
var productSchema = new mongoose.Schema({
	"seller": Array,
	"goods": Array,
	"ratings": Array
});

module.exports = mongoose.model('food', productSchema);
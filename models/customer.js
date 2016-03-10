var mongoose = require('mongoose')

var custSchema = mongoose.Schema({
	name : {type : String, required:true, unique : true},
	email : {type : String, required:true},
	number : Number,
	query : String
})

module.exports = mongoose.model('Customer', custSchema)
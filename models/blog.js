var mongoose = require('mongoose')

var blogSchema = mongoose.Schema({
	headline : {type : String, required:true},
	date : {type : Date, required:true},
	content : Array,
	image : String
})

module.exports = mongoose.model('Blog', blogSchema)

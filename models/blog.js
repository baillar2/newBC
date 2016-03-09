var mongoose = require('mongoose')

var blogSchema = mongoose.Schema({
	headline : {type : String, required:true},
	date : {type : String, required:true},
	content : {type : String, required:true}
})

module.exports = mongoose.model('Blog', blogSchema)

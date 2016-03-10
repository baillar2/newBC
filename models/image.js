var mongoose = require('mongoose')

var imageSchema = mongoose.Schema({
	url: String
})

module.exports = mongoose.model('Image', imageSchema)

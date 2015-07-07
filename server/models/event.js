var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new mongoose.Schema({
	admin: String,
	title: String,
	description: String,
	date: Date,
	time: String,
	items: [],
	posts: [{type: Schema.Types.ObjectId, ref: 'Post'}]
})

mongoose.model('Event', EventSchema);
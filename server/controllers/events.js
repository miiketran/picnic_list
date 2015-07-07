var mongoose = require('mongoose');
var Event = mongoose.model('Event');

module.exports = {
	show: function(req, res){
		Event.find({}, function(err,result){
			if(err){
				console.log(err);
			} else {
				res.json(result);
			}
		})
	},

	add: function(req, res){
		var event = new Event({
			title: req.body.title,
			description: req.body.description,
			date: req.body.date,
			time: req.body.time,
			items: req.body.items
		});
		event.save(function(err,result){
			if(err){
				console.log(err);
			} else {
				res.json(result);
			}
		})
	},

	update: function(req,res){
		
	}
}

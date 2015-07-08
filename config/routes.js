var events = require('./../server/controllers/events.js');
var users = require('./../server/controllers/users.js');

module.exports = function(app){
	app.get('/events', ensureAuthenticated, function(req,res){
		events.show(req,res);
	})

	app.get('/getEvent', ensureAuthenticated, function(req,res){
		events.showOne(req,res);
	})

	app.post('/addEvent', ensureAuthenticated, function(req,res){
		events.add(req,res);
	})

	app.post('/updateEvent', ensureAuthenticated, function(req,res){
		events.update(req,res);
	})

	app.post('/claimItem', ensureAuthenticated, function(req,res){
		events.claimItem(req,res);
	})
	
	app.get('/user', ensureAuthenticated, function(req,res){
		users.show(req,res);
	})
};


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
}
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var session = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
 
var FACEBOOK_APP_ID = '535173049968945';
var FACEBOOK_APP_SECRET = '542794f72b16288960cdb42bc87bffb7';


var app = express();
app.set('port', (process.env.PORT || 5000));

app.use(session({ secret: 'keyboard cat' }));
app.use(cookieParser());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
// app.use(app.router);
app.use(express.static(path.join(__dirname, './client')));
app.set('views', __dirname + '/client/views');
app.set('view engine', 'ejs');
require('./config/mongoose.js'); //requires picnic_list db
require("./config/routes.js")(app);

// login page 
app.get('/', function (request, res) {
  res.render('login');
});

// ensureAuthenticated is known as "route middleware"
app.get('/main', ensureAuthenticated, function(req, res) {
  // console.log(req);
  // req.user.displayName shows name
  res.render('main');
})


// BEGIN PASSPORT
var mongoose = require('mongoose');
require('./server/models/user.js'); //requires model/schema
var User = mongoose.model('User');
require('./server/controllers/users.js');
User.findOrCreate = function(filters, callback) {
        User = this;
        this.find(filters, function(err, results) {
            if(results.length == 0) {
                var newUser = new User();
                newUser.profile_id = filters.profile_id;
                newUser.displayName = filters.displayName;
                newUser.save(function(err, doc) {
                    callback(err, doc)
                });
            } else {
                callback(err, results[0]);
            }
        });
  }

passport.serializeUser(function(user, done) {
  done(null, user);
});
 
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


// Use the FacebookStrategy within Passport
passport.use(new FacebookStrategy(
{
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:8000/auth/facebook/callback'
}, function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(
      { profile_id:profile.id, displayName:profile.displayName },
      function (err, result) {
        // console.log(result);
          return done(null,result);
      });
}));

app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/main');
  });

// logout
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.clearCookie('keyboard cat');
  req.logout();
  res.redirect('/');
});

app.listen(app.get('port'), function(){
  console.log("Node app is running on port", app.get('port'));
});


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
}
var User    = require('../app/models/user');
var path 	= require('path'),
fs 			= require('fs');
module.exports = function(app, passport, server) {
	
	app.get('/', auth, function(request, response) {
		response.render('gemsgame.html');
	});

	app.get('/user', auth, function(request, response) {
		response.render('user.html', {
			user : request.user
		});
	});

	app.get('/edit', auth, function(request, response) {
		response.render('edit.html', {
			user : request.user
		});
	});

	app.get('/gemsgame', auth, function(request, response) {
		response.render('edit.html');
	});
	
	app.get('/logout', function(request, response) {
		request.logout();
		response.redirect('/');
	});

	app.get('/login', function(request, response) {
		response.render('login.html', { message: request.flash('error') });
	});

	app.post('/login', passport.authenticate('login', {
		successRedirect : 'gemsgame.html', 
		failureRedirect : '/login', 
		failureFlash : true
	}));

	app.get('/signup', function(request, response) {
		response.render('signup.html', { message: request.flash('signuperror') });
	});

	app.post('/signup', passport.authenticate('signup', {
			successRedirect : '/about',
			failureRedirect : '/signup', 
			failureFlash : true 
		}));

	app.get('/edit', function(request, response) {
		response.render('edit.html', { message: request.flash('updateerror') });
	});

	app.post('/edit',  function (request, response){
			 User.findOne({ 'user.email' :  request.body.email }, function(err, user) {
            		if (err){ return done(err);}
            		if (user)
                			user.updateUser(request, response)

                     });
	});
};

function auth(request, response, next) {
  if (request.isAuthenticated()) { return next(); }
  response.redirect('/login')
}

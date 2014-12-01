var User    = require('../app/models/user');
var Game    = require('../app/models/game');
var path 	= require('path'),
fs 			= require('fs');
module.exports = function(app, passport, server) {
	


    app.get('/api/users', function(req, res) {
       res.json({success:true})
    });

		app.get('*', function(req, res) {
       res.sendfile('./views/index.html');
    });

	/*app.get('/', function(request, response) {
		response.render('index.html');
	});

	app.get('/index', function(request, response) {
		response.render('index.html');
	});
	*/

	/*app.get('/user', auth, function(request, response) {
		response.render('user.html', {
			user : request.user
		});
	});*/

	//app.get('/user', auth, function(request, response) {
	//	response.json(request.user);
	//});
//
	///*app.get('/edit', auth, function(request, response) {
	//	response.render('edit.html', {
	//		user : request.user
	//	});
	//});*/
	//
	//app.get('/edit', auth, function(request, response) {
	//	response.json(request.user);
	//});
//
	///*app.get('/gemsgame', auth, function(request, response) {
  //  var gameTmp = new Game().createNewGame(request.user.user);
	//	request.game = gameTmp;
	//	response.render('gemsgame.html');
	//});*/
	//
	//app.get('/gemsgame', auth, function(request, response) {
  //  var gameTmp = new Game().createNewGame(request.user.user);
	//	request.game = gameTmp;
	//	response.json(request.game);
	//});
//
	///*app.get('/logout', function(request, response) {
	//	request.logout();
	//	response.redirect('/');
	//});
//
	//app.get('/login', function(request, response) {
	//	response.render('login.html', { message: request.flash('error') });
	//});
//
	//app.post('/login', passport.authenticate('login', {
	//	successRedirect : 'gemsgame', 
	//	failureRedirect : '/login', 
	//	failureFlash : true
	//}));
//
	//app.get('/signup', function(request, response) {
	//	response.render('signup.html', { message: request.flash('signuperror') });
	//});
//
	//app.post('/signup', passport.authenticate('signup', {
	//		successRedirect : '/login',
	//		failureRedirect : '/signup', 
	//		failureFlash : 'Sign up Fail' 
	//	}));
//
	//app.get('/edit', function(request, response) {
	//	response.render('edit.html');
	//});*/
//
	//app.post('/edit',  function (request, response){
	//		 User.findOne({ 'user.email' :  request.body.email }, function(err, user) {
  //          		if (err){ response.send(err);}
  //          		if (user)
  //              			user.updateUser(request, response)
  //                   });
	//});
//
	///*app.post('/gemsgame', auth, function(request, response) {
  //  request.user.updateUserScore(request.body.score);
  //  response.redirect('/gemsgame');
  //});*/
//
  //app.post('/gemsgame/updateScore', auth, function(request, response) {
  //  request.user.updateUserScore(request.body.score);
  //});
//
  /*app.get('/', function(req, res) {
        res.render('./index'); // load the single view file (angular will handle the page changes on the front-end)
    });*/


  //app.get('/', function(request, response) {
  //	response.render('index.html');
  //});

};

function auth(request, response, next) {
  if (request.isAuthenticated()) { return next(); }
  return false;
}

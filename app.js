// set variables for environment
var express = require('express');
var app = express();
var path = require('path'),
    fs = require('fs');
var mongoose = require('mongoose');
var http = require('http');
var server = http.createServer(app)
var gemsConfigDB = require('./config/dbGems.js');
var passport = require('passport');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var bodyParser   = require('body-parser');


mongoose.connect(gemsConfigDB.url); 

require('./config/passport')(passport); 

app.use(cookieParser('secret'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(session({
	secret: 'GemsGame',
    name: 'cookie_name',
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash());

require('./app/routes.js')(app, passport, server); 


// Set server port
app.listen(4000);
console.log('server is running');
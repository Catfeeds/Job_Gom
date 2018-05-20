
var ejs = require('ejs');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var lactate = require('lactate');
var routers = require('./router/routersIndex');
var connect = require('connect');

const {getIPlist} = require( '../lib');

let env  = process.env.NODE_ENV || 'dev';
//bind to global var
global.$g = global.$g || {};
global.$g.port = require('./package.json').config.port;
global.$g.ips = getIPlist();
global.$g.hosts = global.$g.ips.map(x => `${x}:${global.$g.port}`);

module.exports = function(app) {

	app.engine('html', ejs.renderFile);
	app.set('view engine', 'html');

	// app.use(lactate.static(path.join(__dirname, '../')));
	console.log(path.join(__dirname, 'views/dist'));
	app.use('/static', lactate.static(path.join(__dirname, 'views/dist')));
	app.use(function() {
		var args = arguments;
		var isErr = args[0] instanceof Error;
		if (isErr) {
			args[2].status(500).send(args[0]);
		} else {
			args[2]();
		}
	});
	app.use(bodyParser.json({limit: '50mb'}));
	//parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({
		limit: '50mb',
		extended: false
	}));
	app.use(cookieParser('mock'));
	app.use(session({
	    name: 'mock',
	    secret: 'mock'
	}));

	//parse application/json
	app.use(bodyParser.json());

	app.use(function(req, res, next) {
	    res.header('Access-Control-Allow-Credentials', true);
	    res.header('Access-Control-Allow-Origin', '*');
	    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
	    next();
});


	routers.forEach(function(router) {
		app.use(router);
	});

	//return error
	app.use(function(err, req, res, next){
		console.log(err);
	    res.end(JSON.stringify(err));
	});
};

var express = require('express');
// require('ts-node/register')
// require('babel-register');
// require('babel-polyfill');
var socketio = require('socket.io');
var forward = require('express-forward-html');


var middlewareCommon = require('./mid-common');
var app = express();

middlewareCommon(app);
//载入view helps
require('./helpers')(app);

forward(require('./config').forward)(app);
var server = app.listen(global.$g.port, () =>{
	console.log(`the mock server is listen on ${global.$g.port}`);
});

app.locals.ios = app.locals.ios || {};

//WebSocket处理
let io = socketio.listen(server).on('connection', function(client){
	let id = client.id;
	if (!app.locals.commonid) {
		app.locals.commonid = id;
	}
	console.log(`websocket client connected: ${id}`);
	client.on('disconnect', function () {
		console.log(`websocket client disconnected: ${id}`);
		if (app.locals.commonid === id) {
			app.locals.commonid = null;
		}
	    delete app.locals.testInfo[id];
	});
});

app.locals.ios = io.sockets;
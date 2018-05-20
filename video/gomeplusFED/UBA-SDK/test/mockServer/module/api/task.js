// import {fetchTask} from '../lib/hooks';
const fetch = require('node-fetch');
const now = require("performance-now");
const urlLib = require('url');
const querystring = require('querystring');

module.exports = function(Router) {
	let currentMock;
	// fetch task
	Router.get('/forward', async function(req, res, next){
	    try {
	    	let id = req.query.id || req.app.locals.commonid;
	    	let env = req.query.env;
	    	let io = req.app.locals.ios[id];
	    	let testInfo = req.app.locals.testInfo;
	    	let orginFetch = testInfo.api[env];
	    	let {platform, pageUrl} = req.query;
	    	// console.log('server: api test operation: fetch task requested');
			let urlQuery = urlLib.parse(pageUrl).query;
			let newQuery = {
				pageUrl: querystring.parse(urlQuery).url,
				platform
			}
	    	let apiUrl = pageUrl.replace(/^.+?\/api\/page\/html/, orginFetch);
	    	// 转发
	    	let url =  `${orginFetch}?${querystring.stringify(newQuery)}`;
	    	var start = now();
	    	var end;
	        fetch(url, {
	            method: 'GET'
	        })
	        .then(function(result) {
	            return result.text();
	        }).then(function(json) {
	        	end = now();
		        if (io) {
		    		io.emit('api', {
		    			span: (end - start).toFixed(3),
		    			json,
		    			url
		    		});
		    	}
	            res.send(json);
	        }).catch(function(err) {
	            console.log(err);
	        });
	    } catch(err) {
	        next(err);
	    }
	});

	Router.get('/setmock', async function(req, res, next){
	    try {
	    	let {filename} = req.query;
	    	currentMock = filename;
	    	res.json({code: 200});
	    } catch(err) {
	        next(err);
	    }
	});

	Router.post('/savemock', async function(req, res, next){
	    try {
	    	let {filename, mockdata} = req.body;
	    	let result = req.app.locals.saveMockData(filename, mockdata);
	    	res.json(result);
	    } catch(err) {
	        next(err);
	    }
	});
	Router.post('/renamemock', async function(req, res, next){
	    try {
	    	let {oldname, newname} = req.body;
	    	let result = req.app.locals.renameMockData(oldname, newname);
	    	res.json(result);
	    } catch(err) {
	        next(err);
	    }
	});

	Router.get('/mock', async function(req, res, next){
	    try {
	    	let mockJson = req.query.filename;
	    	let filename = mockJson ? mockJson : currentMock;
	    	let result = req.app.locals.getMockData(filename);
	    	res.json(result);
	    } catch(err) {
	        next(err);
	    }
	});


	//report
	Router.get('/log', async function(req, res, next){
	    try {
	    	let id;
	    	let {testinfo} = req.query;
	    	if (testinfo && (testinfo = JSON.parse(testinfo))) {
	    		id = testinfo.socketid;
	    	}
	    	id = id || req.cookies.io || req.app.locals.commonid;
	    	let io;
	    	if (id) {
	    		if ((io = req.app.locals.ios[id]) || (io = req.app.locals.ios[req.app.locals.commonid]))  {
	    			io.emit('log', req.query);
	    		}
	    	}
            res.json({code:200});
	    } catch(err) {
	        next(err);
	    }
	});

	return Router;
}

// import {fetchTask} from '../lib/hooks';
var fetch = require('node-fetch');
const {getSrcPath, buildScript} = require('../../../lib');


module.exports = function(Router) {

	Router.post('/', async function(req, res, next){

		let { project, orginApi, mockApi, socketid} = req.body;
		let {entry, script} = req.app.locals.getDefaultApi('project')[project];
		req.session.socketid = socketid;
		req.app.locals.commonid = socketid;
		
		orginApi = JSON.parse(orginApi);
		mockApi = JSON.parse(mockApi);
		let testInfo = req.app.locals.testInfo;
		testInfo[socketid] = testInfo[socketid] || {};
		let testinfo = {socketid, ...mockApi};
		if(orginApi.fetch !== 'all') {
			testinfo.env = orginApi.fetch;
		}
	    try {
	    	let code = await buildScript({
				entry,
				script,
	    		output: false});
		    // set the code
			testInfo[socketid || 'common'] = testInfo[socketid || 'common'] || {};
			Object.assign(testInfo[socketid || 'common'], {code, testinfo});
			res.json({ code: 200 });
	    } catch(err) {
	    	console.log(err);
	        next(err);
	    }
	});

	return Router;
}

import ajax from '../../../polyfill/ajax/index.js';
import { querySelector } from '../../../polyfill/query.js';
import {trigger} from '../../../src/event.js';
import apiGen from '../../../src/api.js';
import config from '../../../src/config.js';

const api = apiGen(config);

let res = api.$apply().then(function(tasks){
	// console.log({selector, event, node, cb});
	console.log('task has been applied');
	// trigger the event, script should report it to server
	console.log(tasks);
	try {
		tasks.forEach(t => trigger(querySelector(t.selector), 'click'));
	} catch(e) {
		console.log(e);
	}
	
	return 'test finished';
});

export default res;

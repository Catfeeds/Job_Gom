import ajax from '../../../polyfill/ajax/index.js';
import {trigger} from '../../../src/event.js';
import api from '../../../src/api.js';

let res = api.$apply().then(function({selector, event, node, cb}){
	// console.log({selector, event, node, cb});
	console.log('task has been applied');
	// trigger the event, script should report it to server
	trigger(node, event);
	return 'test finished'
});

export default res;

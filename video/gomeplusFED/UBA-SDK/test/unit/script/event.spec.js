
import {bind, unbind, trigger} from '../../../src/event.js';

let result = [];

let body = document.getElementsByTagName('body')[0];

let callback = function(e) {
	// console.log('this is click event callback!');
	// console.log('Now print event:');
	// console.log(e);
	result.push(e.target);
};

// atach click event to body
//  (element, event, cb, capture)
bind(body, 'click', callback);

// triger it
// (node, eventName)
trigger(body, 'click');

// unbind the event
// (element, event, cb, capture)
unbind(body, 'click', callback);

// triger it again
// (node, eventName)
trigger(body, 'click');

//return the result
export default result;

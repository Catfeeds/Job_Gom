import ajax from '../../../polyfill/ajax/index.js';

/*! qwest 4.4.5 (https://github.com/pyrsmk/qwest) */

// qwest.`method`(`url`, `data`, `options`, `before`)
console.log('ajax begin');


// test get and post
let hosturl = window.location.href;
let msg = 'test';
let source = 'ajax_test'

let request = ajax
	.get('http://127.0.0.1:8788/api/test',{source},{ headers :{'Cache-Control': ''}})
	.post('http://127.0.0.1:8788/api/test',{hosturl, msg, source},{headers :{'Cache-Control': ''}});

export default request;

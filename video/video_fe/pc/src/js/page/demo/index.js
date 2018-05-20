/* css */
import 'css/page/demo/index.scss';

import toast from 'components/toast.js';
import Share from 'components/share.js';

import React from 'react';
import ReactDom from 'react-dom';

import Pager from 'widgets/page/index';

ReactDom.render(<h1>Hello, world!</h1>, document.getElementById('root'));

console.log('done');

toast({
	msg:'哎哟卧槽',
	x:100,
	y:200
});

new Share({
	id:'share'
});

var page = new Pager($('#pager'), {
	total: 12,
	current: 6
});

page.on('pageClick', function(p){
	console.log(p);
});

// 发送请求时,调用disable(),请求结束时,调用enable();
page.enable();
page.disable();


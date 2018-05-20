import { throttle } from 'util/common.js';

const bodyEle = $('body');
const headerEle = $('header');
const headerHeight = headerEle.height();
const cloneEle = headerEle.clone().addClass('clone');
headerEle.before(cloneEle);

const listenScroll = throttle(function() {
	let scrollTop = $(window).scrollTop();
	if (scrollTop <= headerHeight) {
		cloneEle.css({	
			transform: `translateY(${scrollTop - 97}px)`
		});
	} else {
		cloneEle.css({	
			transform: 'translateY(0)'
		});
	}
}, 100);

$(window).on('scroll', listenScroll);
// 废弃
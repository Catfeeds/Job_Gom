import { win, doc } from '../config';
var isReady = false;
const domReadyCbs: (() => void)[] = [];
export const ready = function() {
	if (isReady) {
		return;
	} else {
		isReady = true;
		// dom ready
		for (var i = 0; i < domReadyCbs.length; i++) {
			domReadyCbs[i]();
		}
	}
};
export const domReady = function(cb: () => void ) {
	domReadyCbs.push(cb);
	if (doc.readyState === "complete") {
		// Handle it asynchronously to allow scripts the opportunity to delay ready
		setTimeout(ready, 1);
	} else if (doc.addEventListener) {
		doc.addEventListener("DOMContentLoaded", ready, false);
		// A fallback to window.onload, that will always work
		win.addEventListener("load", ready, false);
		// If IE event model is used
	} else {
		doc['attachEvent']("onreadystatechange", ready);
		// A fallback to window.onload, that will always work
		win['attachEvent']("onload", ready);
		// If IE and not a frame
		// continually check to see if the document is ready
		var top: boolean | HTMLElement = false;
		try {
			top = window.frameElement === null && document.documentElement;
		} catch (e) {}
		// 如果是非iframe的情况，并且支持doScroll方法
		if (top && top['doScroll']) {
			(function doScrollCheck() {
				if (!isReady) {
					try {
						top['doScroll']("left");
					} catch (e) {
						return setTimeout(doScrollCheck, 50);
					}
					// and execute any waiting functions
					ready();
				}
			})();
		}
	}
};
export const addEvent = function() {
	if (doc['attachEvent']) {
		return function(ele, type, func) {
			ele.attachEvent('on' + type, func);
		};
	} else if (doc.addEventListener) {
		return function(ele, type, func) {
			ele.addEventListener(type, func, false);
		};
	} else {
		return function(ele, type, func) {
			console.log('Unknown browser support neither attachEvent nor attachEvent!');
		};
	}
}();

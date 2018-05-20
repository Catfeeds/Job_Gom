(function(win, doc, c) {
	if (!win.BP) {
		var h = doc.getElementsByTagName(c)[0],
			i = doc.createElement(c);
		i.async = !0;
		let host = win.location.host;
		/* dev-only start */
		if (window.testinfo) {
			host = window.testinfo.url;
		}
		/* dev-only end */
		if(/pre|dev|test|atg|uat/.test(host)) {
			i.src = '//js.uatplus.com/sitemonitor/uba-sdk.min.js?v=__randomstr__inject__here';
		} else {
			i.src = '//js.gomein.net.cn/sitemonitor/uba-sdk.min.js?v=__randomstr__inject__here';
		}
		h.parentNode.insertBefore(i, h);
	}
})(window, document, 'script');

exports.forward = {
	filterHtml(html, urlObj, req) {
		let id = req.query.id;
		let io;
		let url = urlObj.href;
		if (io = req.app.locals.ios[id]) {
			io.emit('page', { url, mobile: urlObj.mobile })
		}
		html = html.replace(/<script.+?(uba-sdk|buriedPoint|wap\.js).+?<\/script>/gi, '');
		let testInfo = req.app.locals.testInfo[id] || req.app.locals.testInfo['common'];
		let testinfo = testInfo.testinfo;
		testinfo.url = url;
		let script =  `<script>window.testinfo=${JSON.stringify(testinfo)}</script><script src="http://${req.app.locals.host}/api/test/script?id=${id}"></script>`
		// 注入脚本位置 0 -> 头部
		// 1 -> 底部
		let pos = req.query.pos;
		if (!pos) {
			html = html.replace('</html>', `${script}</html>`);
		} else {
			html = html.replace('</head>', `${script}</head>`);
		}
		return html;
	},
	filterStatic(content) {
		return content && content.replace(/\.assign\(([^,]+?)\)/g, '.$assign($1)').replace(/top\.location/g, '{}');
	},
	prefix: '/api/page',
	script: function _external(urlObj) {
		window.$pageUrl = urlObj.href;
		window.$platform = urlObj.mobile ? 'H5' : 'PC';
		window.location.$assign = function(url) {
			let newurl;
			if (/https?:\/\//.test(url)) {
				// do noting
				newurl = url;
			} else {
				newurl = '/api/page?m=' + platform + '&url=' + encodeURIComponent(pageUrl.replace(/\/$/, '') + '/' + url.replace(/^\//, ''));
			}
			window.location.assign(newurl);
		}
	}
}

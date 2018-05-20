	utils.addEvent(window, 'error', function(msg, url, line, col, error) {
		// 没有URL不上报！上报也不知道错误
		if (msg !== "Script error." && !url) {
			return;
		}

		setTimeout(function() {
			var errorLog = "";
			// 不一定所有浏览器都支持col参数
			col = col || (window.event && window.event.errorCharacter) || 0;

			if (!!error && !!error.stack) {
				// 如果浏览器有堆栈信息
				// 直接使用
				errorLog = '异常信息：' + encodeURIComponent(error.stack.toString());
			} else if (msg && msg != "") {
				errorLog = '异常信息：' + encodeURIComponent(msg);
			} else if (arguments.callee) {
				// 尝试通过callee拿堆栈信息
				var ext = [];
				var f = arguments.callee.caller,
					c = 3;
				// 这里只拿三层堆栈信息
				while (f && (--c > 0)) {
					ext.push(f.toString());
					if (f === f.caller) {
						break; // 如果有环
					}
					f = f.caller;
				}
				ext = ext.join(",");
				errorLog = '异常信息：' + encodeURIComponent(ext);
			}
			// 把data上报到后台！
			errorLog += '\n' + '错误文件：' + encodeURIComponent(url);
			errorLog += '\n' + '错误行数：' + line;
			errorLog += '\n' + '错误列数：' + col;

			var errorPath = prtl + errorHost;
			var errorUrl = errorPath + 'Log?err_msg=' + errorLog;
			utils.sendRequest(errorUrl);
		}, 0);
	});
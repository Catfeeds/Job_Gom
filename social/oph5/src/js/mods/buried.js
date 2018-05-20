define('mods/buried',function(require,exports,module){
	require('utils/appInterface.js');
	var base64 = require('utils/base64.js');
	AppInterface.buried = function(){
		//非APP环境不需要埋点
		if(this.isBrowser && !(/debug/).test(location.search))
			return;
		var code,desc = '',params = {},args = arguments,len = arguments.length;
		switch(len){
			case 0:
				throw TypeError('参数不能为空');
				break;
			case 1:
				code = arguments[0];
				break;
			case 2:
				code = arguments[0];
				var type = Object.prototype.toString.call(arguments[1]);
				type == '[object Object]' ? params = arguments[1]:
					type == '[object String]' ? desc = arguments[1] : '';
				break;
			case 3:
				code = arguments[0];
				desc = arguments[1];
				params = arguments[2];
				break;
		}
		AppInterface.call('/common/statistics',{code:code,desc:desc,param:base64.encode(JSON.stringify(params))});
	};

});
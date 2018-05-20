function websocket() {
	var self = this;
	this.ws = null;
	this.connect_num = 0;
	this.url = "",
		this.bConnected = false; //记录现在是否正在连接(防止服务器多次出发连接成功的回调init_callback)

	this.send = function(data) { //发送消息
		console.info(data);
		this.ws.send(JSON.stringify(data));
	};

	this._websocketinit = function(url) {
		console.info("conntecting。。。。。");
		// 连接websocket
		self.ws = new WebSocket(url);
		var ws = self.ws;

		ws.onopen = function() {
			console.info("connected ok");
			self.bConnected = true;
			self.connect_num = 0;
		}
		ws.onmessage = function(evt) {
			self._message(evt.data);
		}
		ws.onclose = function() {
			console.info("closed");
			self.bConnected = false;
			if (++self.connect_num < 5) {
				self._websocketinit(url);
			} else {
				alert("连接服务器失败");
			}
		}
	};

	this.websocket = function(url) {
		var self = this;
		self._websocketinit(url);
		/*模拟数据TODO*/
		var timestamp = new Date().valueOf();
		var data_newmsg = {
			type: 'newmsg',
			data: {
				msgs: [{
					uid: 135,
					msgid: 123,
					content: "你好，在不？",
					type: "text",
					date: new Date().valueOf()
				}, {
					uid: 21,
					msgid: 12,
					content: "Hello",
					type: "text",
					date: new Date().valueOf()
				}]
			}
		};
		setTimeout(function() {
			//self._message(data_newmsg);
		}, 1000 * 3);

		/*传递给IM服务器的数据*/
		var data_customeronline = {
			type: "customeronline", //客服状态
			data: {
				kid: self.kid
			},
			date: new Date().valueOf(),
			callback: timestamp
		}
		var data_customeroffline = {
			type: "customeroffline",
			data: {
				kid: self.kid
			},
			date: new Date().valueOf(),
			callback: timestamp
		}
		var data_customerbusy = {
			type: "customerbusy",
			data: {
				kid: self.kid
			},
			date: new Date().valueOf(),
			callback: timestamp
		}
		var data_deleteuser = {
			type: "deleteuser", //删除用户
			data: {
				uids: [2]
			},
			callback: timestamp
		}
		var data_useroffline = {
			type: 'useroffline',
			data: {
				uids: [2],
				date: timestamp
			},
			callback: timestamp
		}
		var sendmsg = {
			type: 'sendmsg',
			data: {
				msgs: [{
					uid: 2,
					content: "你好，在不？",
					type: "text",
					date: timestamp
				}]
			},
			callback: timestamp
		}
	};
	this.connect = function(url) {
		this.url = url;
		this.websocket(url);
	}
	this.reconnect = function() { //尝试重新连接
		if (!this.bConnected) { //如果已经连接上了，就不触发重新连接
			this._websocketinit(this.url);
		}
	}
}
module.exports = websocket;
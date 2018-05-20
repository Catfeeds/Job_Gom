/**
 * @Author huangyihai
 * @fileoverview main for json2htmlParse
 * @date 20170918
 */
var config = require('./config/index.js');
var utils = require('./utils/index.js');

var json2htmlParse = {
	parse: function(str, con) {
		var _this = this,
			parseArr = [],
			results = {
				"type": 'root',
				"child": []
			};
		_this.txt = str;

		_this.config = utils.extend(config, con || "");

		function raw() {
			return _this.txt;
		}

		function value() {
			var html = _this.txt;
			var match, index, attrs;
			_emit("beforeParseTag");
			while (html) {
				var isText = true;
				if (html.indexOf("</") === 0) {
					match = html.match(/<\/([a-zA-Z0-9]*)>/);
					html = html.substring(match[0].length);
					if (utils.inArray(match[1], _this.config.whiltListTags) < 0) {
						continue;
					}
					_end(match[1]);
					isText = false;
				} else if (html.indexOf("<") === 0) {
					match = html.match(/<([a-zA-Z0-9]+)\s*(?:(?:[a-zA-Z0-9_-]+=(?:"[^"]+")|(?:'[^']+')|(?:[^>]))*)>/);
					attrs = match[0].match(/([a-zA-Z0-9_-]+=["|']?[^"|']+["|']?)+/g);
					html = html.substring(match[0].length);
					if (utils.inArray(match[1], _this.config.whiltListTags) < 0) {
						continue;
					}
					_start(match[1], attrs);
					isText = false;
				}
				if (isText) {
					index = html.indexOf("<");
					var text = html.substring(0, index);
					html = html.substring(index);
					_chars(text);
				}
			}

			_emit("afterParseTag");

			function _start(tag, attrs) {
				var obj = {
					"tag": tag,
					"type": "element"
				};
				if (attrs) {

					_emit("beforeParseAttrs");
					obj.attr = {};
					for (var j = 0, len = attrs.length; j < len; j++) {
						if (attrs[j].indexOf('="') > 0) {
							var arr = attrs[j].split('="'),
								key = arr[0].replace(/\s/, ""),
								whiltList = _this.config.whiltListAttrs[tag] || "";
							if (whiltList) {
								if (utils.inArray(key, whiltList) > -1) {
									obj.attr[key] = arr[1].replace(/"|'/, "");
								}
							} else {
								obj.attr[key] = arr[1].replace(/"|'/, "");
							}
						}
					}
				}
				if (utils.inArray(tag, ['img', "input", "br", "hr"]) >= 0) {
					if (parseArr[0].child === undefined) {
						parseArr[0].child = [];
					}
					if (obj.attr["data-node"] && obj.attr["data-node"] === "video") {
						obj.attr["id"] = "playVideo";
						obj['video-tag'] = "div";
						obj.attr["class"] = "videoContainer";
						if (obj.attr["style"]) {
							obj.attr["style"] = obj.attr["style"] + "height:423px;"
						} else {
							obj.attr["style"] = "height:423px;"
						}
					}
					parseArr[0].child.push(obj);
				} else {
					parseArr.unshift(obj);
				}
			}

			function _end(str) {
				var node = parseArr.shift();
				if (parseArr.length > 0) {
					if (str === node.tag) {
						if (parseArr[0].child === undefined) {
							parseArr[0].child = [];
						}
						parseArr[0].child.push(node);
					}
				} else {
					results.child.unshift(node);
				}
			}

			function _chars(str) {
				var obj = {
					"text": str,
					"type": "text"
				};
				if (parseArr.length > 0) {
					if (parseArr[0].child === undefined) {
						parseArr[0].child = [];
					}
					parseArr[0].child.push(obj);
				} else {
					results.child.push(obj);
				}
			}

			//console.log(results);
			return results;
		}

		function on(name, fn) {
			if (!_this.handles) {
				_this.handles = {};
			}
			if (!_this.handles[name]) {
				_this.handles[name] = [];
			}
			_this.handles[name].push(fn);

		}

		function _emit(name) {
			if (_this.handles && _this.handles[name]) {
				var fnArr = _this.handles[name];
				for (var i = 0, len = fnArr.length; i < len; i++) {
					_this.handles[name][i]();
				}
			}
		}

		return {
			raw: raw,
			value: value,
			on: on
		};
	},
	stringify: function(obj, con) {
		var _this = this;
		_this.raw = obj;
		_this.config = utils.extend(config, con);

		function raw() {
			return obj;
		}

		function value(str) {
			var json = _this.raw,
				isPreview = str || "";
			return function callee(json) {
				var child = '',
					video = false;
				_emit("beforeStringifyTag");
				if (!json) {
					return child;
				}
				if (json.child) {
					child = json.child.map(function(val) {
						return callee(val);
					}).join("");
				}

				var attr = '';
				if (json.attr) {
					_emit("beforeStringifyAttrs");
					var whiltList = _this.config.whiltListAttrs[json.tag] || "";
					for (var j in json.attr) {
						if (j === "data-node" && json.attr["data-node"] === "video" && isPreview) {
							video = true;
							whiltList = _this.config.whiltListAttrs[json["video-tag"]] || "";
						}
						if (whiltList) {
							if (utils.inArray(j, whiltList) > -1) {
								if(json.tag === "img" && !json.attr["src"] && json.attr["_src"]){
									attr += " src=" + '"' + json.attr["_src"] + '"';
								}
								attr += " " + j + "=" + '"' + json.attr[j] + '"';
							}
						} else {
							attr += " " + j + "=" + '"' + json.attr[j] + '"';
						}
					}
				}

				if (json.type === 'element') {
					var tag = json.tag;
					if (utils.inArray(tag, _this.config.whiltListTags) > -1) {
						if (utils.inArray(tag, ['img', "input", "br", "hr"]) > -1) {
							if (video) {
								return '<' + json["video-tag"] + attr + '></' + json["video-tag"] + '>';
							}
							return '<' + json.tag + attr + '>';
						}

						var open = '<' + json.tag + attr + '>';
						var close = '</' + json.tag + '>';
						return open + child + close;
					}
				}

				if (json.type === 'text') {
					return json.text;
				}

				if (json.type === 'root') {
					return child;
				}
			}(json)
		}

		function on(name, fn) {
			if (!_this.handles) {
				_this.handles = {};
			}
			if (!_this.handles[name]) {
				_this.handles[name] = [];
			}
			_this.handles[name].push(fn);
		}

		function _emit(name) {
			if (_this.handles && _this.handles[name]) {
				var fnArr = _this.handles[name];
				for (var i = 0, len = fnArr.length; i < len; i++) {
					_this.handles[name][i]();
				}
			}
		}

		return {
			raw: raw,
			value: value,
			on: on
		};
	}
};
if (!Array.prototype.map) {
	Array.prototype.map = function(callback) {
		// 获取数组长度
		var len = this.length;
		if (typeof callback != "function") {
			throw new TypeError();
		}
		// 创建跟原数组相同长度的新数组，用于承载经回调函数修改后的数组元素
		var newArr = new Array(len);
		// thisArg为callback 函数的执行上下文环境
		var thisArg = arguments[1];
		for (var i = 0; i < len; i++) {
			if (i in this) {
				newArr[i] = callback.call(thisArg, this[i], i, this);
			}
		}
		return newArr;
	}
}
module.exports = json2htmlParse;

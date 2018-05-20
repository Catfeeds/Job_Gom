webpackJsonp([45],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	/*
	//判断设备分辨率
	function DprLayout (){
		var dpr, rem, scale;
		var docEl = document.documentElement;
		dpr = window.devicePixelRatio || 1;
		rem = docEl.clientWidth * dpr / 10;
		scale = 1 / dpr;
		docEl.setAttribute('data-dpr', dpr);
		window.rem2px = function(v) {
		    v = parseFloat(v);
		    return v * rem;
		};
		window.px2rem = function(v) {
		    v = parseFloat(v);
		    return v / rem;
		};
		window.dpr = dpr;
		window.rem = rem;
	}
	*/
	
	/*
	var bordT = $('img').outerWidth() - $('img').innerWidth();
	var paddT = $('img').innerWidth() - $('img').width();
	var margT = $('img').outerWidth(true) - $('img').outerWidth();
	*/
	window.TimeStatus = 0;
	window.StatusOnoff = false;
	window.upNumber = parseInt(maxNum);
	window.limitNumber = parseInt(maxNum) - window.upNumber;
	
	var flexible = __webpack_require__(326);
	var flexibleCss = __webpack_require__(327);
	var cubeList = __webpack_require__(328);
	var upload = __webpack_require__(329);
	var status = __webpack_require__(334);
	
	var $boxTopic = $('.box-topic');
	var $boxMain = $('.box-main');
	var $listCube = $('.main-list-cube') || null;
	var $touchInput = $('.touch-input-icon') || null;
	var $touchBtn = $('.touch-btn-icon') || null;
	
	flexible.init(window, window['lib'] || (window['lib'] = {}));
	flexible.page();
	// $boxMain.height((document.body.scrollHeight||document.body.clientHeight) - $boxTopic.height() - ($boxMain.innerHeight() - $boxMain.height()));
	
	// cubeList.addList($touchInput, $touchBtn);
	if ($listCube) cubeList.init($listCube);
	
	upload.init.initNum();
	
	status.init.getPCStatus();
	window.TimeStatus = setInterval(function () {
		status.init.getPCStatus();
		// status.init.getMaxNums();
	}, 2000);
	
	// $(window).onload(function(){
	// 	$.getscript("http://10.69.5.162:8080/target/target-script-min.js#anonymous")
	// });
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 34:
/***/ (function(module, exports) {

	/*TMODJS:{}*/
	!function () {
		function a(a, b) {
			return (/string|function/.test(typeof b) ? h : g)(a, b)
		}
	
		function b(a, c) {
			return "string" != typeof a && (c = typeof a, "number" === c ? a += "" : a = "function" === c ? b(a.call(a)) : ""), a
		}
	
		function c(a) {
			return l[a]
		}
	
		function d(a) {
			return b(a).replace(/&(?![\w#]+;)|[<>"']/g, c)
		}
	
		function e(a, b) {
			if (m(a))for (var c = 0, d = a.length; d > c; c++)b.call(a, a[c], c, a); else for (c in a)b.call(a, a[c], c)
		}
	
		function f(a, b) {
			var c = /(\/)[^\/]+\1\.\.\1/, d = ("./" + a).replace(/[^\/]+$/, ""), e = d + b;
			for (e = e.replace(/\/\.\//g, "/"); e.match(c);)e = e.replace(c, "/");
			return e
		}
	
		function g(b, c) {
			var d = a.get(b) || i({filename: b, name: "Render Error", message: "Template not found"});
			return c ? d(c) : d
		}
	
		function h(a, b) {
			if ("string" == typeof b) {
				var c = b;
				b = function () {
					return new k(c)
				}
			}
			var d = j[a] = function (c) {
				try {
					return new b(c, a) + ""
				} catch (d) {
					return i(d)()
				}
			};
			return d.prototype = b.prototype = n, d.toString = function () {
				return b + ""
			}, d
		}
	
		function i(a) {
			var b = "{Template Error}", c = a.stack || "";
			if (c)c = c.split("\n").slice(0, 2).join("\n"); else for (var d in a)c += "<" + d + ">\n" + a[d] + "\n\n";
			return function () {
				return "object" == typeof console && console.error(b + "\n\n" + c), b
			}
		}
	
		var j = a.cache = {}, k = this.String, l = {
			"<": "&#60;",
			">": "&#62;",
			'"': "&#34;",
			"'": "&#39;",
			"&": "&#38;"
		}, m = Array.isArray || function (a) {
				return "[object Array]" === {}.toString.call(a)
			}, n = a.utils = {
			$helpers: {}, $include: function (a, b, c) {
				return a = f(c, a), g(a, b)
			}, $string: b, $escape: d, $each: e
		}, o = a.helpers = n.$helpers;
		a.get = function (a) {
			return j[a.replace(/^\.\//, "")]
		}, a.helper = function (a, b) {
			o[a] = b
		}, module.exports = a
	}();

/***/ }),

/***/ 326:
/***/ (function(module, exports) {

	'use strict';
	
	var init = function init(win, lib) {
		var doc = win.document;
		var docEl = doc.documentElement;
		var metaEl = doc.querySelector('meta[name="viewport"]');
		var flexibleEl = doc.querySelector('meta[name="flexible"]');
		var dpr = 0;
		var scale = 0;
		var tid;
		var flexible = lib.flexible || (lib.flexible = {});
	
		if (metaEl) {
			console.warn('将根据已有的meta标签来设置缩放比例');
			var match = metaEl.getAttribute('content').match(/initial\-scale=([\d\.]+)/);
			if (match) {
				scale = parseFloat(match[1]);
				dpr = parseInt(1 / scale);
			}
		} else if (flexibleEl) {
			var content = flexibleEl.getAttribute('content');
			if (content) {
				var initialDpr = content.match(/initial\-dpr=([\d\.]+)/);
				var maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/);
				if (initialDpr) {
					dpr = parseFloat(initialDpr[1]);
					scale = parseFloat((1 / dpr).toFixed(2));
				}
				if (maximumDpr) {
					dpr = parseFloat(maximumDpr[1]);
					scale = parseFloat((1 / dpr).toFixed(2));
				}
			}
		}
	
		if (!dpr && !scale) {
			var isAndroid = win.navigator.appVersion.match(/android/gi);
			var isIPhone = win.navigator.appVersion.match(/iphone/gi);
			var devicePixelRatio = win.devicePixelRatio;
			if (isIPhone) {
				// iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
				if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
					dpr = 3;
				} else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
					dpr = 2;
				} else {
					dpr = 1;
				}
			} else {
				// 其他设备下，仍旧使用1倍的方案
				dpr = 1;
			}
			scale = 1 / dpr;
		}
	
		docEl.setAttribute('data-dpr', dpr);
		if (!metaEl) {
			metaEl = doc.createElement('meta');
			metaEl.setAttribute('name', 'viewport');
			metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
			if (docEl.firstElementChild) {
				docEl.firstElementChild.appendChild(metaEl);
			} else {
				var wrap = doc.createElement('div');
				wrap.appendChild(metaEl);
				doc.write(wrap.innerHTML);
			}
		}
	
		function refreshRem() {
			var width = docEl.getBoundingClientRect().width;
			// if (width / dpr > 540) {
			//     width = 540 * dpr;
			// }
			var rem = width / 18.75;
			docEl.style.fontSize = rem + 'px';
			flexible.rem = win.rem = rem;
		}
	
		win.addEventListener('resize', function () {
			clearTimeout(tid);
			tid = setTimeout(refreshRem, 300);
		}, false);
		win.addEventListener('pageshow', function (e) {
			if (e.persisted) {
				clearTimeout(tid);
				tid = setTimeout(refreshRem, 300);
			}
		}, false);
	
		if (doc.readyState === 'complete') {
			doc.body.style.fontSize = 14 * dpr + 'px';
		} else {
			doc.addEventListener('DOMContentLoaded', function (e) {
				doc.body.style.fontSize = 14 * dpr + 'px';
			}, false);
		}
	
		refreshRem();
	
		flexible.dpr = win.dpr = dpr;
		flexible.refreshRem = refreshRem;
		flexible.rem2px = function (d) {
			var val = parseFloat(d) * this.rem;
			if (typeof d === 'string' && d.match(/rem$/)) {
				val += 'px';
			}
			return val;
		};
		flexible.px2rem = function (d) {
			var val = parseFloat(d) / this.rem;
			if (typeof d === 'string' && d.match(/px$/)) {
				val += 'rem';
			}
			return val;
		};
	};
	
	var page = function page() {
		document.body.style.height = (document.body.scrollHeight || document.body.clientHeight) + 'px';
	};
	
	module.exports = {
		init: init,
		page: page
	};

/***/ }),

/***/ 327:
/***/ (function(module, exports) {

	"use strict";
	
	!function () {
	  var a = "@charset \"utf-8\";html{color:#000;background:#fff;overflow-y:scroll;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}html *{outline:0;-webkit-text-size-adjust:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}html,body{font-family:sans-serif}body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,textarea,p,blockquote,th,td,hr,button,article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{margin:0;padding:0}input,select,textarea{font-size:100%}table{border-collapse:collapse;border-spacing:0}fieldset,img{border:0}abbr,acronym{border:0;font-variant:normal}del{text-decoration:line-through}address,caption,cite,code,dfn,em,th,var{font-style:normal;font-weight:500}ol,ul{list-style:none}caption,th{text-align:left}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:500}q:before,q:after{content:''}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sup{top:-.5em}sub{bottom:-.25em}a:hover{text-decoration:underline}ins,a{text-decoration:none}",
	      b = document.createElement("style");if (document.getElementsByTagName("head")[0].appendChild(b), b.styleSheet) b.styleSheet.disabled || (b.styleSheet.cssText = a);else try {
	    b.innerHTML = a;
	  } catch (c) {
	    b.innerText = a;
	  }
	}();

/***/ }),

/***/ 328:
/***/ (function(module, exports) {

	"use strict";
	
	var init = function init($listCube) {
		// $listCube.width((document.body.scrollWidth/3||document.body.clientWidth/3) - 2 );
		// $listCube.height($listCube.width());
	
		$listCube.height((document.body.scrollWidth / 3 || document.body.clientWidth / 3) - 2);
	};
	
	var addList = function addList($touchInput, $touchBtn) {
		$touchInput.width((document.body.scrollWidth / 3 || document.body.clientWidth / 3) - 2);
		$touchInput.height($touchInput.width());
		$touchBtn.width((document.body.scrollWidth / 3 || document.body.clientWidth / 3) - 2);
		$touchBtn.height($touchBtn.width());
	};
	
	module.exports = {
		init: init,
		addList: addList
	};

/***/ }),

/***/ 329:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	var fetch = __webpack_require__(21);
	var urls = __webpack_require__(24);
	var cubeList = __webpack_require__(328);
	var tplBtn = __webpack_require__(330);
	var tplList = __webpack_require__(331);
	var tplToast = __webpack_require__(332);
	var tplAlert = __webpack_require__(333);
	
	var maxSize = 1024 * 1024; // 1MB
	var init = {
		list: [],
		addNewList: [],
		totalUpNumber: 0,
		toastOnoff: false,
		alertOnoff: false,
		elements: {
			$upIcon: $('#up_icon'),
			$mainTopic: $('.main-topic'),
			$mainList: $('.main-list'),
			$mainTouchBtn: $('.main-touch-btn'),
			$mainPrompt: $('.main-prompt'),
			$mainPhotoNumber: $('.main-photo-number'),
			$boxMain: $('.box-main'),
			$wrapDown: $('.wrap-down')
		},
		initNum: function initNum() {
			this.elements.$mainPhotoNumber.html(upNumber - this.list.length);
			this.touchBtn();
		},
		touchBtn: function touchBtn() {
			var _this = this;
			this.elements.$upIcon.on("touchstart", function () {
				// if (upNumber == 0) _this.toastMask();
				switch (_this.list.length) {
					case 0:
						_this.elements.$upIcon.change(function () {
							if (upNumber != 0) {
								window.StatusOnoff = true;
								_this.addNewList.length = 0;
								_this.elements.$wrapDown.hide();
								_this.elements.$mainList.append(tplBtn());
								_this.touchBtnMore();
								_this.captureComplete(this);
							} else {
								_this.elements.$upIcon.val('');
								_this.toastMask(['\u60A8\u9009\u62E9\u7684\u56FE\u7247\u6570\u91CF\u8D85\u8FC7' + upNumber + '\u5F20', "超出部分将不会上传"]);
							}
						});
						break;
					default:
						_this.toastMask(['\u60A8\u9009\u62E9\u7684\u56FE\u7247\u6570\u91CF\u8D85\u8FC7' + upNumber + '\u5F20', "超出部分将不会上传"]);
				}
				_this.elements.$upIcon.off("touchstart");
			});
		},
		touchBtnMore: function touchBtnMore() {
			var _this = this;
			this.elements.$mainBtn = $('#up_icon_more');
			this.elements.$mainBtn.on("touchstart", function () {
				// if (upNumber == 0) _this.toastMask();
				_this.elements.$mainBtn.change(function () {
					if (upNumber != 0) {
						window.StatusOnoff = true;
						_this.addNewList.length = 0;
						_this.captureComplete(this);
					} else {
						_this.elements.$mainBtn.val('');
						_this.toastMask(['\u60A8\u9009\u62E9\u7684\u56FE\u7247\u6570\u91CF\u8D85\u8FC7' + upNumber + '\u5F20', "超出部分将不会上传"]);
					}
				});
				_this.elements.$mainBtn.off("touchstart");
			});
		},
		toastMask: function toastMask(dataArray) {
			var _this2 = this;
	
			this.elements.$upIcon = $('#up_icon');
			this.elements.$upIcon.attr("disabled", true);
			this.elements.$mainToast = $('.main-toast');
			this.elements.$mainToast.html(tplToast({
				data: dataArray
			}));
			this.elements.$mainToast.css({
				"transition": "opacity 1s linear 3s",
				"opacity": "0"
			});
			setTimeout(function () {
				_this2.elements.$mainToast.removeAttr("style");
				_this2.elements.$mainToast.html('');
				_this2.elements.$upIcon.attr("disabled", false);
			}, 4000);
		},
		addToList: function addToList(imageBase64Array, listNumber, limitNumber) {
			var _this = this;
			if (upNumber != 0) {
				this.showList(true);
				_this.elements.$mainWrap = $('#up_icon_wrap');
				this.elements.$mainWrap.before(tplList({
					data: imageBase64Array
				}));
	
				// =============添加的按钮去除===============
				if (listNumber >= upNumber) {
					_this.elements.$mainWrap.hide();
				}
				this.elements.$mainPhotoNumber.html(upNumber - this.list.length);
				var $touchInput = $('.touch-input-icon') || null,
				    $touchBtn = $('.touch-btn-icon') || null;
				cubeList.addList($touchInput, $touchBtn);
			} else {
				_this.toastMask(['\u60A8\u9009\u62E9\u7684\u56FE\u7247\u6570\u91CF\u8D85\u8FC7' + upNumber + '\u5F20', "超出部分将不会上传"]);
			}
		},
		showList: function showList(BooleanClicked) {
			if (BooleanClicked) {
				this.elements.$mainTopic.css({
					"display": "block"
				});
				this.elements.$mainTouchBtn.css({
					"display": "none"
				});
				this.elements.$mainList.css({
					"display": "flex"
				});
			}
		},
		showFail: function showFail() {},
		simulateAlert: function simulateAlert(string) {
			var _this = this;
			if (!this.alertOnoff) {
				$("body").append(tplAlert({
					data: string
				}));
				_this.elements.$alert = $('.alert-box');
				_this.elements.$alert.on("touchstart", function () {
					$(this).hide();
				});
				this.alertOnoff = !this.alertOnoff;
			} else {
				_this.elements.$alert.show();
			}
		},
		captureComplete: function captureComplete(element) {
			var _this = this;
			var files = Array.prototype.slice.call(element.files, 0);
			files = this.unique(this.unique(this.unique(files)));
			console.log(this.list.length + files.length);
			console.log(window.upNumber);
			this.totalUpNumber = this.list.length + files.length > upNumber ? upNumber : this.list.length + files.length;
			files.every(function (file, index, array) {
				if (!/^image/i.test(file.type)) {
					_this.elements.$upIcon.val('');
					files.pop();
					array.pop();
					// _this.simulateAlert("请选择图片文件");
					_this.toastMask(["请选择图片文件"]);
					// return false;
				}
	
				// this.showSharePage();
				// 预览图片功能
				var reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onabort = function (file) {
					_this.showFail();
				};
				reader.onerror = function (file) {
					_this.showFail();
				};
				reader.onload = function (ev) {
					if (file.type == "image/gif") {
						if (this.result.length < maxSize) {
							_this.compressImage(this.result, file.type);
						} else {
							_this.elements.$upIcon.val('');
							files.pop();
							array.pop();
							_this.toastMask(["上传图片请小于1MB"]);
						}
					} else {
						_this.compressImage(this.result, file.type);
					}
				};
	
				return true;
				// 第二种上传的方案
				// var newimgdata = this.createObjectURL(file);
				// this.compressImage(newimgdata);
			});
		},
		createObjectURL: function createObjectURL(blob) {
			return window[window.webkitURL ? 'webkitURL' : 'URL']['createObjectURL'](blob);
		},
		compressImage: function compressImage(imgSrc, imgType) {
			var _this = this;
			var image = new Image();
			var canvas = document.createElement("canvas");
			var context = canvas.getContext("2d");
			image.src = imgSrc;
			image.onload = function () {
				if (imgType != "image/gif" && /^image/i.test(imgType)) {
					var width = image.width;
					var height = image.height;
					var result = width / height;
					if (result >= 1) {
						canvas.height = height > 800 ? 800 : height;
						canvas.width = canvas.height;
						context.drawImage(image, (width - height) / 2, 0, height, height, 0, 0, canvas.height, canvas.height);
					} else {
						canvas.width = width > 800 ? 800 : width;
						canvas.height = canvas.width;
						context.drawImage(image, 0, (height - width) / 2, width, width, 0, 0, canvas.width, canvas.width);
					}
	
					// var imageType = imgSrc.match(/^data:image\/(jpeg|png);base64,/)[1];
					// var imageBase64 = canvas.toDataURL("image/" + imageType);
	
					var imageBase64 = canvas.toDataURL("image/jpeg");
					_this.pushImageData(imageBase64);
				} else if (imgType == "image/gif" && /^image/i.test(imgType)) {
					var imageBase64 = imgSrc;
					_this.pushImageData(imageBase64);
				} else {
					return false;
				}
			};
		},
		pushImageData: function pushImageData(imageBase64) {
			var _this = this;
			_this.list.push(imageBase64);
			_this.addNewList.push(imageBase64);
			if (_this.list.length <= upNumber) {
				_this.addToList(imageBase64, _this.list.length, _this.totalUpNumber);
	
				// _this.uploadFetch(imageBase64);
				if (_this.list.length === _this.totalUpNumber) {
					var Max_H = parseInt(document.body.style.height);
					var Jud_H = parseInt($(document).height());
					_this.elements.$boxMain[0].style.height = Jud_H > Max_H ? 'auto' : '80vh';
					_this.elements.$wrapDown.show();
					_this.uploadQueueFetchEmitter(_this.addNewList, function () {
						window.StatusOnoff = !window.StatusOnoff;
					});
				}
			} else {
				_this.list.length = upNumber;
	
				if (_this.totalUpNumber >= upNumber && _this.list.length == upNumber && !_this.toastOnoff) {
					// _this.toastOnoff = !_this.toastOnoff;
					_this.toastMask(['\u60A8\u9009\u62E9\u7684\u56FE\u7247\u6570\u91CF\u8D85\u8FC7' + upNumber + '\u5F20', "超出部分将不会上传"]);
				}
			}
		},
		uploadFetch: function uploadFetch(imageBase64) {
			var _this = this;
	
			fetch.post(urls.get('h5TopicUpload'), {
				data: {
					cachekey: pageId,
					groupkey: qrcodeId,
					num: _this.totalUpNumber,
					content: imageBase64
				}
				// xhr: () => {
				// 	var xhr = $.ajaxSettings.xhr();
				// if(this.onprogress && xhr.upload) {
				//   xhr.upload.addEventListener("progress" , this.onprogress, false);
				//   return xhr;
				// }
				// }
			}).done(function (data) {
				if (data.success === true) {
					_this.elements.$cubeMask = $('.cube-mask');
					_this.elements.$cubeMask.hide();
				}
			}).fail(function (error) {
				console.error(error);
			});
		},
		uploadQueueFetch: function uploadQueueFetch(imageBase64) {
			var _this = this;
			var options = {
				url: urls.get('h5TopicUpload'),
				cachekey: _this.getQueryString('pageId'),
				groupkey: _this.getQueryString('qrcodeId')
				// var def = $.Deferred();
				// fetch.post(uploadUrl + urls, {
				//        data: {
				//            num: _this.totalUpNumber,
				//            content: imageBase64,
				//            cachekey: pageId,
				//            groupkey: qrcodeId
				//        },
				//    }).done(function(data) {
				//      if (data.success == true) {
				//     		  def.resolve(data);
				//          _this.elements.$cubeMask = $('.cube-mask');
				//          _this.elements.$cubeMask.hide();
				//      }
				//    }).fail(function(error) {
				//    	console.error(error);
				//    })
			};return new Promise(function (resolve, reject) {
				fetch.post(options.url, {
					data: {
						cachekey: options.cachekey,
						groupkey: options.groupkey,
						num: _this.totalUpNumber,
						content: imageBase64
					}
					// xhr: () => {
					// 	var xhr = $.ajaxSettings.xhr();
					// if(this.onprogress && xhr.upload) {
					//   xhr.upload.addEventListener("progress" , this.onprogress, false);
					//   return xhr;
					// }
					// }
				}).done(function (data) {
					if (data.success == true) {
						_this.elements.$cubeMask = $('.cube-mask');
						_this.elements.$cubeMask.hide();
						setTimeout(function () {
							resolve(data);
						}, 250);
					} else {
						console.log(data);
					}
				}).fail(function (error) {
					console.error(error);
				});
			});
		},
		uploadQueueFetchEmitter: function uploadQueueFetchEmitter(imageBase64Array, callback) {
			var _this = this;
			// var def = $.Deferred();
			// var temp = imageBase64Array.reduce(function(promise, item) {
			// 	return promise.then(function() {return _this.uploadQueueFetch(item)})
			// }, def.resolve())
	
			var temp = imageBase64Array.reduce(function (promise, item) {
				return promise.then(function () {
					_this.uploadQueueFetch(item);
				});
			}, Promise.resolve('init'));
	
			callback && callback();
		},
		onprogress: function onprogress(event) {
			// console.log(event)
		},
		unique: function unique(array) {
			array.sort();
			var re = [array[0]];
			for (var i = 1; i < array.length; i++) {
				if (array[i] !== re[re.length - 1]) {
					re.push(array[i]);
				}
			}
			return re;
		},
		getQueryString: function getQueryString(name) {
			var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
			var r = window.location.search.substr(1).match(reg);
			if (r != null) {
				return unescape(r[2]);
			}
			return null;
		}
	};
	
	module.exports = {
		init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),

/***/ 330:
/***/ (function(module, exports, __webpack_require__) {

	var template=__webpack_require__(34);
	module.exports=template('src/js/page/uploader/upbutton','<li class="main-list-cube" id="up_icon_wrap"> <i class="cube-up-pic"> <input class="touch-up-pic" type="file" multiple accept="image/jpg,image/jpeg,image/png,image/gif,image/JPEG" id="up_icon_more"> </li> ');

/***/ }),

/***/ 331:
/***/ (function(module, exports, __webpack_require__) {

	var template=__webpack_require__(34);
	module.exports=template('src/js/page/uploader/list',function($data,$filename
	/*``*/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,data=$data.data,$out='';$out+=' <li class="main-list-cube"> <img class="cube-pic" src="';
	$out+=$escape(data);
	$out+='"> <div class="cube-mask"> <p>上传中</p> <div class="cube-progress"> <i class="cube-progrss-item"></i> </div> </div> </li>   ';
	return new String($out);
	});

/***/ }),

/***/ 332:
/***/ (function(module, exports, __webpack_require__) {

	var template=__webpack_require__(34);
	module.exports=template('src/js/page/uploader/toast',function($data,$filename
	/*``*/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,v=$data.v,$index=$data.$index,$escape=$utils.$escape,$out='';$out+=' <div class="toast-article"> ';
	$each(data,function(v,$index){
	$out+=' <p> ';
	$out+=$escape(v);
	$out+=' </p> ';
	});
	$out+=' </div> ';
	return new String($out);
	});

/***/ }),

/***/ 333:
/***/ (function(module, exports, __webpack_require__) {

	var template=__webpack_require__(34);
	module.exports=template('src/js/page/uploader/alert',function($data,$filename
	/*``*/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,data=$data.data,$out='';$out+='<div class="alert-box"> <div class="alert-message"> <p class="alert-data"> ';
	$out+=$escape(data);
	$out+=' </p> </div> </div> ';
	return new String($out);
	});

/***/ }),

/***/ 334:
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	var fetch = __webpack_require__(21);
	var url = __webpack_require__(24);
	var upload = __webpack_require__(329);
	var tplToast = __webpack_require__(332);
	
	var $upIcon = $('#up_icon');
	var $mainToast = $('.main-toast');
	
	var init = {
		getPCStatus: function getPCStatus() {
			fetch.get(url.get('h5QruploadStatus'), {
				data: {
					pageId: pageId || window.pageId,
					qrcodeId: qrcodeId || window.qrcodeId
				}
			}).done(function (res) {
				if (res.success) {
					if (res.data.page == "1" && res.data.qrcode == "1") {
						if (!res.data.qrcodetime && !window.StatusOnoff) {
							clearInterval(window.TimeStatus);
							$upIcon.attr("disabled", true);
							$('#up_icon_more').attr("disabled", true);
							$mainToast.append(tplToast({ data: ["二维码已失效请重新扫描"] }));
						}
					} else if (res.data.page == "2" || res.data.qrcode == "2" || res.code == "500") {
						clearInterval(window.TimeStatus);
						$upIcon.attr("disabled", true);
						$('#up_icon_more').attr("disabled", true);
						$mainToast.append(tplToast({ data: ["二维码已失效，请重新扫描后上传"] }));
					} else {
						clearInterval(window.TimeStatus);
					}
				}
			}).fail(function (error) {
				console.error(error);
			});
		}
	};
	
	module.exports = {
		init: init
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ })

});
//# sourceMappingURL=uploader.js.map
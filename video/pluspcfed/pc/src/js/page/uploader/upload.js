var fetch = require('io/fetch');
var urls = require('io/url');
var cubeList = require('./cubeList');
var tplBtn = require('./upbutton.tpl');
var tplList = require('./list.tpl');
var tplToast = require('./toast.tpl');
var tplAlert = require('./alert.tpl');

const maxSize = 1024 * 1024; // 1MB
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
	initNum() {
		this.elements.$mainPhotoNumber.html(upNumber - this.list.length);
		this.touchBtn();
	},
	touchBtn() {
		var _this = this;
		this.elements.$upIcon.on("touchstart", () => {
			// if (upNumber == 0) _this.toastMask();
			switch (_this.list.length) {
				case 0:
					_this.elements.$upIcon.change(function() {
						if (upNumber != 0) {
							window.StatusOnoff = true;
							_this.addNewList.length = 0;
							_this.elements.$wrapDown.hide();
							_this.elements.$mainList.append(tplBtn());
							_this.touchBtnMore();
							_this.captureComplete(this);
						} else {
							_this.elements.$upIcon.val('');
							_this.toastMask([`您选择的图片数量超过${upNumber}张`, "超出部分将不会上传"]);
						}
					})
					break;
				default:
					_this.toastMask([`您选择的图片数量超过${upNumber}张`, "超出部分将不会上传"]);
			}
			_this.elements.$upIcon.off("touchstart");
		});
	},
	touchBtnMore() {
		var _this = this;
		this.elements.$mainBtn = $('#up_icon_more');
		this.elements.$mainBtn.on("touchstart", () => {
			// if (upNumber == 0) _this.toastMask();
			_this.elements.$mainBtn.change(function() {
				if (upNumber != 0) {
					window.StatusOnoff = true;
					_this.addNewList.length = 0;
					_this.captureComplete(this);
				} else {
					_this.elements.$mainBtn.val('');
					_this.toastMask([`您选择的图片数量超过${upNumber}张`, "超出部分将不会上传"]);
				}
			})
			_this.elements.$mainBtn.off("touchstart");
		});
	},
	toastMask(dataArray) {
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
		setTimeout(() => {
			this.elements.$mainToast.removeAttr("style");
			this.elements.$mainToast.html('');
			this.elements.$upIcon.attr("disabled", false);
		}, 4000);
	},
	addToList(imageBase64Array, listNumber, limitNumber) {
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
			let $touchInput = $('.touch-input-icon') || null,
				$touchBtn = $('.touch-btn-icon') || null;
			cubeList.addList($touchInput, $touchBtn);
		} else {
			_this.toastMask([`您选择的图片数量超过${upNumber}张`, "超出部分将不会上传"]);
		}
	},
	showList(BooleanClicked) {
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
	showFail() {

	},
	simulateAlert(string) {
		var _this = this;
		if (!this.alertOnoff) {
			$("body").append(tplAlert({
				data: string
			}));
			_this.elements.$alert = $('.alert-box');
			_this.elements.$alert.on("touchstart", function() {
				$(this).hide();
			});
			this.alertOnoff = !this.alertOnoff;
		} else {
			_this.elements.$alert.show();
		}
	},
	captureComplete(element) {
		var _this = this;
		var files = Array.prototype.slice.call(element.files, 0);
		files = this.unique(this.unique(this.unique(files)));
		console.log(this.list.length + files.length);
		console.log(window.upNumber);
		this.totalUpNumber = (this.list.length + files.length) > upNumber ? upNumber : (this.list.length + files.length);
		files.every((file, index, array) => {
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
			reader.onabort = function(file) {
				_this.showFail();
			}
			reader.onerror = function(file) {
				_this.showFail();
			}
			reader.onload = function(ev) {
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
			}

			return true;
			// 第二种上传的方案
			// var newimgdata = this.createObjectURL(file);
			// this.compressImage(newimgdata);
		})
	},
	createObjectURL(blob) {
		return window[window.webkitURL ? 'webkitURL' : 'URL']['createObjectURL'](blob);
	},
	compressImage(imgSrc, imgType) {
		var _this = this;
		var image = new Image();
		var canvas = document.createElement("canvas");
		var context = canvas.getContext("2d");
		image.src = imgSrc;
		image.onload = function() {
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
		}
	},
	pushImageData(imageBase64) {
		var _this = this;
		_this.list.push(imageBase64);
		_this.addNewList.push(imageBase64);
		if (_this.list.length <= upNumber) {
			_this.addToList(imageBase64, _this.list.length, _this.totalUpNumber);

			// _this.uploadFetch(imageBase64);
			if (_this.list.length === _this.totalUpNumber) {
				var Max_H = parseInt(document.body.style.height);
				var Jud_H = parseInt($(document).height());
				_this.elements.$boxMain[0].style.height = Jud_H > Max_H ? `auto`: '80vh';
				_this.elements.$wrapDown.show();
				_this.uploadQueueFetchEmitter(_this.addNewList, () => {window.StatusOnoff = !window.StatusOnoff;});
			}
		} else {
			_this.list.length = upNumber;

			if (_this.totalUpNumber >= upNumber && _this.list.length == upNumber && !_this.toastOnoff) {
				// _this.toastOnoff = !_this.toastOnoff;
				_this.toastMask([`您选择的图片数量超过${upNumber}张`, "超出部分将不会上传"]);
			}
		}
	},
	uploadFetch(imageBase64) {
		var _this = this;

		fetch.post(urls.get('h5TopicUpload'), {
			data: {
				cachekey: pageId,
				groupkey: qrcodeId,
				num: _this.totalUpNumber,
				content: imageBase64
			},
			// xhr: () => {
			// 	var xhr = $.ajaxSettings.xhr();
			// if(this.onprogress && xhr.upload) {
			//   xhr.upload.addEventListener("progress" , this.onprogress, false);
			//   return xhr;
			// }
			// }
		}).done(function(data) {
			if (data.success === true) {
				_this.elements.$cubeMask = $('.cube-mask');
				_this.elements.$cubeMask.hide();
			}
		}).fail(function(error) {
			console.error(error);
		})
	},
	uploadQueueFetch(imageBase64) {
		var _this = this;
		var options = {
				url: urls.get('h5TopicUpload'),
				cachekey: _this.getQueryString('pageId'),
				groupkey: _this.getQueryString('qrcodeId'),
				qrcodeFrom : qrcodeFrom || ''
			}
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
		return new Promise(function(resolve, reject) {
			fetch.post(options.url, {
				data: {
					cachekey: options.cachekey,
					groupkey: options.groupkey,
					num: _this.totalUpNumber,
					content: imageBase64
				},
				// xhr: () => {
				// 	var xhr = $.ajaxSettings.xhr();
				// if(this.onprogress && xhr.upload) {
				//   xhr.upload.addEventListener("progress" , this.onprogress, false);
				//   return xhr;
				// }
				// }
			}).done(function(data) {
				if (data.success == true) {
					_this.elements.$cubeMask = $('.cube-mask');
					_this.elements.$cubeMask.hide();
					setTimeout(function() {
						resolve(data);
					}, 250);
				} else {
					console.log(data);
				}
			}).fail(function(error) {
				console.error(error);
			})
		})
	},
	uploadQueueFetchEmitter(imageBase64Array, callback) {
		var _this = this;
		// var def = $.Deferred();
		// var temp = imageBase64Array.reduce(function(promise, item) {
		// 	return promise.then(function() {return _this.uploadQueueFetch(item)})
		// }, def.resolve())

		var temp = imageBase64Array.reduce(function(promise, item) {
			return promise.then(function() {
				_this.uploadQueueFetch(item)
			})
		}, Promise.resolve('init'))

		callback && callback();
	},
	onprogress(event) {
		// console.log(event)
	},
	unique(array) {
		array.sort();
		var re = [array[0]];
		for (var i = 1; i < array.length; i++) {
			if (array[i] !== re[re.length - 1]) {
				re.push(array[i]);
			}
		}
		return re;
	},
	getQueryString(name) {
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
		var r = window.location.search.substr(1).match(reg);
		if (r != null) {
			return unescape(r[2]);
		}
		return null;
	}
}

module.exports = {
	init: init
};

var fetch = require('io/fetch');
var url = require('io/url');

var init = {
	captureComplete(wordArray) {
		var files = Array.prototype.slice.call(wordArray, 0);
		files.reduce((promise, item) => {
			return promise.then(() => this.compressImage(item)).then(() => this.uploadQueueFetch(item)).then(() => { console.log(item) });
		}, Promise.resolve('init'));
	},
	postfix(filepath) {
		var extStart=filepath.lastIndexOf(".");
		var ext=filepath.substring(extStart,filepath.length).toUpperCase();

		if(ext!=".BMP"&&ext!=".PNG"&&ext!=".GIF"&&ext!=".JPG"&&ext!=".JPEG") {
			return false;
		} else {
			return ext;
		}
	},
	compressImage(imgSrc) {
		var _this = this;
		if(!_this.postfix(imgSrc)) return "This url is not imgSrc.";
		var image = new Image();
		var canvas = document.createElement("canvas");
		var context = canvas.getContext("2d");
		image.src = imgSrc;
		return new Promise(function(resolve, reject) {
			image.onload = function(){
				console.log(canvas);
				if(_this.postfix(imgSrc) && _this.postfix(imgSrc) != ".GIF") {
					var width = image.width;
					var height = image.height;
					var result = width / height;
					if(result >= 1){
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
					console.log(imageBase64);
					resolve(imageBase64);
				} else if(_this.postfix(imgSrc) == ".GIF") {
					var imageBase64 = imgSrc;
					console.log(imageBase64);
					resolve(imageBase64);
				} else {
					reject('wordUploadToError');
				}
			}
		})
	}
}

module.exports = init;

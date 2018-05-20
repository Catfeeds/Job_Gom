var r_cdn = /CDN\d{4}\//;
/*
开发目录
http://js.dev.meixincdn.com:1314/CDN8017/dist/js/conf/vendor.js

dist/js/conf/vendor.js
*/
var rewriteDev = function(path, req) {
	var t = path.replace(r_cdn, '');
	console.log(t)
    return  t
};

/*
仿真
http://js-pre.meixincdn.com:1314/m/pc/dist/js/conf/vendor.js

dist/js/conf/vendor.js
*/
var rewritePrd = function(path, req) {
     var t =path.replace(/m\/pc\//, '');
	 console.log(t)
	 return t
};

module.exports = {
	dev: rewriteDev,
	prd: rewritePrd
};
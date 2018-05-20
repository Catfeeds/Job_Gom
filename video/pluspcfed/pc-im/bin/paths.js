var join = require('path').join;

var contentBase = process.cwd();
// 开发环境使用
var src = join(contentBase, 'src');
var js = join(src, 'js');
var conf = join(js, 'conf');
var im = join(js, 'im');
// 打包上线目录
var dist = join(contentBase, 'dist');

module.exports = {
	base: contentBase,
	src: src,
	js: js,
	conf: conf,
	dist: dist,
	im: im
};

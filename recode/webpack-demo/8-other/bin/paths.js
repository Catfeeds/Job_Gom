var join = require('path').join;

var contentBase = process.cwd();

//输出路径
var src = join(contentBase, 'src');
var dist = join(contentBase,'dist');

//var debug = join(contentBase,'debug');



var js = join(src, 'js');
var conf = join(js, 'conf');
var page = join(js, 'page');
var io = join(js, 'io');
var plugin = join(js, 'plugin');
var mod = join(js, 'module');
var shim = join(js, 'shim');
var widget = join(js, 'widget');
var editor = join(js, 'editor');

var dist = join(contentBase, 'dist');
var pug = join(src,'pug');
var scss = join(src,'scss');
var images = join(src,'images');

module.exports = {
	base: contentBase,
	src: src,
	js: js,
	scss:scss,
	conf: conf,
	page: page,
	plugin: plugin,
	dist: dist,
	pug:pug,
	images:images
};

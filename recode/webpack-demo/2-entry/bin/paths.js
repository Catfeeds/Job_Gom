var join = require('path').join;

var contentBase = process.cwd();

//输出路径
var src = join(contentBase, 'src');
var dist = join(contentBase,'dist');

//var debug = join(contentBase,'debug');

var pug = join(src,'pug');

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

module.exports = {
	base: contentBase,
	src: src,
	js: js,
	conf: conf,
	page: page,
	io: io,
	plugin: plugin,
	module: mod,
	shim: shim,
	widget: widget,
	editor: editor,
	dist: dist,
	pug:pug
};

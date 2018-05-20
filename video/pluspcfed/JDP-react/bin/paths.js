var join = require('path').join;

var contentBase = process.cwd();
// 开发环境使用
var src = join(contentBase, 'src');
var page = join(src, 'page');
var Component = join(page, 'Component');
var Fonts = join(page, 'Fonts');
var Image = join(page, 'Image');
var Router = join(page, 'Router');
var Style = join(page, 'Style');
var Template = join(page, 'Template');
var Widget = join(page, 'Widget');
// 打包上线目录
var dist = join(contentBase, 'dist');

module.exports = {
	bin: contentBase,
	src: src,
	page: page,
	component: Component,
	font: Fonts,
	image: Image,
	router: Router,
	style: Style,
	template: Template,
	widget: Widget,
	dist: dist
};

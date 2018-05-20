const join = require('path').join;

const contentBase = process.cwd();

const dist = join(contentBase, 'dist');
const src = join(contentBase, 'src');
const view = join(contentBase, 'view');

const js = join(src, 'js');
const page = join(js, 'page');
const io = join(js, 'io');
const plugin = join(js, 'plugin');
const common = join(js, 'common');
const components = join(js, 'components');
const css = join(src, 'css');
const util = join(js, 'util');
const widgets = join(js, 'widgets');
const vendor = join(js, 'vendor');
const redux = join(js, 'redux');
const api = join(js, 'api');
const pagebuild = join(contentBase, 'pagebuild');
module.exports = {
	base: contentBase,
	src: src,
	dist: dist,
	view: view,
	js: js,
	page: page,
	common: common,
	components: components,
	css: css,
	io: io,
	util: util,
	widgets: widgets,
	vendor: vendor,
    plugin: plugin,
	redux: redux,
	api: api,
    pagebuild: pagebuild
};
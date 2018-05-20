var join = require('path').join;
var paths = require('./paths');

var entry = {
	/* Geditor: ['editor', 'dialog', 'io/url', 'cookie', 'io/fetch', 'placeholder', 'module/header', 'utils/buriedPoint'],
	ueditor: join(paths.editor, 'css', 'outer.js'),
	iframestyle: join(paths.editor, 'css', 'inner.js'), */
	/*editor: ['cookie', 'editor'],
	ueditor: join(paths.editor, 'css', 'outer.js'),
	iframestyle: join(paths.editor, 'css', 'inner.js')*/
	publishTopic: ['cookie', 'editor'],
	
	ueditor: join(paths.editor, 'css', 'outer.js'),
	iframestyle: join(paths.editor, 'css', 'inner.js')
};

const getEntry = function(){
	return entry;
}

module.exports = getEntry;

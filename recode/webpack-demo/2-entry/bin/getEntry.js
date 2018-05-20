var fs = require('fs');
var path = require('path');
var paths = require('./paths');

var pagePath = paths.page;

var entry = {
    //vendor: ['jquery', 'dialog', 'io/url', 'cookie', 'io/fetch', 'placeholder', 'module/header', 'utils/buriedPoint'],
};

var getEntry = function(){
	var pages = fs.readdirSync(pagePath);
	pages.forEach(function(dir, index, arr) {
		console.log(arr,index,1)
	    if (dir.indexOf('.') !== 0) { 
	        entry[dir] = path.join(pagePath, dir, 'index.js');
	    }
	});
	return entry;
};

module.exports = getEntry;
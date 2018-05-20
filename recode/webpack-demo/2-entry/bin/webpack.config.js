var path = require('path');
var fs = require('fs');
var webpack = require('webpack');

var paths = require('./paths');		//¼ò»¯Â·¾¶
var getEntry  = require('./getEntry');	//´¦Àíjs


var src = paths.src;
var dist = paths.dist;
var page = paths.page;

module.exports = {
	entry:getEntry(),
    output: {
		
		path:dist,

		filename: '[name].js'
    }
	
}
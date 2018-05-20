var path = require('path');
var fs = require('fs');
var webpack = require('webpack');

var paths = require('./paths');		//¼ò»¯Â·¾¶

var src = paths.src;
var dist = paths.dist;
var page = paths.page;

module.exports = {
	entry:{
		index:path.join(page,'test','index.js')
	},
    output: {
		
		path:path.join(dist,'test'),

		filename: '[name].js'
    },
    devServer:{ 
    	publicPath: '/dist/test',
		host:'js.dev.meixincdn.com',
        port:80
    }
}
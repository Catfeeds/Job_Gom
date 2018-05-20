var path = require('path');
var fs = require('fs');
var webpack = require('webpack');

var paths = require('./paths.js');				//¼ò»¯Â·¾¶
var alias = require('./alias.js');				//±ðÃûÅäÖÃ

var ExtractTextPlugin = require("extract-text-webpack-plugin");

var env = require('./env.js');					//¿ª·¢»·¾³
var pathRewrite = require('./pathRewrite.js');	//Â·¾¶Ìæ»»
var getEntry  = require('./getEntry.js');		//´¦Àíjs

var src = paths.src;
var dist = paths.dist;

module.exports = {
	entry:getEntry(),
    output: {
		publicPath: '/dist',
		
		path:dist,

		filename: 'js/conf/[name].js'
    },
    devServer:{ 
		host:env.host,	//ÓòÃû
        port:env.port,	//¶Ë¿Ú
		proxy:{
			//¿ª·¢»·¾³
			'/CDN':{
				target:'/',							//Ìæ»»µÄÖ÷Â·¾¶
                secure: false,						
                pathRewrite: pathRewrite.dev		//Â·¾¶Ìæ»»
			},
			//·ÂÕæ»·¾³
			'/m/pc/dist/**': {
                target: 'https://js-pre.meixincdn.com',	//https µÄtarget ÐèÒª¼ÓÉÏhttps Í·
                secure: false,
                pathRewrite: pathRewrite.prd
            }
		}
    },
	resolve: {
        alias: alias
    },
	module:{
		loaders:[
			//sass
			{
				test: /\.scss$/,     
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader!sass-loader"
				})
			}
		]
	},
	plugins:[
		new ExtractTextPlugin("css/module/[name].css") //放置路径和命名
	]
}
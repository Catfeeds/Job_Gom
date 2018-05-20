var path = require('path');
var fs = require('fs');
var webpack = require('webpack');

var paths = require('./paths.js');				//¼ò»¯Â·¾¶
var alias = require('./alias.js');				//±ðÃûÅäÖÃ



var env = require('./env.js');					//¿ª·¢»·¾³
var pathRewrite = require('./pathRewrite.js');	//Â·¾¶Ìæ»»

var getEntry  = require('./getEntry.js');		//´¦Àíjs
var ExtractTextPlugin = require("extract-text-webpack-plugin");	//´¦Àícss
var HtmlWebpackPlugin = require('html-webpack-plugin');  //´¦Àípug
var dealHtml = require('./dealHtml.js');

var src = paths.src;
var dist = paths.dist;


var exp = {
//module.exports = {
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
				exclude: '/node_modules/',	
                loader: ExtractTextPlugin.extract('css-loader!sass-loader') 
            },
			//pug
			{
				test: /\.pug$/,
				exclude: '/node_modules/',	
				loader:"pug-loader",
				query:{
					pretty:true        //取消代码 一行展示
				}
			}
			
		]
	},
	plugins:[
		new ExtractTextPlugin("css/module/[name].css"),
		/*
		new HtmlWebpackPlugin({        //单个文件
		    filename: '1.html',
		    template:path.join(paths.pug,'test','1.pug'),
		    inject:false    //往html里注入脚本
		})
		*/
	]
}

//dealHtml(exp.plugins);
	
module.exports = exp;
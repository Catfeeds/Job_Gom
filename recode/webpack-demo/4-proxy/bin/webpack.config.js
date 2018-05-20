var path = require('path');
var fs = require('fs');
var webpack = require('webpack');

var paths = require('./paths.js');				//¼ò»¯Â·¾¶

var env = require('./env.js');					//¿ª·¢»·¾³
var pathRewrite = require('./pathRewrite.js');	//Â·¾¶Ìæ»»
var getEntry  = require('./getEntry.js');		//´¦Àíjs

var src = paths.src;
var dist = paths.dist;
console.log(getEntry());
module.exports = {
	entry:getEntry(),
    output: {
		
		
		path:dist,

		filename: 'js/conf/[name].js'
    },
    devServer:{ 
    	publicPath: '/dist',
		host:env.host,	//域名
        port:env.port,	//端口号
		proxy:{
			//开发环境
			'/CDN':{
				target:'/',							//替换的主路径
                secure: false,						
                pathRewrite: pathRewrite.dev		//路径替换
			},
			//仿真环境、线上
			'/m/pc/dist/**': {
               // target: 'https://js-pre.meixincdn.com',	//https 的target 需要加上https 头
               	target:env.protoHost,
                secure: false,
                pathRewrite: pathRewrite.prd
            }
		},
		headers: {
            'Access-Control-Allow-Origin': '*' // 字体文件跨域
        }
    }	
}
var path = require('path');
var fs = require('fs');
var webpack = require('webpack');

var paths = require('./paths.js');				//简化路径
var alias = require('./alias.js');				//别名配置



var env = require('./env.js');					//开发环境
var pathRewrite = require('./pathRewrite.js');	//路径替换

var getEntry  = require('./getEntry.js');		//处理js
var ExtractTextPlugin = require("extract-text-webpack-plugin");	//处理css
var HtmlWebpackPlugin = require('html-webpack-plugin');  //处理pug
var dealHtml = require('./dealHtml.js');

var TransferWebpackPlugin = require('transfer-webpack-plugin');

var src = paths.src;
var dist = paths.dist;


var exp = {
//module.exports = {
	entry:getEntry(),
	//entry:'src/js/page/test/index.js',
    output: {
			
		path:dist,

		filename: 'js/conf/[name].js'
    },
    devServer:{ 
		publicPath: '/dist',
		host:env.host,	//域名
        port:env.port,	//端口
		proxy:{
			//开发环境
			'/CDN':{
				target:'/',							//替换的主路径
                secure: false,						
                pathRewrite: pathRewrite.dev		//路径替换
			},
			//仿真环境
			'/m/pc/dist/**': {
                target: 'https://js-pre.meixincdn.com',	//https 的target 需要加上https 头
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
			/*
			{
                test: /module\\.*?\.scss$/,
				//exclude: '/node_modules/',	//不执行
				include:paths.scss,
                loader: ExtractTextPlugin.extract('css-loader!sass-loader',{
					publicPath: "/"
				}) //这里用了样式分离出来的插件
            },
			*/
			{
				test: /\.scss$/,     
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader!sass-loader",
					publicPath:'dist'
				})
			},
			//pug
			{
				test: /\.pug$/,
				//exclude: '/node_modules/',	//不执行
				include:paths.pug,
				loader:"pug-loader",
				query:{
					pretty:true        //防止压缩
				}
			},
			//tpl
			{
				test: /\.tpl$/,
				include: paths.page,
				loader: 'tmodjs-loader'
			},
			//images
			{
				test: /\.(png|jpg|gif)$/,
				include:paths.images,
				//exclude: '/node_modules/',	//不执行
				loader: 'url-loader',
				options:{
					//url-loader?name=[path]/[name].[ext]?v=[hash]&publicPath=//img.gomein.net.cn/plus/&outputPath=images/&limit=500
					/*
					limit:1,
					publicPath:'//js.meixincdn.com/pc/m/dist/',
					context:paths.src,
					name: '[path][name].[ext]?v=[hash:4]'
					*/
					
						//相对路径： 不生成image
							limit:1,
							publicPath:'',	//  		重新指定目录
							name: '[name].[ext]',
							context:paths.src,
							useRelativePath:true
							
				}
			 }
		]
	},
	
	plugins:[
		//处理scss
		new ExtractTextPlugin('css/module/[name].css'),	
		//处理images
		new TransferWebpackPlugin([{
            from: 'src/images',
            to: 'images'
        }])
	]
}
//处理pug
dealHtml(exp.plugins);
	
module.exports = exp;
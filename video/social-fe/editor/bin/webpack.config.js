var path = require('path');
var fs = require('fs');
var webpack = require('webpack');

var paths = require('./paths.js');				//简化路径
var alias = require('./alias.js');				//别名配置

var env = require('./env.js');					//开发环境
var pathRewrite = require('./pathRewrite.js');	//路径替换

var getEntry  = require('./getEntry.js');		//处理js
var ExtractTextPlugin = require("extract-text-webpack-plugin");	//处理css

var TransferWebpackPlugin = require('transfer-webpack-plugin');	//copy文件,dev环境使用
var CleanWebpackPlugin = require('clean-webpack-plugin');		//清空目录

var OpenBrowserPlugin = require('open-browser-webpack-plugin');//打开浏览器

var src = paths.src;
var dist = paths.dist;

var exp = {
	//source-map
	//devtool: 'cheap-module-eval-source-map',
	//入口
	entry: getEntry(),
	//出口
    output: {
		path: dist,
		filename: 'js/conf/[name].js',
		chunkFilename: "js/conf/[id].js"
    },
	resolve: {
        alias: alias	//别名配置
    },
	module:{
		loaders:[
			//sass
			{
				test: /\.scss$/,  
				exclude: /node_modules/,   
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader!sass-loader",
					publicPath:'dist'
				})
			},
			//tpl
			{
				test: /\.tpl$/,
				exclude: /node_modules/,
				include: paths.page,
				loader: 'tmodjs-loader'
			},
			//images
			{
				test: /\.(png|jpg|gif)$/,
				exclude: /node_modules/,
				include: paths.images,
				loader: 'url-loader',
				options: {
					//绝对路径
					limit: 1,
					publicPath: '//js.meixincdn.com/pc/m/dist/',
					context: paths.src,
					name: '[path][name].[ext]?v=[hash:4]'
				}
			 }
		]
	},
	
	plugins:[
		//清空dist目录
		new CleanWebpackPlugin(['dist']),
		//vendor 哈希处理
		new webpack.HashedModuleIdsPlugin(),
		//trunk模块抽取
		new webpack.optimize.CommonsChunkPlugin({
          	name: 'vendor',
            filename: 'js/conf/[name].js',
            minChunks: Infinity
        }),
		//css模块抽取
		new ExtractTextPlugin('css/module/[name].css')     
	]
}

module.exports = exp;

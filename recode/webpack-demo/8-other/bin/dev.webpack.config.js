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
var dealHtml = require('./dealHtml.js');	//处理html

var TransferWebpackPlugin = require('transfer-webpack-plugin');	//copy文件,dev环境使用
var CleanWebpackPlugin = require('clean-webpack-plugin');		//清空目录

var OpenBrowserPlugin = require('open-browser-webpack-plugin');//打开浏览器

var src = paths.src;
var dist = paths.dist;

var exp = {
	//source-map
	devtool: 'cheap-module-eval-source-map',
	//入口
	entry:getEntry(),
	//出口
    output: {	
		path:dist,
		filename: 'js/conf/[name].js'
		//chunkFilename: "js/conf/[id].js"
    },

    //本地服务
    devServer:{ 
    	inline:true,//自动更新浏览器
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
    },
    
	resolve: {
        alias: alias	//别名配置
    },

	module:{
		loaders:[
			{
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                } //将react编译成js文件
            },
			//sass
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
				loader: 'url-loader',
				options:{
					//相对路径： 不生成image
					limit:1,
					publicPath:'',	//  		重新指定目录
					name: '[name].[ext]',
					context:paths.src,
					useRelativePath:true	//相对路径写法
					

				}
			 }
		]
	},
	
	plugins:[
		//清空dist目录
		new CleanWebpackPlugin(['dist']),
		//vendor 哈希处理
		//new webpack.HashedModuleIdsPlugin(),
		//trunk模块抽取
		/*new webpack.optimize.CommonsChunkPlugin({
           // name: ['vendor','js/main'],
           // filename: 'js/conf/[name].js',
           name: 'vendor',
            filename: 'js/conf/[name].js',
            minChunks: Infinity
        }),*/

		new ExtractTextPlugin('css/module/[name].css'),
		new TransferWebpackPlugin([{
            from: 'src/images',
            to: 'images'
        }]),
		
		//自动加载模块
		new webpack.ProvidePlugin({
            React: "react",
            ReactDOM: "react-dom"
        }),       
		/*
		new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
		*/
		//新开浏览器
		/*
        new OpenBrowserPlugin({
	    	url: 'http://'+env.host
	  	})
		*/
	]
}

dealHtml(exp.plugins);
	
module.exports = exp;
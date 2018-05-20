var path = require('path');
var fs = require('fs');
var webpack = require('webpack');

var paths = require('./paths.js');				//简化路径
var alias = require('./alias.js');				//别名配置



var env = require('./env.js');					//开发环境
var pathRewrite = require('./pathRewrite.js');	//路径替换

var getEntry  = require('./getEntry.js');		//处理js
var ExtractTextPlugin = require("extract-text-webpack-plugin");	//处理css
//var HtmlWebpackPlugin = require('html-webpack-plugin');  //处理pug
//var dealHtml = require('./dealHtml.js');	//处理html

var TransferWebpackPlugin = require('transfer-webpack-plugin');	//copy文件,dev环境使用
var CleanWebpackPlugin = require('clean-webpack-plugin');		//清空目录

var OpenBrowserPlugin = require('open-browser-webpack-plugin');//打开浏览器
var src = paths.src;
var dist = paths.dist;
var exp = {
	//入口
	entry:getEntry,
	//出口
    output: {	
		path:dist,
		filename: 'js/conf/[name].js',
		jsonpFunction:'GwebpackJsonp',
		chunkFilename: "js/conf/[id].js"
    },

    
    
	resolve: {
        alias: alias	//别名配置
    },
	

	module:{
		loaders:[
			{
                test: /\.js?$/,
                //exclude: /(node_modules|dist|src\/js\/conf|src\/js\/plugin)/,
                include:paths.editor,
                loader: 'babel-loader',
                options: {  
                    "presets": [  
                        ['es2015', {'src\/js\/plugin': false}]  
                    ]
                }
            },
			//sass
			{
				test: /\.scss$/,     
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader!sass-loader?",
					publicPath:'/dist'
				})
			},
			//pug
			//{
			//	test: /\.pug$/,
				//exclude: '/node_modules/',	//不执行
			//	include:paths.pug,
			//	loader:"pug-loader",
			//	query:{
			//		pretty:true        //防止压缩
			//	}
			//},
			//tpl
			{
				test: /\.tpl$/,
				include: paths.js,
				loader: 'tmodjs-loader'
			},
			//images
			{
				test: /\.(png|jpg|gif|)$/,
				include:paths.images,				
				loader: 'url-loader',
				options:{
					limit:1024,
					publicPath:'',
					name: '[name].[ext]',
					context:paths.src,
					useRelativePath:true	//相对路径写法
					

				}
			 }
			 //,
			 //font
			/*{
				test: /\.(eot|svg|ttf|woff)$/,
				include:paths.images,
				loader: 'url-loader',
				options:{
					//相对路径： 不生成image
					limit:1,
					publicPath:'',	//  		重新指定目录
					name: '[name].[ext]',
					context:paths.src,
					useRelativePath:false	//相对路径写法
					

				}
			 }*/
		]
	},
	
	plugins:[
		new webpack.optimize.UglifyJsPlugin({
	      compress: {
	        warnings: false
	      }
	    }),
		//清空dist目录
		//new CleanWebpackPlugin(['dist']),
		//vendor 哈希处理
		//new webpack.HashedModuleIdsPlugin(),
		//trunk模块抽取
		new webpack.optimize.CommonsChunkPlugin({
            name: ['publishTopic'],
            filename: 'js/conf/[name].js',
            minChunks: Infinity
        }),

		new ExtractTextPlugin('css/module/[name].css'),

		new TransferWebpackPlugin([{
            from: 'src/images/editor',
            to: 'images/editor'
        }]),
        new TransferWebpackPlugin([{
            from: 'src/images/login',
            to: 'images/login'
        }]),
        new TransferWebpackPlugin([{
            from: 'src/images/public',
            to: 'images/public'
        }]),
        new TransferWebpackPlugin([{
            from: 'src/images/swf',
            to: 'images/swf'
        }]),
        //new TransferWebpackPlugin([{
        //    from: 'src/images',
        //    to: 'images'
        //}]),
		      
		
		new webpack.ProvidePlugin({
           //$: "jquery",
           // jQuery: "jquery",
           // "window.jQuery": "jquery",
			$_CONFIG: "module/globalConfig"
        }),
		
		//新开浏览器
		
       // new OpenBrowserPlugin({
	   // 	url: 'http://'+env.host
	  	//})
		
	]
	
}

//dealHtml(exp.plugins);
	
module.exports = exp;
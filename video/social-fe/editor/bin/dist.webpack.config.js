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

var merge = require('webpack-merge');
var common = require('./webpack.common.js');


var src = paths.src;
var dist = paths.dist;

module.exports = merge(common, {
	devtool:false,
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
			/*{
                test: /\.js?$/,
                //exclude: /(node_modules|dist|src\/js\/conf|src\/js\/plugin)/,
                include:paths.editor,
                loader: 'babel-loader',
                options: {  
                    "presets": [  
                        ['es2015', {'src\/js\/plugin': false}]  
                    ]
                }
            }	*/	
		]
	},
	
	plugins:[
		//清空dist目录
		new CleanWebpackPlugin(['/dist']),
		//vendor 哈希处理
		//new webpack.HashedModuleIdsPlugin(),
		//trunk模块抽取
		new webpack.optimize.CommonsChunkPlugin({
            name: ['publishTopic'],
            filename: 'js/conf/[name].js',
            minChunks: Infinity
        }),

		new TransferWebpackPlugin([{
            from: 'src/images',
            to: 'images'
        }]),       
		
		new webpack.ProvidePlugin({
           $: "jquery",
        	jQuery: "jquery",
        	"window.jQuery": "jquery",
			$_CONFIG: "module/globalConfig"
        }),
		new webpack.optimize.UglifyJsPlugin({
	      compress: {
	        warnings: false
	      }
	    })
		//新开浏览器
		
       // new OpenBrowserPlugin({
	   // 	url: 'http://'+env.host
	  	//})
		
	]
	
});

//dealHtml(exp.plugins);
	
//module.exports = exp;
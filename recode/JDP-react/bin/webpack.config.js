'use strict';

var webpack = require("webpack");
var path = require("path");
var fs = require("fs");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// var VendorChunkPlugin = require('webpack-vendor-chunk-plugin');
var WebpackMd5Hash = require("webpack-md5-hash");
var {widget} = require("./paths");

let _filePath = path.resolve(__dirname, '..', 'src');

let entry = {
	vendor : ["jquery", `${widget}/px2rem`]
};

(function getEntry(startPath) {
    function finder(fileStartPath) {
			try {
        var files = fs.readdirSync(fileStartPath);
			} catch(err) {
				console.error(err);
			}
      files.forEach((fileItem, index) => {
      	if(/node_modules/.test(fileItem)) return false;
          let filePath = path.join(fileStartPath, fileItem);
					try {
          	var stats=fs.statSync(filePath);
					} catch(err) {
						console.error(err);
					}
          if(stats.isDirectory()) finder(filePath);
					let fileName = path.normalize(`${filePath.split('/src/page/')[1]}`);
          if(stats.isFile() && /\.jsx$/.test(fileName)) {
						fileName = fileName.replace(/(.*\/)*([^.]+).*/ig,"$2");
						entry[fileName] = filePath;
					}
      });
    }
    finder(startPath);
    console.log(entry)
    return entry;
})(_filePath);

let outputFn = () => {
	console.log('========================>Webpack output files now')
	return {
		filename : "js/[name].[hash:16].js",
    chunkFilename: "js/Component/[name].[chunkhash:5].min.js",
		path : path.resolve(__dirname , "..", "dist"),  //编译到当前目录
		publicPath : "/dist"  //编译好的文件，在服务器的路径,这是静态资源引用路径
	}
}

module.exports = {
	devtool: 'eval-source-map',
	entry: entry,
	output: outputFn(),
	module: {
		rules: [
			{
				test: /\.html$/,
				loader: 'html-withimg-loader'
			},
			{
        test: /\.js[x]?$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-0', 'react']
          }
        }],
      	exclude: /node_modules/
    	},
			{
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
          publicPath: '../'
        })
	    },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'file-loader?limit=10000&name=image/[hash:8].[name].[ext]'
      },
			{
        test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
        loader: 'file-loader?limit=10000&name=fonts/[hash:8].[name].[ext]'
      }
		]
	},
	resolve: {
		modules: [path.join(__dirname, '..', './src'), path.join(__dirname, '..', './node_modules')],
		extensions: [".js", ".jsx", ".json", ".css", ".sass", ".scss"]
	},
	plugins: [
		new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('development') //定义编译环境
        }
    }),
		new HtmlWebpackPlugin({
      title: "React-jira",
      filename: "html/index.html",
			template: "./src/page/template/index.html",
      inject : 'body',
  		minify : {
        removeComments: true,
        collapseWhitespace: false
  		},
			chunksSortMode: 'dependency'
		}),
		new ExtractTextPlugin('css/[name].[contenthash:16].css',{
      allChunks : true,
			disable : false,
			ignoreOrder : true
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css\.scss$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: {removeAll: true } },
      canPrint: true
    }),
		new webpack.optimize.CommonsChunkPlugin({
			name : ["vendor", ],
			minChunks: 2
		}),
		// new VendorChunkPlugin('vendor'),
		new webpack.ProvidePlugin({
			$ : 'jquery',
			jQuery : 'jquery',
      "window.jQuery": "jquery"
		}),
		new WebpackMd5Hash(),
    // new webpack.optimize.DedupePlugin()
	]
}

'use strict';

var webpack = require("webpack");
var path = require("path");
var fs = require("fs");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var WebpackMd5Hash = require("webpack-md5-hash");

let _filePath = path.resolve(__dirname, '..', 'src');
let entry = {
	vonder : ["jquery"]
};
let templateEntry = {};

/**
 * [getEntry description]
 * @param  {[string]} startPath [chunkRootPath]
 * @param  {[json]} matchObj  [filepath, filetype]
 * @param  {[json]} chunkObj  [objectContainer]
 * @return {[json]} chunkObj  [factoryContainer]
 */

function getEntry(startPath, matchObj, chunkObj) {
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
					let fileName = path.normalize(`${filePath.split(`/src/${matchObj.filepath}`)[1]}`);
          if(stats.isFile() && new RegExp(`\.${matchObj.filetype}$`).test(fileName)) {
  					fileName = fileName.replace(new RegExp(`\.${matchObj.filetype}$`), '');
            chunkObj[fileName] = filePath;
          }
      });
    }
    finder(startPath);
    console.log(chunkObj)
    return chunkObj;
}

module.exports = {
	entry: getEntry(_filePath, { filepath : 'page/', filetype : 'js[x]?'}, entry),
	output: {
		filename : "js/[name].[hash:16].js",
		path : path.resolve(__dirname , "..", "dist"),
		publicPath : "/dist"
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				loader: ['html-withimg-loader', 'html-loader?minimize=false']
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
        loader: 'url-loader?limit=50&name=img/[hash:8].[name].[ext]'
      },
		]
	},
	resolve: {
		modules: [path.join(__dirname, '..', 'src'), path.join(__dirname, '..', 'node_modules')],
		extensions: [".js", ".jsx", ".json"]
	},
	plugins: [
		// new HtmlWebpackPlugin({
		// 	template: "./index.html"
		// }),
		new ExtractTextPlugin('css/[name].[contenthash:16].css',{
      allChunks : false
    }),
		new webpack.optimize.CommonsChunkPlugin({
			name : "vonder"
		}),
		new webpack.ProvidePlugin({
			$ : 'jquery',
			jQuery : 'jquery',
      "window.jQuery": "jquery"
		}),
		new WebpackMd5Hash()
	]
}

let template = Object.keys(getEntry(_filePath, { filepath : 'page/template/', filetype : 'html'}, templateEntry));

template.forEach((pathname) => {
	var conf = {
		title : 'Akesure搭建',
		filename : `page/${pathname}.html`,
		template : `./src/page/template/${pathname}.html`,
		inject : false,
		minify : {
      removeComments: true,
      collapseWhitespace: false
		},
    hash : true,
	};

	module.exports.plugins.push(new HtmlWebpackPlugin(conf));
});

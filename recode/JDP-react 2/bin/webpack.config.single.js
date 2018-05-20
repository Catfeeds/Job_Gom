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
					let fileName = path.normalize(`${filePath.split('/src/')[1]}`);
          if(stats.isFile() && /\.js[x]?$/.test(fileName)) {
						fileName = fileName.replace('.js', '');
						entry[fileName] = filePath;
					}
      });
    }
    finder(startPath);
    console.log(entry)
    return entry;
})(_filePath);

module.exports = {
	entry: entry,
	output: {
		filename : "[name].[hash:16].js",
		path : path.resolve(__dirname , "..", "dist"),
		publicPath : "/dist"
	},
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
        loader: 'url-loader?limit=50&name=img/[hash:8].[name].[ext]'
      },
		]
	},
	resolve: {
		modules: [path.join(__dirname, '..', './src'), path.join(__dirname, '..', './node_modules')],
		extensions: [".js", ".jsx", ".json"]
	},
	plugins: [
		// new HtmlWebpackPlugin({
		// 	template: "./index.html"
		// }),
		new ExtractTextPlugin('[name].[contenthash:16].css', {
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

let chunks = Object.keys(entry);

chunks.forEach((pathname) => {
	if(pathname == 'vonder') return;

	var conf = {
		title : 'webpack搭建',
		filename : `${pathname}.html`,
		template : './src/page/template/index.html',
		inject : 'body',
		minify : {
      removeComments: true,
      collapseWhitespace: false
		}
	};

	if(pathname in module.exports.entry) {
		conf.chunks = ['vonder', pathname];
		conf.hash = false;
	}

	module.exports.plugins.push(new HtmlWebpackPlugin(conf));
	// module.exports.plugins.push(new ExtractTextPlugin(`[name].[contenthash].css`));
});

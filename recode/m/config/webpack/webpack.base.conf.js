const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const NyanProgressPlugin = require('nyan-progress-webpack-plugin');
const env = require('./env.conf.js');
const entry = require('./entry');
const paths = require('../paths');

let webpackConfig = {
	entry: entry,
	output: {
		path: paths.dist,
		filename: 'js/[name].js'
	},
	resolve: {
		extensions: [' ', '.js', '.vue'],
		alias: {
			'css': paths.css,
			'io': paths.io,
			'common': paths.common,
			'components': paths.components,
			'widgets': paths.widgets,
			'plugin': paths.plugin,
			'util': paths.util,
			'dist':paths.dist,
			'mods':paths.mods,
			'vue': 'vue/dist/vue.js'
		}
	},
	module: {
		rules: [{
			test: /\.js$/,
			loader: 'eslint-loader',
			enforce: "pre",
			include: [paths.js],
			options: {
				formatter: require('eslint-friendly-formatter')
			}
		}, {
			test: /\.vue$/,
			loader: 'vue-loader',
			include: [paths.js],
			options:{
				loaders: {
					css: ExtractTextPlugin.extract({
						fallback: 'vue-style-loader',
						use: 'css-loader'
					})
				}
			}
			
		}, {
			test: /\.scss$/,
			include: [paths.css],
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [{
					loader: 'css-loader'
				}, {
					loader: 'postcss-loader',
					options: {
						plugins: function() {
							return [
								require('autoprefixer')({
									browsers: ['Android >= 4.4', '> 1%'],
									remove: false
								})
							];
						}
					}
				}, {
					loader: 'sass-loader'
				}]
			})
		}, {
			test: /\.js$/,
			loader: 'babel-loader',
			include: [paths.js]
		}, {
			test: /\.(png|jpe?g|gif)(\?.*)?$/,
			loader: 'url-loader',
			query: {
				limit: 50,
				context: 'src/images',
				publicPath: 'http://js.pre.meixincdn.com/m/m/dist/',
				name: 'images/[path][name].[ext]?v=[hash:7]'
			}
		}, {
			test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
			loader: 'url-loader',
			query: {
				limit: 10,
				context: 'src/fonts',
				publicPath:'http://js.pre.meixincdn.com/m/m/dist/',
				name: 'fonts/[path][name].[ext]?v=[hash:7]'
			}
		}]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'js/vendor.js',
			minChunks: Infinity
		})
	]
};

module.exports = webpackConfig;
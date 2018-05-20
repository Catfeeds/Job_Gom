const path = require('path');
const webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const entry = require('./entry');
const paths = require('../paths');

let webpackConfig = {
	entry: entry,
	output: {
		path: paths.dist,
		filename: 'js/[name].js',
        chunkFilename: "js/[name]-[chunkhash:5].js"
	},
	resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            'store': path.join(paths.js, 'redux', 'store'),
            'router': path.join(paths.js, 'router'),
            'page': paths.page,
            'io': paths.io,
            'reduxs': paths.redux,
            'components': paths.components,
            'api': paths.api,
            'js': paths.js,
            'css': paths.css,
            'vendor': paths.vendor,
            'util': paths.util
        }
	},
	module: {
        // |vendor\/webuploader\.html5only\.js
        noParse: /jquery/,
		rules: [
            {
                test: /\.scss$/,
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
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    context: 'src/imgs',

                    publicPath: '../',
                    name: 'imgs/[path][name]-[hash:7].[ext]'
                }
            }, {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    context: 'src/fonts',
                    publicPath: '../',
                    name: 'fonts/[path][name]-[hash:7].[ext]'
                }
            }, {
                test: /\.js[x]?$/,
                loaders: ['babel-loader'],
                include: [
                    paths.js,
                    path.join(paths.base, 'node_modules/fv-dialog/src/')
                ],
                exclude: [
                    path.join(paths.js, 'vendor', 'webuploader.html5only.js')
                ]
            }]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: Infinity
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
            "window.jQuery": "jquery"
		})
	]
};

module.exports = webpackConfig;

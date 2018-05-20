const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const paths = require('./config/path');

const FlamePlugin = require('./plugin/FlamePlugin');

const contentBase = paths.contentBase;

module.exports = {
    entry: {
        vendor: path.join(contentBase, 'src', 'js', 'vendor', 'lib.js'),
        main: path.join(contentBase, 'src', 'js', 'page', 'main','index.js'),
        list: path.join(contentBase, 'src', 'js', 'page', 'list','index.js'),
        detail: path.join(contentBase, 'src', 'js', 'page', 'detail','index.js'),
        error: path.join(contentBase, 'src', 'js', 'page', 'error','index.js')
    },
    output: {
        filename: 'js/[name].js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            enforce: 'pre',
            include: [paths.js],
            use: [{
                loader: 'eslint-loader',
                options: {
                    fix: true
                }
            }]
        }, {
            test: /\.(png|jpe?g|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192, // 8kb
                    name: 'imgs/[name].[ext]'
                }
            }]
        }, {
            test: /\.scss$/,
            include: [paths.scss],
            use: ['style-loader', 'css-loader', 'sass-loader']
        }, {
            test: /\.(ttf|eot|svg|woff|woff2)$/,
            exclude: /node_modules/,
            use: [{
                loader: 'file-loader',
                options: {
                    mimetype: 'application/font-woff',
                    name: 'fonts/[name].[ext]'
                }
            }]
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor'],
            minChunks: Infinity
        })
    ]
}
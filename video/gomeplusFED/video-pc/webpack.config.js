var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var TransferWebpackPlugin = require('transfer-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin');

var srcPath = path.join(__dirname, 'src');
var distPath = path.join(__dirname, 'dist');
var jsPath = path.join(srcPath, 'js');
var pagePath = path.join(jsPath, 'page');
var vendorPath = path.join(jsPath, 'vendor');

module.exports = {
    entry: {
        video_share: path.join(pagePath, 'video_share')
    },
    output: {
        path: path.join(distPath, 'js', 'page'), // 打包输出目录
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },
    plugins: [
        new CleanPlugin(['dist']),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: {
                warnings: false
            },
            mangle: {
                except: ['$']
            }
        }),
        new TransferWebpackPlugin([{
            from: 'src/css',
            to: '../../css'
        }, {
            from: 'src/images',
            to: '../../images'
        }, {
            from: 'src/js/vendor',
            to: '../../js/vendor'
        }])
    ],
    resolve: {
        extensions: ['', '.js', 'json']
    }
};
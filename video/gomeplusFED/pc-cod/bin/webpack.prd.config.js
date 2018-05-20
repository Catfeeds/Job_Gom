var path = require('path');
var webpack = require('webpack');
var TransferWebpackPlugin = require('transfer-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

var paths = require('./paths');
var getEntry = require('./getEntry');
var alias = require('./alias');

module.exports = {
    entry: getEntry(),
    output: {
        path: path.join(paths.dist, 'js', 'conf'), // 打包输出目录
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },
    module: {
        noParse: [/jquery.min/],
        loaders: [{
            test: /\.tpl$/,
            include: [
                paths.page,
                paths.module,
                paths.widget
            ],
            loader: 'tmodjs'
        }]
    },
    plugins: [
        new CleanPlugin(['dist'], {
            root: paths.base
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js',
            minChunks: Infinity
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            $_CONFIG: "module/globalConfig"
        }),
        // new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: {
                warnings: false,
                drop_console: true
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
        }]),
        // 压缩css
        new OptimizeCssAssetsPlugin({
            canPrint: true
        })
    ],
    resolve: {
        extensions: ['', '.js', 'json'],
        alias: alias
    }
};
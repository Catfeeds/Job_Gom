"use strict";
let webpack = require('webpack');
// let DashboardPlugin = require('webpack-dashboard/plugin');
let path = require("path");
let paths = require('./paths'); // 路径配置
let getEntry = require('./getEntry'); // webpack入口文件生成逻辑
let alias = require('./alias'); // webpack 别名配置
let env = require('./env'); // 环境配置
let loader = require('./loader');

let outputPath = env.online ? "../dist" : "../debug";

let webpackConfig = {
    context: path.resolve(__dirname, "../"),
    entry: getEntry(),
    devtool:"source-map",
    output: {
        path: path.resolve(__dirname, outputPath + "/js/conf"), // 打包输出目录
        //publicPath: env.publicPath,
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },
    module: loader,
    plugins: [
        // new DashboardPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js',
            minChunks: Infinity
        }),
        new webpack.ProvidePlugin({
            GER:'gome-error-report',
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            $_CONFIG: "module/globalConfig"
        })
    ],
    resolve: {
        extensions: ['', '.js', '.json', '.pug', 'scss'],
        alias: alias
    },
};

if(env.online){
    webpackConfig.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            mangle: {
                except: ['$super', '$', 'exports', 'require']
            },
            output: {
            	keep_quoted_props: true,
            	comments: false,
            	quote_keys : true
            },
            exclude:["vendor.js"]
        })
    );
}

if(!env.online){
    webpackConfig.watch = true;
}

module.exports = webpackConfig;

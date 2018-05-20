var webpack = require('webpack');
// var DashboardPlugin = require('webpack-dashboard/plugin');
var paths = require('./paths'); // 路径配置
var getEntry = require('./getEntry'); // webpack入口文件生成逻辑
var alias = require('./alias'); // webpack 别名配置
var env = require('./env'); // 环境配置
var rewrite = require('./rewrite');

module.exports = {
    entry: getEntry(),
    output: {
        path: paths.conf, // 打包输出目录
        publicPath: env.publicPath,
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },
    devServer: {
        contentBase: process.cwd(), //Relative directory for base of server
        devtool: 'source-map',
        host: '0.0.0.0',
        port: env.port,
        headers: {
            'Access-Control-Allow-Origin': '*' // 字体文件跨域
        },
        proxy: {
            // 预生产环境
            '^/CDN8053/**': {
                target: env.host,
                secure: false,
                pathRewrite: rewrite.pre
            },
            // 代理线上,可以不用加debug=true
            '/m/pc/dist/**': {
                target: env.host,
                secure: false,
                pathRewrite: rewrite.prd
            }
        }
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
        // new DashboardPlugin(),
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
        })
    ],
    resolve: {
        extensions: ['', '.js', 'json'],
        alias: alias
    }
};
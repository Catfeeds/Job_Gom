var webpack = require('webpack');
// var DashboardPlugin = require('webpack-dashboard/plugin');
var paths = require('./paths'); // 路径配置
var getEntry = require('./getEntry'); // webpack入口文件生成逻辑
var alias = require('./alias'); // webpack 别名配置
var env = require('./env'); // 环境配置
var rewrite = require('./rewrite');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: getEntry,
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
            // 开发环境
            '^/m/pc-im/src/**': {
                target: env.host,
                secure: false,
                pathRewrite:function(path, req) {
                    return path.replace(/\/m\/pc\-im/, '')
                }
            },
            // 开发环境
            '^/m/pc/src/**': {
                target: 'https://js-pre.meixincdn.com/CDN8083/dist/',
                changeOrigin: true,
                secure: false,
                pathRewrite:function(path, req) {
                    return path.replace(/\/m\/pc\/src\//, '')
                }
            },
            // 预生产环境
            '^/CDN8056/**': {
                target: 'http://js.dev.meixincdn.com/m/pc/',
                changeOrigin: true,
                secure: false,
                pathRewrite:rewrite.pre
            },
            // 代理线上,可以不用加debug=true
            '^/m/pc-im/dist/**': {
                target: env.host,
                secure: false,
                pathRewrite: rewrite.prd
            },
            '/m/public/gomeplusJS/src/plugs/debugjs/v1/debug.js': {
                target: 'http://10.69.207.16',
                changeOrigin: true,
                srcure: false
            }
        }
    },
    module: {
        loaders: [
        //  使用vue-loader 加载 .vue 结尾的文件
        {
            test: /\.vue$/, 
            loader: 'vue-loader',
            exclude: /node_modules/    
        },
        // 使用babel 加载 .js 结尾的文件
        {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, 
        // 使用css-loader、autoprefixer-loader和style-loader 加载 .css 结尾的文件
        {  
            test: /\.css$/,                  
            // 将样式抽取出来为独立的文件
            loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader"),
            exclude: /node_modules/
        },           
        // 加载图片
        {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader',
            query: {
                // 把较小的图片转换成base64的字符串内嵌在生成的js文件里
                limit: 10000,
                // 路径和生产环境下的不同，要与修改后的publickPath相结合
                name: 'img/[name].[ext]?[hash:7]'
            }
        }]
      
    },
    /*vue: {
        loaders: {
            css: ExtractTextPlugin.extract("css"),
            html:'html-loader'
        }
    },*/
    plugins: [
        // new DashboardPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'im',
            filename: '[name].js',
            minChunks: Infinity
        }),
        new ExtractTextPlugin("[name].css"),

        
    ],
    resolve: {
        extensions: ['', '.js', 'json'],
        alias: alias
    }
};

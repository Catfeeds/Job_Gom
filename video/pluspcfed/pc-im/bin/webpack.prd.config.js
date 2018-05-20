var path = require('path');
var webpack = require('webpack');
var TransferWebpackPlugin = require('transfer-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var paths = require('./paths');
var getEntry = require('./getEntry');
var alias = require('./alias');

module.exports = {
    entry: getEntry,
    output: {
        path: path.join(paths.dist, 'js', 'conf'), // 打包输出目录
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },
    module: {
        noParse: [/jquery.min/],
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
            loader: 'babel',
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
    vue: {
        loaders: {
            css: ExtractTextPlugin.extract("css")/*,
            html:'html-loader'*/
        }
    },
    plugins: [
        new CleanPlugin(['dist'], {
            root: paths.base
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: 'production'
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'im',
            filename: '[name].js',
            minChunks: Infinity
        }),
        new webpack.ProvidePlugin({
            vue: "vue",
            vuex: "vuex"
        }),
        new ExtractTextPlugin("[name].css"),
        // new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: {
                warnings: false
            }
        }),
        new TransferWebpackPlugin([{
            from: 'src/css',
            to: '../../css'
        }, {
            from: 'src/images',
            to: '../../images'
        },{
            from: 'src/js/im/vendorIm',
            to: '../../js/im/vendorIm'
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
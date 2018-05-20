const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const paths = require('./config/path');

const FlamePlugin = require('./plugin/FlamePlugin');

const contentBase = paths.contentBase;
console.log(path.resolve(__dirname, '../src/fonts'))
module.exports = {
    entry: {
        vendor: path.join(contentBase, 'src', 'js', 'vendor', 'lib.js'),
        main: path.join(contentBase, 'src', 'js', 'page', 'main','index.js'),
        list: path.join(contentBase, 'src', 'js', 'page', 'list','index.js'),
        detail: path.join(contentBase, 'src', 'js', 'page', 'detail','index.js'),
        error: path.join(contentBase, 'src', 'js', 'page', 'error','index.js')
    },
    output: {
        path: paths.dist,
        filename: 'js/[name].[chunkhash:7].js',
        publicPath: 'http://js.pre.meixincdn.com/m/vtest/dist/'
    },
    module: {
        rules: [{
            test: /\.(png|jpe?g|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192, // 8kb
                    name: 'imgs/[name].[hash:7].[ext]'
                }
            }]
        }, {
            test: /\.css$/,
            include: [paths.css],
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
        }, {
            test: /\.scss$/,
            include: [paths.scss],
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader'
                }, {
                    loader: 'postcss-loader',
                    options: {
                        config: {
                            path: './webpack/config/postcss.config.js'
                        }
                    }
                }, {
                    loader: 'sass-loader'
                }]
            })
        }, {
            test: /\.(ttf|eot|svg|woff|woff2)$/,
            exclude: /node_modules/,
            use: [{
                loader: 'file-loader',
                options: {
                    mimetype: 'application/font-woff',
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            }]
        }]
    },
    plugins: [
        new webpack.HashedModuleIdsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'runtime'],
            minChunks: Infinity
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].[contenthash:7].css'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true
            }
        }),
        // 导出flame配置文件,删除不符合版本的资源文件
        new FlamePlugin({
            limit: 5, // 默认保留5个历史版本
            outputPath: path.join('..', 'webpack', 'flame', 'pgc'), // 文件输出目录
            filename: 'v-prd.php' // 输出文件名
        })
    ]
}
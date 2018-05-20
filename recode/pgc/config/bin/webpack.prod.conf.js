const path = require('path');

const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const baseWebpackConfig = require('./webpack.base.conf.js');
const HashMapPlugin = require('../webpack/plugin/hash-map.js');
const FlamePlugin = require('../webpack/plugin/FlamePlugin.js');
var Visualizer = require('webpack-visualizer-plugin');
const configFun = require('../webpack/common.conf.js');

function config() {
    var env = process.env.NODE_ENV
    return merge(baseWebpackConfig, {
        output: {
            filename: 'js/[name]-[chunkhash:7].js',
            publicPath: configFun()['publicPath'][env]
        },
        plugins: [
            new webpack.HashedModuleIdsPlugin(),
            new webpack.optimize.CommonsChunkPlugin({
                name: ['vendor', 'runtime'],
                // filename: 'js/vendor-[chunkhash:7].js',
                minChunks: Infinity
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(env)
                }
            }),
            // 压缩 js
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }),
            // 压缩 css
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorOptions: { discardComments: { removeAll: true } },
                canPrint: false
            }),
            new Visualizer({
                filename: './statistics.html'
            }),
            // 抽离 css 到单独文件
            new ExtractTextPlugin({
                filename: 'css/[name]-[contenthash:7].css'
            }),
            // 生成 hash map
            /*new HashMapPlugin({
                path: path.join(__dirname, '../hash-map'), // map 文件夹路径
                rotate: 5 // 保留版本记录数
            })*/

            new FlamePlugin({
                limit: 10, // 默认保留5个历史版本
                outputPath: path.join('..', 'config', 'webpack', 'flame', 'pgc'),
                filename: env === 'production' ? 'v-pro.php' : `v-${env}.php` // 输出文件名
            })
        ]
    });
}
module.exports = config;

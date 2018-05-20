const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
    plugins: [
        new UglifyJSPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new ExtractTextPlugin({
            // filename: 'css/[name]-[contenthash:7].css'
            filename: 'css/[name].css'
		})
    ]
});
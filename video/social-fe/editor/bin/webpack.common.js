const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin'); //copy文件,dev环境使用

const paths = require('./paths');
const entry = require('./getEntry');
const alias = require('./alias');
const node_env = require('yargs').argv;
module.exports = {
    entry: entry(),
    output: {
        path: paths.dist,
        filename: 'js/conf/[name].js',
        library: 'GomeEditor',
        libraryTarget: 'umd'
    },
    resolve: {
        alias: alias
    },
    module: {
        rules: [{
            test: /\.scss$/,
            include: [paths.sass],
            use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [{
					loader: 'css-loader'
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
                    name: 'fonts/[name].[ext]'
                }
            }]
        }, {
            test: /\.(png|jpe?g|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit:1024,
                    publicPath:'',
                    name: '[name].[ext]',
                    context:paths.src,
                    useRelativePath:true
                }
            }]
        }, {
            test: /\.tpl$/,
            exclude: /node_modules/,
            loader: 'tmodjs-loader'
        }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $_CONFIG: "module/globalConfig"
        }),
        new ExtractTextPlugin({
            // filename: 'css/[name]-[contenthash:7].css'
            //filename: 'css/[name].css'
            filename: 'css/module/[name].css'
		}),
        new TransferWebpackPlugin([{
            from: 'src/images',
            to: 'images'
        }]),

        /*new TransferWebpackPlugin([{
            from: 'src/images/public',
            to: 'images/public'
        }]),
        new TransferWebpackPlugin([{
            from: 'src/images/swf',
            to: 'images/swf'
        }]),*/

        new webpack.DefinePlugin({

            'process.env': {
                NODE_ENV: JSON.stringify(node_env)
            }
        })
    ],
};
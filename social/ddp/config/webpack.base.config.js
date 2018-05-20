import path from 'path';

import webpack from 'webpack';

import baseConfig from './base.config.js';

import env from './env.config.js';

const rootPath = path.join(__dirname, '../');

export default {
	entry: {
		app: './src/app.js'
	},
	output: {
		path: baseConfig.build.assetsRoot,
		publicPath: baseConfig.build.assetsPublicPath,
		filename: '[name].js'
	},
	module: {
		preLoaders: [{
			test: /\.vue$/,
			loader: 'eslint',
			include: rootPath,
			exclude: path.join(rootPath, 'node_modules/')
		}, {
			test: /\.js$/,
			loader: 'eslint',
			include: rootPath,
			exclude: path.join(rootPath, 'node_modules/')
		}],
		loaders: [{
			test: /\.vue$/,
			loader: 'vue'
		}, {
			test: /\.js$/,
			loader: 'babel',
			include: rootPath,
			exclude: path.join(rootPath, 'node_modules/')
		}, {
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		}, {
			test: /\.json$/,
			loader: 'json'
		}, {
			test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			loader: 'url',
			query: {
				limit: 10000,
				name: 'static/img/[name].[hash:7].[ext]'
			}
		}, {
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			loader: 'url',
			query: {
				limit: 10000,
				name: 'static/fonts/[name].[hash:7].[ext]'
			}
		}]
	},
	resolve: {
		extensions: ['', '.js', '.vue'],
		alias: {
			utils: path.join(rootPath, './src/util/'),
			store: path.join(rootPath, './src/vuex/'),
			actions: path.join(rootPath, './src/vuex/actions/'),
			jquery: path.join(rootPath, './node_modules/jquery/dist/jquery.js')
		}
	},
	eslint: {
		formatter: require('eslint-friendly-formatter')
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': JSON.stringify(env)
		}),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery"
		})
	]
};

var path = require('path');
var eslint = require('rollup-plugin-eslint');
var tslint = require('rollup-plugin-tslint-fixed');
var commonjs = require('rollup-plugin-commonjs');
var nodeResolve = require('rollup-plugin-node-resolve');
var typescript = require( 'rollup-plugin-typescript');
var env = require('../env.js');
var paths = {
	distPath: function(name) {
		return path.join(__dirname, '../../dist/', name);
	},
	rawPath: function(name) {
		return path.join(__dirname, '../../dist_raw/', name);
	},
	entry: path.join(__dirname, '../../src/app.ts')
};
exports.paths = paths;
var config = {
	entry: paths.entry,
	plugins: [
		nodeResolve({
			browser: true,
			extensions: [ '.js', '.json', '.ts']
		}),
		commonjs(),
		tslint(),
		typescript({
			typescript: require('typescript'),
			include: ['**/*.ts', '**/*.js'],
			exclude: ['node_modules/**']
		})
	]
};
if (env === 'dev') {
	exports.rollup = Object.assign({
		format: 'umd',
		moduleName: 'UBASDK',
		dest: path.join(__dirname, '../dist/uba-sdk.js')
	}, config);
} else {
	exports.rollup = config;
}

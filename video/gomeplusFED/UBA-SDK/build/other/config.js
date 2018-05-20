var path = require('path');
var babel = require('rollup-plugin-babel');
var eslint = require('rollup-plugin-eslint');
var commonjs = require('rollup-plugin-commonjs');
var nodeResolve = require('rollup-plugin-node-resolve');
// var replace = require( 'rollup-plugin-replace');
var env = require('../env.js');

var paths = {
	distPath: function(name) {
		return path.join(__dirname, '../../dist/other/', name);
	},
	rawPath: function(name) {
		return path.join(__dirname, '../../dist_raw/other/', name);
	},
	entryPath: function(name) {
		return path.join(__dirname, '../../src/other/', name);
	}
};

exports.paths = paths;

exports.rollup = {
	plugins: [
		nodeResolve({
			browser: true
		}),
		commonjs(),
		eslint(),
		babel({
			babelrc: false,
			"presets": [
				["latest", {
					"es2015": {
						"modules": false
					}
				}]
			],
			"ignore": [
				"dist/*.js"
			],
			"plugins": [
				"external-helpers",
				"string-minify"
			],
			externalHelpers: true
		})
	]
};
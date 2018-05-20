var fs = require('fs');
var moment = require('moment');
var { exec, execSync } = require('child_process');
var os = require('os');
var inquirer = require('inquirer');
var rollup = require('rollup');
var uglify = require('uglify-js');
var ora = require('ora');
var chalk = require('chalk');
var env = require('../env.js');
var logger = require('../logger.js');
var { getSize, write, updateVersion, getPkgObj, getPkgField, setPkgField } = require('../common.js');
var config = require('./config');
var hashfield = '_hash';
var hash = getPkgField(hashfield);
var newhash = Math.floor(Math.random() * 10000000000);
var hashUpdated = false;
let answersResult = {};
let normalCode = '';
let minCode = '';
var buildConfig = config.buildConfig;

function build({ entry, vendor, banner = '', needNewHash = false, plugins = [], custom = {} } = {}) {
	let _config;
	if (_config = buildConfig[entry]) {
		entry = _config['entry'];
		vendor = _config['vendor'];
	}
	let rollupcfg = { ...config.rollup, plugins: [...config.rollup.plugins, ...plugins], entry };
	return Promise.resolve(rollup.rollup(rollupcfg))
		.then(function(bundle) {
			return bundle.generate({
				useStrict: false,
				banner: banner,
				format: 'iife',
				...custom
			});
		})
		.then(function(res) {
			let { code } = res;
			if (needNewHash) {
				res.code = code.replace(/__randomstr__inject__here/g, newhash);
			} else {
				res.code = code.replace(/__randomstr__inject__here/g, hash);
			}
			return res;
		})
		.then(function(res) {
			let { code } = res;
			if (vendor) {
				return new Promise((resolve, reject) => {
					fs.readFile(vendor, 'utf8', function(err, data) {
						if (err) {
							reject(err);
						}
						res.code = code + data;
						resolve(res);
					});
				});
			}
			return res;
		});
}

function buildProcess({ entry, vendor, output, versionFlag }) {
	let version = getPkgField(versionFlag);
	let needNewHash = false;
	output = output || [];
	let initPromise;
	if (output.length === 0) {
		initPromise = Promise.resolve();
	} else {
		initPromise = updateVersion(versionFlag, version)
			.then((newverson) => { version = newverson; })
			.then(() => inquirer.prompt([{
				type: 'confirm',
				name: 'hash',
				message: 'Change hash?',
				default: false
			}]))
			.then((answer) => {
				if (answer.hash) {
					needNewHash = true;
					if (!hashUpdated) {
						return setPkgField(hashfield, newhash).then(() => {
							logger.success(`Update package.json ${hashfield} to ${newhash} succeed.`);
							hashUpdated = true;
						});
					}
				}
			});
	}
	let banner;
	return initPromise
		.then(() => {
			banner = '/*\n' +
				` * ${versionFlag} v` + `${version}, bundle: ${moment().format("YYYY-MM-DD HH:mm")}` + '\n' +
				' * (c) ' + new Date().getFullYear() + ' gomeBigData\n' +
				' */';
		})
		.then(() => build({ entry, vendor, banner, needNewHash }))
		.then(({ code }) => outputFiles(code, banner, output))
		.then(() => ({
			[versionFlag]: version
		}))
		.catch((e) => {
			console.log(e);
		});
}

function outputFiles(code, banner = '', output = []) {
	return Promise.resolve().then(function() {
		if (output[0]) {
			return write(output[0], code);
		} else {
			return code;
		}
	})
		.then(function(code) {
			if (output[1]) {
				code = code.replace(/\/\* dev-only start \*\/[\s\S]+?\/\* dev-only end \*\//g, '');
				// check
				if (code.includes('babelHelper')) {
					throw new Error('bundle file must not contain babelHelper!!!');
				}
				let mincode = uglify.minify(code, {
					fromString: true,
					compress: { screw_ie8: false, drop_console: true, passes: 2 },
					mangle: { screw_ie8: false },
					output: {
						preamble: banner,
						screw_ie8: false,
						ascii_only: true
					}
				}).code;
				return write(output[1], mincode);
			}
		});
}
// function capitalize(str) {
// 	return str.charAt(0).toUpperCase() + str.slice(1);
// }
let operations = [];
var keys = Object.keys(buildConfig);
for (let key of keys) {
	operations.push({ ...buildConfig[key],
		build: function({
			entry,
			vendor,
			output,
			versionFlag
		} = buildConfig[key]) {
			return buildProcess({
				entry,
				vendor,
				output,
				versionFlag
			});
		}
	});
}
exports.chain = function() {
	let result = {};
	let initp = Promise.resolve();
	for (let op of operations) {
		initp = initp.then(() => op.build()).then(res => Object.assign(result, res));
	}
	return initp;
};
exports.build = build;
exports.operations = operations;

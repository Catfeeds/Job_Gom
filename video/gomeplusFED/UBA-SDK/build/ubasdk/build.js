var { getSize, write, getPkgObj, getPkgField, setPkgField } = require('../common.js');
var moment = require('moment');
var rollup = require('rollup');
var uglify = require('uglify-js');
var config = require('./config');
var banner = '';
var normalCode = '';
exports.build = function({ version = 'unknow', plugins = [], custom = {} } = {}) {
	return Promise.resolve()
		.then(() => {
			banner = '/*\n' +
				` * uba-sdk v` + `${version}, bundle: ${moment().format("YYYY-MM-DD HH:mm")}` + '\n' +
				' * (c) ' + new Date().getFullYear() + ' gomeBigData\n' +
				' */';
			return rollup.rollup({ ...config.rollup, plugins: [...config.rollup.plugins, ...plugins] });
		})
		.then(function(bundle) {
			return bundle.generate({
				useStrict: false,
				banner: banner,
				format: 'iife',
				moduleName: 'UBASDK',
				...custom
			});
		});
};
exports.output = function(code, target1 = config.paths.rawPath('./uba-sdk.js'), target2 = config.paths.distPath('uba-sdk.min.js')) {
	return Promise.resolve().then(function() {
			// remove performance time code
		normalCode = code.replace(/\/\* dev-only start \*\/[\s\S]+?\/\* dev-only end \*\//g, '');
		return write(target1, normalCode);
	})
		.then(function() {
			return uglify.minify(normalCode, {
				fromString: true,
				compress: { screw_ie8: false, drop_console: true, passes: 2 },
				mangle: { screw_ie8: false },
				output: {
					preamble: banner,
					screw_ie8: false,
					ascii_only: true
				}
			}).code;
		})
		.then(function(_code) {
			let minCode = _code;
			return write(target2, minCode);
		});
};

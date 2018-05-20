const fs = require('fs');
const { baseDir, configPath, entryPath, outputPath, rawOutputPath } = require('./paths');
var typescript = require('rollup-plugin-typescript');
var { readDir } = require('../../common');
var projs = readDir(baseDir).filter(x => x !== 'common');
var buildConfig = {};
for (let name of projs) {
	let cpath = configPath(name);
	let {
		entry = 'index.js',
		output = name + '.js',
		raw_output = name + '.js',
		flag = `sitemoniter-${name}`,
		comment = name
	} = fs.existsSync(cpath) ? require(configPath(name)) : {};
	buildConfig[name] = {
		entry: entryPath(name, entry),
		output: [rawOutputPath(raw_output), outputPath(output)],
		versionFlag: flag,
		comment
	}
}
// var buildConfig = {
// 	gomeplusPc: {
// 		entry: paths.pcPath('gomeplus.com/index.js'),
// 		// vendor: paths.pcPath('gomeplus.com/vendor.js'),
// 		output: [paths.rawPath('gomeplus.com/bigdata.js'), paths.outputPath('bigdata.js')],
// 		versionFlag: 'sitemoniter-gomeplus',
// 		comment: 'gomeplus PC'
// 	},
// 	gomecomPc: {
// 		entry: paths.pcPath('gome.com.cn/index.js'),
// 		// vendor: paths.pcPath('gome.com.cn/vendor.js'),
// 		output: [paths.rawPath('gome.com.cn/bigdata.js'), paths.outputPath('gome.com.cn/bigdata.min.js')],
// 		versionFlag: 'sitemoniter-gomecom',
// 		comment: 'gome.com.cn PC'
// 	},
// 	newPc: {
// 		entry: paths.pcPath('newpc/index.js'),
// 		// vendor: paths.pcPath('newpc/vendor.js'),
// 		output: [paths.rawPath('bigdata-v2.js'), paths.outputPath('bigdata-v2.js')],
// 		versionFlag: 'sitemoniter-gomecom-pc-v2',
// 		comment: 'new gome.com.cn PC'
// 	},
// 	gomeWap: {
// 		entry: paths.wapPath('index.js'),
// 		// vendor: paths.wapPath('vendor.js'),
// 		output: [paths.rawPath('wap.raw.js'), paths.outputPath('wap.js')],
// 		versionFlag: 'sitemoniter-wap',
// 		comment: 'wap'
// 	}
// };
var config = {
	plugins: [
		typescript({
			typescript: require('typescript'),
			include: ['**/*.ts', '**/*.js'],
			exclude: ['node_modules/**']
		})
	]
};
module.exports = {
	rollup: config,
	buildConfig
}
// exports.rollup = config;
// exports.buildConfig = buildConfig;
// exports.paths = paths;

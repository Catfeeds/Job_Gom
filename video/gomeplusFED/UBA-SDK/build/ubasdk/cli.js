// require("babel-register");
var { updateVersion, getPkgField } = require('../common.js');
var { build, output } = require('./build.js');
var ora = require('ora');
var versionFlag = 'version';
var version = getPkgField(versionFlag);
let spinner;
module.exports.default = updateVersion(versionFlag, version)
	.then((newverson) => {
		spinner = ora(`building UBA-SDK ...`).start();
		version = newverson;
	})
	.then(() => build({ version }))
	.then((bundle) => bundle.code)
	.then((code) => output(code))
	.then(() => {
		spinner && spinner.stop();
		return { ubasdk: version };
	})
	.catch(err => {
		spinner.stop();
		throw err;
		// console.log(err);
	});

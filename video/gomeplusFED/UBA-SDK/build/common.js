var fs = require('fs');
var path = require('path');
var jsbeautify = require('js-beautify').js;
var inquirer = require('inquirer');
var ora = require('ora');
var chalk = require('chalk');
var logger = require('./logger.js');

var pkgPath = path.join(__dirname, '../package.json');

function getPkgObj() {
	return JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
}

function getPkgField(flag) {
	return getPkgObj()[flag];
}

function setPkgField(flag, value) {
	let obj = getPkgObj();
	obj[flag] = `${value}`;
	return new Promise((resolve, reject) => {
		fs.writeFile(pkgPath, jsbeautify(JSON.stringify(obj)), (err) => {
			if (err) {
				console.log(err);
				reject(err);
			}
			resolve(value);
		});
	});
}

function getSize(code) {
	return (code.length / 1024).toFixed(2) + 'kb';
};

function write(dest, code) {
	return new Promise(function(resolve, reject) {
		let spinner = ora(`Writing file to ${dest} ...`).start();
		fs.writeFile(dest, code, function(err) {
			if (err) return reject(err);
			spinner.stop();
			logger.success(`Write file to ${chalk.blue.bold(dest)} succeed, file size: ${chalk.blue.bold(getSize(code))}.`);
			resolve(code);
		});
	});
};

function updateVersion(versionFlag, version) {
	return inquirer
		.prompt([{
			type: 'input',
			name: 'version',
			message: `Which version for ${versionFlag}?`,
			default: version
		}])
		.then((answers) => {
			if (version !== answers.version) {
				version = answers.version;
				let spinner = ora(`Updating package.json ${versionFlag} to ${version} ...`).start();
				return setPkgField(versionFlag, version).then(() => {
					spinner.stop();
					logger.success(`Update package.json ${versionFlag} succeed.`);
					return version;
				});
			} else {
				return version;
			}
		});
}

function isDir(path) {
	return fs.existsSync(path) && fs.statSync(path).isDirectory();
}

function readDir(path) {
	if (fs.existsSync(path)) {
		return fs.readdirSync(path);
	}
	return [];
}

module.exports = {
	getSize,
	write,
	updateVersion,
	pkgPath,
	getPkgObj,
	getPkgField,
	setPkgField,
	readDir,
	isDir
};

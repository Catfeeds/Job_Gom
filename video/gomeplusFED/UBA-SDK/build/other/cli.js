require("babel-register");
var { readDir, isDir } = require('../common.js');
var { build, output } = require('./build.js');
var {paths} = require('./config');
var path = require('path');
var ora = require('ora');
var inquirer = require('inquirer');
let spinner;

function getFileName(folderPath) {
	var fileList = readDir(folderPath);
	return inquirer
	.prompt([{
		type: 'list',
		name: 'option',
		message: 'Which file?',
		choices: fileList
	}]).then((answer) => {
		var _path = path.join(folderPath, answer.option);
		if (isDir(_path)) {
			return getFileName(_path);
		} else {
			return {fullpath: _path, path: answer.option};
		}
	});
}

getFileName(paths.entryPath('')).then(function(pathObj) {
	return build({entry: pathObj.fullpath}).then(function(bundle) {
		return output({code: bundle.code,
			target1: paths.rawPath(pathObj.path),
			target2: paths.distPath(pathObj.path)});
	});
});
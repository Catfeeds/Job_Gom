var fs = require('fs');
var path = require('path');
var {
	exec,
	execSync
} = require('child_process');
var os = require('os');
var inquirer = require('inquirer');
var ora = require('ora');
var chalk = require('chalk');
var simpleGit = require('simple-git')(path.join(__dirname, '../'));
var logger = require('./logger.js');
let answersResult = {};
let outputResult = {};

module.exports.default =
	inquirer
	.prompt([{
		type: 'confirm',
		name: 'release',
		message: 'Ppush to release branch?',
		default: false
	}])
	.then((answers) => {
		answersResult.release = answers.release;
		if (answersResult.release) {
			if (!fs.existsSync(path.join(__dirname, './dont-delete'))) {
				let spinner = ora(`Doing some preparation work ...`).start();
				return new Promise((resolve, reject) => {
					let cmd = os.platform() === 'win32' ? `rd /s/q ${path.join(__dirname, '../dist')}` : `rm -rf ${path.join(__dirname, '../dist')}`;
					cmd += ` && git add . && git commit -m "del dist for add subtree" && git subtree add -P dist origin release`;
					exec(cmd, (err) => {
						if (err) {
							reject(err);
						}
						fs.writeFileSync(path.join(__dirname, './dont-delete'), "Just check subtree status. Please do not delete.");
						spinner.stop();
						logger.success('Preparation work succeed.');
						resolve();
					});
				});
			}
		}
	})
	.then(() => inquirer
		.prompt([{
			type: 'confirm',
			name: 'ubasdk',
			message: 'Build UBA-SDK?',
			default: true
		}]))
	.then((answers) => {
		if (answers.ubasdk) {
			return require('./ubasdk/cli').default.then((res) => {
				Object.assign(outputResult, res);
			});
		}
	}).then(() => inquirer
		.prompt([{
			type: 'confirm',
			name: 'sitemoniter',
			message: 'Build sitemoniter?',
			default: false
		}]))
	.then((answers) => {
		if (answers.sitemoniter) {
			return require('./sitemoniter/cli.js').default.then((res) => {
				Object.assign(outputResult, res);
			});
		}
	})
	.then(() => {
		if (answersResult.release) {
			let spinner = ora(`Pushing to release branch ...`).start();
			return new Promise((resolve, reject) => {
				simpleGit.status((err, msg) => {
					if (err) {
						reject(err);
					}
					if (msg.files.length) {
						execSync(`git add . && git commit -m "build: ${JSON.stringify(outputResult)}"`);
					}
					exec(`git push origin && git subtree push -P dist origin release`, (err) => {
						if (err) {
							reject(err);
						}
						spinner.stop();
						logger.success('Push to release branch succeed.');
						resolve();
					});
				});
			});
		}
	})
	.then(() => {
		return logger.success('All succeed.');
	})
	.catch((e) => {
		console.log(e);
	});

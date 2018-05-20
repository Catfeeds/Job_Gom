const fs = require('fs');
const { exec, execSync } = require('child_process');

const fetch = require('node-fetch');
const FormData = require('form-data');
const ora = require('ora');
const inquirer = require('inquirer');
const chalk = require('chalk');
const { js_beautify } = require('js-beautify');

const logger = require('./logger.js');

const authApi = 'http://gitlab.intra.gomeplus.com/oauth/token';

const apiPrefix = 'http://gitlab.intra.gomeplus.com/api/v3';

let accessToken = '';

let allProjectDetail = [];

let answersObj = {};

let beginTime = Date.now();

inquirer
	.prompt([{
		type: 'input',
		message: 'user name',
		name: 'user',
		default: 'luoye'
	}, {
		type: 'password',
		message: 'password',
		name: 'pwd',
	}, {
		type: 'input',
		message: 'group name',
		name: 'group',
		default: 'gomeplusFED'
	}])
	.then((answers) => {
		answersObj = answers;
		const form = new FormData();
		form.append('grant_type', 'password');
		form.append('username', answersObj.user);
		form.append('password', answersObj.pwd);
		// 获取 access_token
		return new Promise((resolve, reject) => {
			fetch(authApi, {
					method: 'POST',
					body: form
				})
				.then((res) => {
					return res.json();
				})
				.then((res) => {
					if (res.error) {
						reject(res);
					} else {
						resolve(res);
					}
				})
				.catch((e) => {
					reject(e);
				});
		})
	})
	.then((res) => {
		accessToken = res.access_token;
	})
	.then(() => {
		// 获取所有 project 信息
		return new Promise((resolve, reject) => {
			let page = 1;
			let spinner = ora('Get all projects info ...').start();
			function loop() {
				fetch(`${apiPrefix}/groups/${answersObj.group}/projects?access_token=${accessToken}&page=${page}`)
					.then((res) => {
						return res.json();
					})
					.then((res) => {
						if (res.message === '404 Not found') {
							reject(res);
						} else if (res.length) {
							allProjectDetail = allProjectDetail.concat(res);
							page++;
							loop();
						} else {
							fs.writeFileSync('./back/info.json', js_beautify(JSON.stringify(allProjectDetail)), {
								'indent_size': 4,
								'indent_with_tabs': false
							});
							spinner.stop();
							logger.success('Get all projects info succeed.')
							resolve();
						}
					})
					.catch((e) => {
						reject(e);
					});
			}
			loop();
		});
	})
	.then(() => {
		// 递归 clone
		return new Promise((resolve, reject) => {
			let info = JSON.parse(fs.readFileSync('./back/info.json', 'utf-8'));
			function loop() {
				let one = info[0];
				if (!one) return resolve();
				if (fs.existsSync(`./back/${one.name}`)) {
					execSync(`rm -rf ./back/${one.name}`);
				}
				let spinner = ora(`Clone ${one.name} ...`).start();
				let sshUrl = one.ssh_url_to_repo;
				exec(`cd back && git clone --mirror ${sshUrl} ./${one.name}`, {
					maxBuffer: 1024 * 1024 * 20
				}, (err) => {
					spinner.stop();
					if (err) {
						logger.fatal(`${chalk.red.bold(one.name)} 备份失败`);
						logger.fatal(err);
					} else {
						logger.success(`Clone ${chalk.cyan.bold(one.name)} succeed.`);
					}
					info.splice(0, 1);
					loop();
				})
			}
			loop();
		})
	})
	.then((res) => {
		logger.success('All done.');
		logger.success(`Tiem: ${Date.now() - beginTime} ms`);
	})
	.catch((e) => {
		console.log(e);
	})

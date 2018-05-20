const Mongoose = require('mongoose');
const fetch = require('node-fetch');
const FormData = require('form-data');
const minimist = require('minimist');
const ora = require('ora');

const logger = require('./logger.js');

const argv = minimist(process.argv.slice(2));
const env = argv.env || 'dev';

const dbConfig = require('./database/config.js');

const dbHandler = require('./database/handler.js');
global.DB = Mongoose.connect(`mongodb://${dbConfig[env].host}:${dbConfig[env].port}/${dbConfig[env].database}`, {
	user: dbConfig[env].username,
	pass: dbConfig[env].password
});
const Commit = dbHandler('commits');

const authApi = 'http://gitlab.intra.gomeplus.com/oauth/token';

const apiPrefix = 'http://gitlab.intra.gomeplus.com/api/v3';

let loginInfo = {};

let allCommitLen = 0;

let spinner = null;

function login() {
	return new Promise((resolve, reject) => {
		spinner = ora('登录中 ...').start();
		const form = new FormData();
		form.append('grant_type', 'password');
		form.append('username', 'luoye');
		form.append('password', '6232.gome');
		fetch(authApi, {
				method: 'POST',
				body: form
			})
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				spinner.stop();
				logger.success('登录成功！');
				spinner.start();
				resolve(res);
			})
			.catch((e) => {
				reject(e);
			});
	})
}


function getAllProject() {
	return new Promise((resolve, reject) => {
		spinner.text = `获取 GomePlusFED 的所有项目`;
		let allProjectDetail = [];
		let page = 1;
		function loop() {
			fetch(`${apiPrefix}/groups/gomeplusFED/projects?access_token=${loginInfo['access_token']}&page=${page}&per_page=100`)
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
						spinner.stop();
						logger.success('获取 GomePlusFED 的所有项目成功！');
						spinner.start();
						resolve(allProjectDetail);
					}
				})
				.catch((e) => {
					reject(e);
				});
		}
		loop();
	});
}

function getAllBranch(repoInfo) {
	return new Promise((resolve, reject) => {
		let branchesArr = [];
		let page = 0;
		spinner.text = `获取 ${repoInfo.name} 的所有分支`;
		function loop() {
			fetch(`${apiPrefix}/projects/${repoInfo.id}/repository/branches?access_token=${loginInfo['access_token']}`)
				.then((res) => {
					return res.json();
				})
				.then((res) => {
					if (res.message === '404 Not found') {
						reject(res);
					} else {
						res.forEach((item) => {
							branchesArr.push(item.name);
						})
						spinner.stop();
						logger.success(`获取 ${repoInfo.name} 的所有分支成功！`);
						spinner.start();
						resolve(branchesArr);
					}
				})
				.catch((e) => {
					reject(e);
				})
		}
		loop();
	});
}

function getOneRepoCommit(repoInfo, branch) {
	return new Promise((resolve, reject) => {
		spinner.text = `获取 ${repoInfo.name} ${branch} 的所有 commit ...`;
		let page = 0;
		let len = 0;
		function loop() {
			spinner.text = `获取 ${repoInfo.name} ${branch} 的第 ${page} 页 commit ...`;
			fetch(`${apiPrefix}/projects/${repoInfo.id}/repository/commits?access_token=${loginInfo['access_token']}&ref_name=${branch}&page=${page}&per_page=100`)
				.then((res) => {
					return res.json();
				})
				.then((res) => {
					if (res.message === '404 Not found') {
						reject(res);
					} else if (res.length) {
						len += res.length;
						let curr = [...res];
						spinner.text = `努力的一条一条插入数据库中 ...`;
						function innerLoop(cb) {
							let one = curr[0];
							if (one) {
								Commit.update({
									id: one.id,
									repo_id: repoInfo.id,
									branch_name: branch
								}, {
									"id": one.id,
									"short_id": one.short_id,
									"title": one.title,
									"author_name": one.author_name,
									"author_email": one.author_email,
									"created_at": one.created_at,
									"message": one.message,
									"repo_name": repoInfo.name,
									"repo_id": repoInfo.id,
									"branch_name": branch
								}, {
									upsert: true
								}, (err) => {
									if (err) reject(err);
									curr.splice(0, 1);
									setTimeout(() => {
										innerLoop(cb);
									}, 100);
								})
							} else {
								cb();
							}
						}
						innerLoop(() => {
							page++;
							loop();
						});
					} else {
						spinner.stop();
						logger.success(`插入 ${repoInfo.name} ${branch} 的共 ${len} 条 commit 成功 ...`);
						spinner.start();
						resolve();
					}
				})
				.catch((e) => {
					reject(e);
				});
		}
		loop();
	});
}

function handleOnePorject(oneRepo) {
	return new Promise((resolve, reject) => {
		getAllBranch(oneRepo)
			.then((branches) => {
				let cur = [...branches];
				function loop() {
					let one = cur[0];
					if (one) {
						getOneRepoCommit(oneRepo, one)
							.then(() => {
								cur.splice(0, 1);
								loop();
							})
					} else {
						resolve();
					}
				}
				loop();
			})
	});
}

function getAllCommits(allProject) {
	return new Promise((resolve, reject) => {
		let cur = [...allProject];
		function loop() {
			let one = cur[0];
			if (one) {
				handleOnePorject(one)
					.then(() => {
						cur.splice(0, 1);
						loop();
					});
			} else {
				resolve();
			}
		}
		loop();
	});
}

async function main() {
	try {
		let begin = Date.now();
		loginInfo = await login();
		let allProject = await getAllProject();
		await getAllCommits(allProject);
		logger.success(`耗时： ${begin - Date.now()} ms`);
		Mongoose.connection.close();
		process.exit(1);
	} catch(e) {
		console.log(e);
	}
}

main();
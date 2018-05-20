/* 
 * 格式化所有仓库的 log 并写库
 */
const fs = require('fs');
const path = require('path');
const { exec, execSync } = require('child_process');

const Mongoose = require('mongoose');
Mongoose.Promise = global.Promise;
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

// 用之前的备份脚本备份好的文件夹，下同
const allRepoRoot = path.join(__dirname, './back');
const allRepoInfo = JSON.parse(fs.readFileSync(path.join(allRepoRoot, 'info.json'), 'utf-8'));

let spinner = ora('').start();

// 获取仓库的所有分支
function getAllBranch(repoInfo) {
	return new Promise((resolve, reject) => {
		spinner.text = `获取 ${repoInfo.name} 的所有分支 ...`;
		spinner.start();
		exec(`cd ${path.join(allRepoRoot, repoInfo.name)} && git branch -a`, (err, stdout, stderr) => {
			if (err) return reject(err);
			let result = stdout.split('\n').map((item) => {
				return item.replace(/\*|\s/g, '');
			}).filter((item) => {
				// 过滤掉自动打的分支
				return !/develop2016_/.test(item);
			});
			result.pop();
			spinner.stop();
			logger.success(`获取 ${repoInfo.name} 的所有分支成功`);
			resolve(result);
		});
	});
}

// 分析一个仓库的一个分支
function analyzeRepoOneBranch(repoInfo, branch) {
	return new Promise((resolve, reject) => {
		spinner.text = `分析 ${repoInfo.name} 的 ${branch} 分支中 ...`;
		spinner.start();
		exec(`cd ${path.join(allRepoRoot, repoInfo.name)} && git log --format=author{{is}}%cn{{semi}}email{{is}}%ce{{semi}}message{{is}}%s{{semi}}timestamp{{is}}%cd{{semi}}id{{is}}%H{{semi}}short_id{{is}}%h ${branch}`, {
			maxBuffer: 1024 * 1024 * 1024
		}, (err, stdout, stderr) => {
			if (err) return reject(err);
			let outArr = stdout.split('\n');
			let allResult = [];
			function loop() {
				let one = outArr[0];
				if (!one) {
					// 结束了 最后写一遍库
					return writeDB(allResult)
						.then(() => {
							spinner.stop();
							logger.success(`分析 ${repoInfo.name} 的 ${branch} 分支成功`);
							resolve();
						})
				};
				// 格式化 commit 信息
				let result = {};
				let baseInfoArr = one.split('\n')[0].split('{{semi}}');
				baseInfoArr.forEach((item) => {
					let cur = item.split('{{is}}');
					result[cur[0]] = cur[1];
				});
				if (result['message'] === 'hit tags by FEwebTags') {
					outArr.splice(0, 1);
					return loop();
				}
				result.repo_name = repoInfo.name;
				result.repo_id = repoInfo.id;
				result.ref_name = branch;
				result.file_status = {};
				exec(`cd ${path.join(allRepoRoot, repoInfo.name)} && git show ${result.id} --name-status --oneline --format=${process.platform === 'win32' ? '\n' : '""'}`, {
					maxBuffer: 1024 * 1024 * 1024
				}, (err, stdout, stderr) => {
					if (err) return reject(err);
					let fileInfoArr = stdout.split('\n');
					fileInfoArr.pop();
					fileInfoArr.filter((item) => {
						// 过滤掉含有 node_modules 的文件状态 | 对 很多 项目的特殊处理，额外文件太特么多了！！！
						return !/node_modules|\.sass-cache|bower_components|publics\/admin\/js\/vendors/.test(item);
					}).forEach((item) => {
						let cur = item.split('\t');
						if (result.file_status[cur[0]]) {
							result.file_status[cur[0]].push(cur[1]);
						} else {
							result.file_status[cur[0]] = [];
							result.file_status[cur[0]].push(cur[1]);
						}
					});
					allResult.push(result);
					if (allResult.length >= 100) {
						// 100条了写一遍库
						writeDB(allResult)
							.then(() => {
								allResult = [];
								outArr.splice(0, 1);
								loop();
							})
					} else {
						outArr.splice(0, 1);
						loop();
					}
				});
			}
			loop();
		})
	});
}

// 写库
function writeDB(commits) {
	return new Promise((resolve, reject) => {
		// 插入多个，用索引防止重复
		Commit
			.collection.insertMany(commits, {
				ordered: false
			})
			.then(() => {
				resolve();
			})
			.catch((err) => {
				// 这里的错误一般是重复插入的错，所以跳过直接下一步
				resolve();
			});
	});
}

// 延时
function delay(ms) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve();
		}, ms || 300);
	});
}

// 分析一个仓库
function analyzeOneRepo(repoInfo) {
	return new Promise((resolve, reject) => {
		spinner.stop();
		logger.success(`开始分析 ${repoInfo.name} ...`);
		getAllBranch(repoInfo)
			.then((branches) => {
				return new Promise((resolve, rejetc) => {
					let allBranches = [...branches];
					function loop() {
						let one = allBranches[0];
						if (!one) {
							spinner.stop();
							logger.success(`分析 ${repoInfo.name} 成功`);
							return resolve();
						}
						analyzeRepoOneBranch(repoInfo, one)
							.then(() => {
								allBranches.splice(0, 1);
								loop();
							})
							.catch((e) => {
								reject(e);
							});
					}
					loop();
				});
			})
			.then(() => {
				resolve();
			})
			.catch((e) => {
				reject(e);
			});
	});
}

function main() {
	let allRepos = [...allRepoInfo];
	let begin = Date.now();
	function loop() {
		let one = allRepos[0];
		if (!one) {
			spinner.stop();
			logger.success(`结束，耗时：${Date.now() - begin} ms!`);
			Mongoose.connection.close();
			process.exit(1);
			return;
		}
		analyzeOneRepo(one)
			.then(() => {
				allRepos.splice(0, 1);
				loop();
			})
			.catch((e) => {
				spinner.stop();
				console.log(e);
				Mongoose.connection.close();
				process.exit(1);
			});
	}
	loop();
}

main();

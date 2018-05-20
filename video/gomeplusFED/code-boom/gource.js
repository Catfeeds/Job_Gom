// 生成 gource log
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

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

const { js_beautify } = require('js-beautify');

// 结果
let result = {};

let spinner = ora('').start();

// 成员人数
function getMembersNum() {
	return new Promise((resolve, reject) => {
		spinner.stop();
		spinner.text = '获取成员总数 ...';
		spinner.start();
		Commit
			.count({
				fire_status: 1
			})
			.distinct('email')
			.exec((err, c) => {
				if (err) return reject(err);
				spinner.stop();
				logger.success('获取成员总数成功');
				resolve(c.length);
			});
	});
}

// 仓库数
function getReposNum() {
	return new Promise((resolve, reject) => {
		spinner.stop();
		spinner.text = '获取仓库总数 ...';
		spinner.start();
		Commit
			.find({
				fire_status: 1
			})
			.distinct('repo_name')
			.exec((err, c) => {
				if (err) return reject(err);
				spinner.stop();
				logger.success('获取仓库总数成功');
				resolve(c.length);
			});
	});
}

// 分支数
function getBranchsNum() {
	return new Promise((resolve, reject) => {
		spinner.stop();
		spinner.text = '获取分支总数 ...';
		spinner.start();
		Commit
			.find({
				fire_status: 1
			})
			.distinct('repo_name')
			.exec((err, c) => {
				if (err) return reject(err);
				let len = 0;
				let cur = [...c];
				function loop() {
					let one = cur[0];
					if (!one) {
						spinner.stop();
						logger.success('获取分支总数成功');
						return resolve(len);
					}
					getOneRepoBranchsNum(one)
						.then((num) => {
							len += num;
							cur.splice(0, 1);
							loop();
						});
				}
				loop();
			});
	});
}

function getOneRepoBranchsNum(repoName) {
	return new Promise((resolve, reject) => {
		Commit
			.find({
				fire_status: 1,
				repo_name: repoName
			})
			.distinct('ref_name')
			.exec((err, c) => {
				if (err) return reject(err);
				resolve(c.length);
			});
	});
}

// commit 数
function getCommitsNum() {
	return new Promise((resolve, reject) => {
		spinner.stop();
		spinner.text = '获取提交总数 ...';
		spinner.start();
		Commit
			.count({
				fire_status: 1
			})
			.exec((err, c) => {
				if (err) return reject(err);
				spinner.stop();
				logger.success('获取提交总数成功');
				resolve(c);
			});
	});
}

// generate gource log
function genGourceLog() {
	return new Promise((resolve, reject) => {
		// 每次查询 1k 条数据按 时间 排序，格式化成  timestamp|luoye|A|/repo/file_path
		spinner.stop();
		spinner.text = '生成 gource.log ...';
		spinner.start();
		fs.writeFileSync('./gource.log', '', 'utf-8');
		let defaultBranch = JSON.parse(fs.readFileSync('./default-branch.json', 'utf-8'));
		let step = 1000;
		let skip = 0;
		function loop() {
			Commit
				.find({
					fire_status: 1
				})
				.sort({
					timestamp: 1
				})
				.limit(step)
				.skip(skip)
				.exec((e, data) => {
					if (e) return reject(e);
					if (!data.length) {
						spinner.stop();
						logger.success('生成 gource.log 成功');
						return resolve();
					}
					let result = [];
					data.forEach((item) => {
						if (defaultBranch[item.repo_name] === item.ref_name) {
							let cur = handelOneCommit(item);
							if (cur.length) {
								result.push(cur);
							}
						}
					});
					fs.appendFileSync('./gource.log', result.join('\n'), 'utf-8');
					skip += step;
					loop();
				});
		}
		loop();
		function handelOneCommit(commit) {
			let result = [];
			let choice = ['A', 'M', 'D'];
			Object.keys(commit.file_status).forEach((item) => {
				if (choice.includes(item)) {
					commit.file_status[item].forEach((each) => {
						result.push(`${new Date(commit.timestamp).valueOf()}|${commit.author}|${item}|/${commit.repo_name}/${each}`);
					});
				}
			});
			return result.join('\n');
		}
	});
}

async function genResult() {
	try {
		result['membresNum'] = await getMembersNum();
		result['reposNum'] = await getReposNum();
		result['branchsNum'] = await getBranchsNum();
		result['commitsNum'] = await getCommitsNum();
		return result;
	} catch(e) {
		logger.fatal(e);
		Mongoose.connection.close();
		process.exit(1);
	}
}

// genResult()
	// .then((text) => {
		// console.log(text);
		// return genGourceLog();
	// });
genGourceLog();

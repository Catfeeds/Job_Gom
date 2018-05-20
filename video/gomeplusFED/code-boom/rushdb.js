/*
 * 洗库
 * 分析所有 commit 的 email 与预制好的 map 对比，复写相关 name 和 email
 */
const fs = require('fs');
const path = require('path');

const Mongoose = require('mongoose');
Mongoose.Promise = global.Promise;
const minimist = require('minimist');
const ora = require('ora');
const { js_beautify } = require('js-beautify');
const inquirer = require('inquirer');

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

let spinner = ora('').start();

function getAllEmailsInDB() {
	return new Promise((resolve, reject) => {
		spinner.text = '获取所有 email 中 ...';
		Commit
			.distinct('email')
			.exec((err, data) => {
				spinner.stop();
				logger.success('获取所有 email 成功');
				return resolve(data);
			});
	});
}

getAllEmailsInDB()
	.then((arr) => {
		return new Promise((resolve, reject) => {
			let authorMap = JSON.parse(fs.readFileSync('./authormap.json', 'utf-8'));
			let blankEmail = [];
			let index = 0;
			arr.forEach((item) => {
				if (!authorMap[item]) {
					blankEmail.push({
						type: 'input',
						message: `${item} 的 name 是？`,
						name: `${item}{split}name`,
						default: `${item.split('@')[0]}`
					});
					blankEmail.push({
						type: 'input',
						message: `${item} 的 default_email 是？`,
						name: `${item}{split}defaule_email`,
						default: item
					})
				};
			});
			spinner.stop();
			resolve(blankEmail);
		});
	})
	.then((blankEmailQuestion) => {
		if (blankEmailQuestion.length) {
			logger.fatal('有人员信息没有匹配上，请手动完成！');
			return inquirer.prompt(blankEmailQuestion);
		}
	})
	.then((answers) => {
		return new Promise((resolve, reject) => {
			if (!answers) return resolve();
			let authorMap = JSON.parse(fs.readFileSync('./authormap.json', 'utf-8'));

			let result = {};
			let answersKeys = Object.keys(answers);
			for (let i = 0; i < answersKeys.length; i += 2) {
				let cur = answersKeys[i];
				let split = cur.split('{split}');
				result[split[0]] = {};
				result[split[0]]['name'] = answers[answersKeys[i]];
				result[split[0]]['default_email'] = answers[answersKeys[i + 1]];
			}

			Object.assign(authorMap, result);

			fs.writeFileSync('./authormap.json', js_beautify(JSON.stringify(authorMap), {
				'indent_size': 4,
				'indent_with_tabs': true,
			}))
			logger.success('生成所有人员信息成功!');
			resolve();
		});
	})
	.then(() => {
		return new Promise((resolve, reject) => {
			spinner.text = '替换邮箱与姓名中 ...';
			spinner.start();
			let authorMap = JSON.parse(fs.readFileSync('./authormap.json', 'utf-8'));
			let authorArr = Object.keys(authorMap);
			function loop() {
				let one = authorArr[0];
				if (!one) {
					spinner.stop();
					logger.success('替换邮箱与姓名成功！');
					return resolve();
				};
				spinner.text = `替换 ${one} ...`;

				Commit.update({
					email: one
				}, {
					$set: {
						author: authorMap[one]['name'],
						email: authorMap[one]['default_email'],
						fire_status:  authorMap[one]['status'] || 0
					}
				}, {
					multi: true
				}).exec((err, tank) => {
					if (err) return reject(err);
					authorArr.splice(0, 1);
					loop();
				});
			}
			loop();
		});
	})
	.then(() => {
		Mongoose.connection.close();
		process.exit(1);
	})
	.catch((e) => {
		console.log(e);
		Mongoose.connection.close();
		process.exit(1);
	})

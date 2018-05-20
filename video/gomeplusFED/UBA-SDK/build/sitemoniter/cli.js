// require("babel-register");
var {
	chain,
	operations
} = require('./build.js');
var inquirer = require('inquirer');

const choices = ['all', ...operations.map(x => x.comment), 'cancel'];

module.exports.default = inquirer
	.prompt([{
		type: 'list',
		name: 'option',
		message: 'Which file?',
		choices
	}]).then((answer) => {
		switch (answer.option) {
			case choices[0]:
				return chain();
			case choices[choices.length - 1]:
				return;
			default:
				return operations[choices.findIndex(x => (x === answer.option)) - 1].build();
		}
	});

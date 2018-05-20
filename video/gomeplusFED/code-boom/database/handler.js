const mongoose = require('mongoose');

const models = require('./models.js');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

Object.keys(models).forEach((item) => {
	let schema = new Schema(models[item]);
	// 为 commit 建立索引
	if (item === 'commits') {
		schema.index({
			id: 1,
			repo_id: 1,
			ref_name: 1
		}, {
			unique: true
		})
		schema.index({
			timestamp: 1
		})
	}
	mongoose.model(item, schema);
});

module.exports = function(type) {
	return mongoose.model(type);
};

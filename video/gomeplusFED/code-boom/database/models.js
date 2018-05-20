module.exports = {
	"commits": {
		"id": String,
		"short_id": String,
		"author": String,
		"email": String,
		"timestamp": Date,
		"message": String,
		"repo_name": String,
		"repo_id": Number,
		"ref_name": String,
		"file_status": Object,
		"fire_status": {
			type: Number,
			default: 1
		}
	}
};

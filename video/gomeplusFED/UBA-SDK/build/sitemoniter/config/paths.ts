const path = require('path');
const paths = {
	baseDir: path.join(__dirname, '../../../src/sitemoniter/'),
    configPath(dirname, filename = 'config.json') {
		return path.join(paths.baseDir, dirname, filename);
	},
	entryPath(dirname, filename = 'index.js') {
		return path.join(paths.baseDir, dirname, filename);
	},
	outputPath(filename = 'unknown-bundle.js') {
		return path.join(__dirname, '../../../dist/', filename);
	},
	rawOutputPath(filename = 'unknown-raw-bundle.js') {
		return path.join(__dirname, '../../../dist_raw/', filename);
	}
};
module.exports = paths;
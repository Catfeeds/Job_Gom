import path from 'path';

import test from 'ava';

import * as rollup from 'rollup';
import babel from 'rollup-plugin-babel';

import * as log from '../../util/logger.js';

test('build', async x => {
	rollup.rollup({
		entry: path.join(__dirname, '../../../src/app.js'),
		plugins: [
			babel()
		]
	}).then(function(bundle) {
		return bundle.generate({
			format: 'umd',
			moduleName: 'UBASDK'
		}).code;
	}).then(() => {
		x.pass('build succeed.');
	}).catch((e) => {
		log.fatal(e);
		x.fail('build error.');
	});
});

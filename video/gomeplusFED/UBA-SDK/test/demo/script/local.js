import { querySelector } from '../../../polyfill/query.js';
import {trigger} from '../../../src/event.js';
import apiGen from '../../util/api.test.local.js';

const api = apiGen({
	url:{
		fetch: 'http://127.0.0.1:8788/api/task',
		report: 'http://127.0.0.1:8788/api/task/report'
	}
});

let res = api.$apply();

export default res;

import { STORAGE_KEY, STORAGE_HISTORY_KEY } from '../state/data.js';
import createLogger from './logger.js';

const localStoragePlugin = store => {
	store.subscribe((mutation, {dbList}) => {
		if (dbList) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(dbList));
		}
	});
	store.subscribe((mutation, {sqlList}) => {
		if (sqlList) {
			localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(sqlList));
		}
	});
};

export default process.env !== 'production'
? [localStoragePlugin]
: [localStoragePlugin];

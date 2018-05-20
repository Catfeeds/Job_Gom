export const STORAGE_KEY = 'dblist';
export const STORAGE_HISTORY_KEY = 'history_sql';

export default {
	dbList: JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'),
	contentList: [],
	relateList: [],
	relateConfig: {
		show: false
	},
	editConfig: {
		show: false
	},
	groupConfig: {
		show: false
	},
	groupList: [],
	orderbyList: [],
	sqlList: JSON.parse(localStorage.getItem(STORAGE_HISTORY_KEY) || '[]'),
	funList: {},
	expList: []
};

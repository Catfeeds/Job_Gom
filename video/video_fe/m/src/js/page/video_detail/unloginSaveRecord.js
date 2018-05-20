/**
 * [未登录状态下保存观看记录]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */

import isSecretBrowse from 'util/isSecretBrowse';
function unloginSaveRecord(data){
	if (isSecretBrowse()) {
		return false;
	}
	var localStorageKey = 'gm_m_v_record_log';
	var topicId = data.tid;
	var time = Math.floor((+new Date())/1000);

	var record = {};

	var ls = localStorage.getItem(localStorageKey);
	if (typeof ls === 'string') {
		record = JSON.parse(ls);
	}
	record[topicId] = time;
	localStorage.setItem(localStorageKey, JSON.stringify(record));
}

export default unloginSaveRecord;
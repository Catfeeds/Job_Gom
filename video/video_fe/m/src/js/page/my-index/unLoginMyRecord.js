/**
 * [未登录观看记录]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import getLocalRecord from 'util/getLocalRecord';
import fetch from 'io/fetch';
import myRecordTpl from './unloginRecordTpl.js';

let $myRecordDom = $('[data-node="myRecord"]');
let localRecord = getLocalRecord();
let defaultRecord = [];

if (localRecord.length) {
	defaultRecord = localRecord.splice(0,2);
}

function getRecordInfo(){
	if (!defaultRecord.length) {
		return false;
	}
	fetch.post('/unLoginHistoryList.json',{
		data:{
			video_seg: defaultRecord.join(',')
		},
		success:function(data){
			var list = data.data;
			var html = '';
			if (data.code == 200) {
				html = myRecordTpl(list);
				$myRecordDom.append($(html));
			}
		},
		error:function(){
			// nothing to do
		}
	});
}

export default getRecordInfo;
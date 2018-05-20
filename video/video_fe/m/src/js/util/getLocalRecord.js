/**
 * [获取适配后的本地视频观看记录]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
function getLocalRecord(){
	var localStorageKey = 'gm_m_v_record_log';

	var record = localStorage.getItem(localStorageKey);
	record = JSON.parse(record);

	var recordList = [];
	for(var k in record){
		recordList.push(k+'-'+record[k]);
	}

	recordList.sort(function(a,b){
		var atime = a.split('-')[1];
		var btime = b.split('-')[1];
		return (btime - atime);
	});
	return recordList;
}

export default getLocalRecord;
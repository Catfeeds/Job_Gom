/**
 * [登录后观看记录]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import fetch from 'io/fetch';
import myRecordTpl from './loginedRecordTpl.js';


let $myRecordDom = $('[data-node="myRecord"]');

function loginedRecordInfo(){
	fetch.get('/loginHistoryList.json',{
		data:{
			cursor: $CONFIG.cursor,
			size:2,
			order: 'desc'
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

export default loginedRecordInfo;
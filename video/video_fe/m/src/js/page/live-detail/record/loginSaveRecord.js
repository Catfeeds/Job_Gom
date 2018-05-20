/**
 * [登录状态下保存观看记录]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import fetch from 'io/fetch';

function loginSaveRecord(data){
	let topicId = data.tid;
	fetch.post('/historyPost.json',{
		data:{
			video_id: topicId
		},
		success:function(data){
			// 记录成功，nothing to do
		},
		error:function(){
			// nothing to do
		}
	});
}

export default loginSaveRecord;
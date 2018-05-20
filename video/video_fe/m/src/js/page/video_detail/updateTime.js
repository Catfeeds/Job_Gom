/**
 * [更新记录播放时长]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import fetch from 'io/fetch';

function sendRequest(id,duration){
	duration = parseInt(duration);
	fetch.post('/historyUpdate.json',{
		data:{
			video_id: id,
			duration: duration
		},
		success:function(data){
			// 记录成功，nothing to do
		},
		error:function(){
			// nothing to do
		}
	});
}

function updateTime(id,v){
	let topicId = id;
	v.on('playPause',function(){
		let duration = v.currentTime();
		sendRequest(id, duration);
	});
	v.on('playStop',function(){
		let duration = v.currentTime();
		sendRequest(id, duration);
	});
	window.onbeforeunload = function(){
		let duration = v.currentTime();
		sendRequest(id, duration);
		// return true;
	};
}

export default updateTime;
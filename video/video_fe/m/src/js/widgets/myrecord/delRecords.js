/**
 * [删除视频记录]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */

import fetch from 'io/fetch';
import toast from 'components/toast';

function del(ids,cb){
	fetch.post('/historydelete.json',{
		data:{
			ids:ids
		},
		success:function(data){
			cb && cb(data);
		},
		error:function(){
			toast('网络有问题，请稍后再试');
		}
	});
}

export default del;
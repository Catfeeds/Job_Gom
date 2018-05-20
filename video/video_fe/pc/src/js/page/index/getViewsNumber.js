/**
 * [获取观看数量]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
import fetch from 'io/fetch';

function getViews(idsStr, cb){
	fetch.get('v1/video/countGet',{
		domain:'domain-sault',
		data:{
			system: 'video',
			id:idsStr
		},
		success:function(data){
			cb && cb(data);
		},
		error: function(data){
			// nothing
		}
	});
}

export default getViews;
/*
@des:调用方法：
		import getApi from '@/utils/apis.js'
		getApi('aaa')
*/

var apiObj = {
	'aaa':'/aaa'
};


function get(name){
	for(var k in apiObj){
		return apiObj[k];
	}
}

export default get;
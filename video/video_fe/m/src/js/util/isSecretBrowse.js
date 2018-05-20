/**
 * [判断浏览器是否是私密无痕模式]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */
export default function isSecretBrowse(){  
	var _localStorage = window.localStorage;  
	if(!_localStorage){  
		return true;  
	}  
	var testKey = 'test';  
	try{  
		_localStorage.setItem(testKey, '1');  
		_localStorage.removeItem(testKey);  
		return false;  
	}catch (error){  
		return true;  
	}  
}	 
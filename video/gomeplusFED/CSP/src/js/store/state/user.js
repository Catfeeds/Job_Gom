import utils from 'utils';

export default {
	user_info: (() => {
		try{
			return JSON.parse(decodeURIComponent(utils.getCookie('user_info'))) ? JSON.parse(decodeURIComponent(utils.getCookie('user_info'))) : false;
		}catch(e){
			return false;
		}
	})()
}
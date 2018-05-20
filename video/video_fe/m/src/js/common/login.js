import {loginFlag, page} from 'util/phpCommon';

var login = function(){
	if(!loginFlag){
		location.href = page.loginUrl;
	}
};

export default login;
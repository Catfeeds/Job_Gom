/**
 * [判断是否有网络]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */

class Online{
	constructor(){
		this.isOnline = window.navigator.onLine;
		this._init();
	}
	_init(){
		window.addEventListener("online", ()=>{
			this.isOnline = true;
		});

		window.addEventListener("offline", ()=>{
			this.isOnline = false;
		});
	}
}

let instance;

export default () => {
	if(!instance){
		instance = new Online();
	}
	return instance;
};
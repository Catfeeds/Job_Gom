import GomeBridge from 'util/bridge';

var login = function(){
	// 因为jsbridge 在 ready 方法里调用了一次setHeadBar
	// 在login方法里面暂时移除ready回调
	// 等jsbrige对ready方法做限制后,再恢复
	// GomeBridge.ready(function(){
		GomeBridge.login();
	// });
};

export default login;

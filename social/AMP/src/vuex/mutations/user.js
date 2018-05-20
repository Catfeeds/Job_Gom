export const SETUSERINFO = function(state, userInfo) {
	state.userInfo = userInfo;
};
export const SETUSERNAME = function(state,userName){
	state.userInfo = Object.assign({},state.userInfo,{name:userName});
};
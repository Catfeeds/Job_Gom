GomeLogin.getUserInfo(function(data) {
	if (data) {
		// 已登录
		console.log(data);
	} else {
		// 未登录
		console.log(data);
	}
});

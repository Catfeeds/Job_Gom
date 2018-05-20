var ip = process.env === 'production' ? '10.69.113.31' : process.env === 'test' ? '10.69.112.146' : '10.69.112.67';
var casIp = process.env === 'production' ? '10.69.113.31' : '10.69.112.146';

export default {
	loading: false,
	alertConfig: {
		show: false,
		msg: 'alert message!', // support
		type: 'info', // info/warning/success/danger
		dismissible: false,
		delay: 2500
	},
	confirmConfig: {
		show: false,
		title: 'Confirm',
		msg: 'confirm msg',
		type: 'default', // default/primary/success/info/warning/danger
		applyFunc: 'func',
		cancelFunc: 'func',
		applyStr: 'Apply',
		cancelStr: 'Cancel'
	},
	permission: {},
	// loginUrl: 'http://sso.gomeplus.com:8888/cas/login?service=http://toybrick.gomeplus.com:18080/toy-brick/user/getUser',
	loginUrl: `http://${casIp}:8888/cas/logout?service=http://${casIp}:8888/cas/login?service=http://${ip}:18080/toy-brick/user/index`,
	logoutUrl: `http://${ip}:18080/toy-brick/user/logout`,
	sideNavShow: true,
	avatar: ''
};

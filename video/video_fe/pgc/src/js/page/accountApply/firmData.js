/**
 * [企业 - 用户信息表单数据格式]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 */

let firmData = {
	truename: {
		label: '真实姓名',
		isRequired: true,
		formType: 'input',
		name: 'truename',
		value: '',
		isDisabled: false,
		reg: 'notnull',
		placeholder: '请输入真实姓名，以便更好确认身份',
		msg: {
			ok: '',
			err: '',
			tips: '请输入真实姓名'
		},
		showMsg: 'ok',
		visible: true
	},
	identity_card: {
		label: '身份证号',
		isRequired: true,
		formType: 'input',
		name: 'identity_card',
		value: '',
		isDisabled: false,
		reg: 'identity',
		placeholder: '请输入真实身份证号，以便更好确认身份',
		msg: {
			ok: '',
			err: '请输入正确的身份证号码',
			tips: '请输入身份证号'
		},
		showMsg: 'ok',
		visible: true
	},
	mobile: {
		label: '手机号',
		isRequired: true,
		formType: 'input',
		name: 'mobile',
		value: '',
		isDisabled: false,
		reg: 'tel',
		placeholder: '',
		msg: {
			ok: '',
			err: '请输入正确的手机号',
			tips: '请输入手机号'
		},
		showMsg: 'ok',
		visible: true
	},
	smscode: {
		label: '验证码',
		isRequired: true,
		formType: 'captcha',
		name: 'smscode',
		value: '',
		isDisabled: false,
		reg: 'smscode',
		placeholder: '',
		msg: {
			ok: '',
			err: '请输入正确的验证码',
			tips: '请输入验证码'
		},
		showMsg: 'ok',
		visible: false
	},
	telephone: {
		label: '固定电话',
		isRequired: false,
		formType: 'input',
		name: 'telephone',
		value: '',
		isDisabled: false,
		reg: 'ignore',
		placeholder: '',
		msg: {
			ok: '',
			err: '',
			tips: ''
		},
		showMsg: 'ok',
		visible: true
	},
	email: {
		label: '邮箱',
		isRequired: true,
		formType: 'input',
		name: 'email',
		value: '',
		isDisabled: false,
		reg: 'email',
		placeholder: '',
		msg: {
			ok: '',
			err: '请输入正确的邮箱地址',
			tips: '请输入邮箱地址'
		},
		showMsg: 'ok',
		visible: true
	},
	wechat: {
		label: '微信号',
		isRequired: false,
		formType: 'input',
		name: 'wechat',
		value: '',
		isDisabled: false,
		reg: 'ignore',
		placeholder: '',
		msg: {
			ok: '',
			err: '',
			tips: ''
		},
		showMsg: 'ok',
		visible: true
	},
	company: {
		label: '公司名称',
		isRequired: true,
		formType: 'input',
		name: 'company',
		value: '',
		isDisabled: false,
		reg: 'notnull',
		placeholder: '',
		msg: {
			ok: '',
			err: '请输入公司名称',
			tips: '请输入公司名称'
		},
		showMsg: 'ok'
	},
	company_address: {
		label: '办公地址',
		isRequired: true,
		formType: 'input',
		name: 'company_address',
		value: '',
		isDisabled: false,
		reg: 'notnull',
		placeholder: '',
		msg: {
			ok: '',
			err: '请输入办公地址',
			tips: '请输入办公地址'
		},
		showMsg: 'ok'
	},
	business_license_num: {
		label: '统一社会信用代码',
		isRequired: true,
		formType: 'input',
		name: 'business_license_num',
		value: '',
		isDisabled: false,
		reg: 'uscc',
		placeholder: '请输入18位统一社会信用代码',
		msg: {
			ok: '',
			err: '请输入正确的统一社会信用代码',
			tips: '请输入统一社会信用代码'
		},
		showMsg: 'ok'
	},
	business_license_img: {
		label: '营业执照',
		isRequired: true,
		formType: 'image',
		name: 'business_license_img',
		value: '',
		isDisabled: false,
		reg: 'notnull',
		placeholder: '',
		msg: {
			ok: '',
			err: '请上传营业执照',
			tips: '请上传营业执照'
		},
		showMsg: 'ok'
	},
	company_site: {
		label: '公司网址',
		isRequired: false,
		formType: 'input',
		name: 'company_site',
		value: '',
		isDisabled: false,
		reg: 'ignore',
		placeholder: '',
		msg: {
			ok: '',
			err: '',
			tips: ''
		},
		showMsg: 'ok'
	}
};

export default firmData;
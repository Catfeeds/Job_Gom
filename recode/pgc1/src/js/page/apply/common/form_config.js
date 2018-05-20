/**
 * [表单模板数据]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 * showErro: 0/1/2   0:不显示；1：显示errorMsg； 2：显示tipsMsg
 */
 let formConfig = {
 	type: {
 		label: '媒体类型',
 		isRequired: true,
 		formType: 'radio',
 		name: 'type',
 		value: '1',
 		isDisabled: false,
 		reg: 'ignore',
 		placeholder: '',
 		errorMsg: '',
 		tipsMsg: '',
 		showErr: 0,
 		options:{
 			1: '企业',
 			2: '个人/自媒体'
 		}
 	},
 	apply_name: {
 		label: '申请人名称',
 		isRequired: true,
 		formType: 'input',
 		name: 'apply_name',
 		value: '',
 		isDisabled: false,
 		reg: 'name',
 		placeholder: '请填写真实姓名',
 		errorMsg: '请填写2-30个字符(汉字、字母或符号)的申请人名称',
 		tipsMsg: '请填写申请人名称',
 		showErr: 0
 	},
 	apply_description: {
 		label: '申请人简介',
 		isRequired: true,
 		formType: 'textarea',
 		name: 'apply_description',
 		value: '',
 		isDisabled: false,
 		reg: 'summary5_50',
 		placeholder: '5-50个字符',
 		errorMsg: '请填写5-50个字符的申请人简介',
 		tipsMsg: '请填写申请人简介',
 		showErr: 0
 	},
 	production_description: {
 		label: '作品简介',
 		isRequired: true,
 		formType: 'textarea',
 		name: 'production_description',
 		value: '',
 		isDisabled: false,
 		reg: 'summary5_70',
 		placeholder: '5-70个字符',
 		errorMsg: '请填写5-70个字符的作品简介',
 		tipsMsg: '请填写作品简介',
 		showErr: 0
 	},
 	contacts: {
 		label: '联系人姓名',
 		isRequired: true,
 		formType: 'input',
 		name: 'contacts',
 		value: '',
 		isDisabled: false,
 		reg: 'name',
 		placeholder: '请填写真实姓名',
 		errorMsg: '请填写2-30个字符(汉字、字母或符号)的联系人姓名',
 		tipsMsg: '请填写联系人姓名',
 		showErr: 0
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
 		errorMsg: '请填写正确的手机号',
 		tipsMsg: '请填写手机号',
 		showErr: 0
 	},
 	wechat: {
 		label: '微信号',
 		isRequired: false,
 		formType: 'input',
 		name: 'wechat',
 		value: '',
 		isDisabled: false,
 		reg: 'weixin',
 		placeholder: '',
 		errorMsg: '请填写正确微信号',
 		tipsMsg: '请填写微信号',
 		showErr: 0
 	},
 	email: {
 		label: '邮箱',
 		isRequired: false,
 		formType: 'input',
 		name: 'email',
 		value: '',
 		isDisabled: false,
 		reg: 'email',
 		placeholder: '',
 		errorMsg: '请填写正确的邮箱',
 		tipsMsg: '请填写邮箱',
 		showErr: 0
 	},
 	company:{
 		label: '公司或组织名称',
 		isRequired: true,
 		formType: 'input',
 		name: 'company',
 		value: '',
 		isDisabled: false,
 		reg: 'title',
 		placeholder: '请填写正确的公司或组织名称',
 		errorMsg: '请填写2-30个字符的公司或组织名称',
 		tipsMsg: '请填写公司或组织名称',
 		showErr: 0
 	},
 	site:{
 		label: '公司网站',
 		isRequired: false,
 		formType: 'input',
 		name: 'site',
 		value: '',
 		isDisabled: false,
 		reg: 'ignore',
 		placeholder: '',
 		errorMsg: '',
 		tipsMsg: '',
 		showErr: 0
 	},
 	production_url_0: {
 		label: '作品链接1',
 		isRequired: false,
 		formType: 'input',
 		name: 'production_url_0',
 		value: '',
 		isDisabled: false,
 		reg: 'ignore',
 		placeholder: '',
 		errorMsg: '',
 		tipsMsg: '',
 		showErr: 0
 	},
 	production_url_1: {
 		label: '作品链接2',
 		isRequired: false,
 		formType: 'input',
 		name: 'production_url_1',
 		value: '',
 		isDisabled: false,
 		reg: 'ignore',
 		placeholder: '',
 		errorMsg: '',
 		tipsMsg: '',
 		showErr: 0
 	},
 	production_url_2: {
 		label: '作品链接3',
 		isRequired: false,
 		formType: 'input',
 		name: 'production_url_2',
 		value: '',
 		isDisabled: false,
 		reg: 'ignore',
 		placeholder: '',
 		errorMsg: '',
 		tipsMsg: '',
 		showErr: 0
 	}
 };
export default formConfig;
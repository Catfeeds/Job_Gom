/**
 * [表单验证]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 *
 * @val 表单的value
 * @type  表单的验证规则
 * @ignoreNull  是否忽略空值，默认为false
 */
function validator(val, type, ignoreNull = false){
	let regs = {
	    num: /^[0-9]*$/,
		tel: /^1[345789]\d{9}$/,
		email:/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@[A-Za-z\d]+([-.][A-Za-z\d]+)*\.[A-Za-z\d]{2,5}$/,
		name: /^[^\s\d]{2,30}$/,
		summary: /^.{5,50}$/,
		summary5_50: /^.{5,50}$/,
		summary5_70: /^.{5,70}$/,
		title: /^.{2,30}$/,
		password: /^\S{6,20}$/,
		account: /^[\w\-]{6,20}$/,
		weixin: /^[a-zA-Z\d]{6,19}$/,
		ignore: /.*/,
		number: /^\d+$/,
		symbol: /^[^\da-zA-Z]+$/
	};

	let value = val.trim();

	if (ignoreNull && value === '') {
		return true;
	}

	return regs[type].test(value);
}


/**
 * [表单验证]
 * @Author: Fu Xiaochun
 * @Email:  fuzhengchun@gomeplus.com
 *
 * @val 表单的value
 * @type  表单的验证规则
 * @ignoreNull  是否忽略空值，默认为false
 */

function IdentityCodeValid(code) {
	code = code.toUpperCase();
	var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
	var pass= true;
	let reg = /^\d{6}(18|19|20)\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/;

	if(!code || !reg.test(code)){
		pass = false;
	}else if(!city[code.substr(0,2)]){
		pass = false;
	}else{
		code = code.split('');
		//∑(ai×Wi)(mod 11)
		//加权因子
		var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
		//校验位
		var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
		var sum = 0;
		var ai = 0;
		var wi = 0;
		for (var i = 0; i < 17; i++)
		{
			ai = code[i];
			wi = factor[i];
			sum += ai * wi;
		}
		var last = parity[sum % 11];
		if(parity[sum % 11] != code[17]){
			pass =false;
		}
	}
	return pass;
}

function validator(val, type, ignoreNull = false){
	let regs = {
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
		symbol: /^[^\da-zA-Z]+$/,
		identity: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([\d|x|X]{1})$/,
		uscc: /^[\da-zA-Z]{18}$/,
		notnull: /\S+/,
		smscode: /^\d{4}$/,
		str_2_8: /^\S{2,8}$/,
		str_2_20: /^\S{2,20}$/,
	};

	let value = val.trim();

	if (ignoreNull && value === '') {
		return true;
	}

	if(type === 'identity'){
		return IdentityCodeValid(val);
	}

	return regs[type].test(value);
}

export default validator;
/**
 * $GLOBAL_CONFIG
 * @author Zhengchun Fu
 */
var indexOf = require('lodash/indexOf');
var c = window.$GLOBAL_CONFIG || {};

var defaults = {
	main_domain: c.main_domain,
	passport_domain: c.passport_domain,
	order_domain: c.order_domain,
	group_domain: c.group_domain,
	i_domain: c.i_domain,
	mall_domain: c.mall_domain,
	js_domain: c.js_domain,
	jspath: c.pcjspath,
	csspath: c.pccsspath,
	imgpath: c.pcimgpath,
	wap_url: c.wap_url
};

var exclude = ['pcjspath', 'pccsspath', 'pcimgpath'];

for(var key in c){
	if(!defaults.hasOwnProperty[key] && indexOf(exclude, key) === -1){
		defaults[key] = c[key];
	}
}

module.exports = defaults;

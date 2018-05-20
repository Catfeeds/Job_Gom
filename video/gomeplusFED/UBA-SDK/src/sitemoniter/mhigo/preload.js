/* 定义stm v4 */
window["ClickiTrackerName"] = 'gomeClicki';
window.gomeClicki = window.gomeClicki || function() {
	(window.gomeClicki.queue = window.gomeClicki.queue || []).push(arguments);
};
window.gomeClicki.start = +new Date();
window.gomeClicki.debug = true;
window.gomeClicki.debugSendUrl = '//sm.gome.com.cn/collect/track_err';

/* 发送stm v4 pv */
window.gomeClicki('create', /pre|dev|test|atg|uat/.test(window.location.host) ? "dc-7" : "dc-2", "auto"
	/*, {
	    clientId: (function(a) {
	        var c, cookie = function(n) {
	            var v = document.cookie.match("(?:^|;)\\s*" + n + "=([^;]*)");
	            return v ? unescape(v[1]) : void 0;
	        }
	        while(a.length)
	            if (c = cookie(a.shift()))
	                return c;
	    }(['__clickidc', '__c_visitor']))
	} */
);
window.gomeClicki('set', (function() {
	var customer = {};
	// 设置与获取cmpid，30分钟内多次来源会拼接
	// customer.dimension1 = (function(){function k(a){var b=new Date,c=arguments;if(1<c.length){var d=c[2]||0,e=c[3]||"/",f=c[4]||0,g=c[5]||0;d&&b.setTime(b.getTime()+1E3*d);document.cookie=a+"="+escape(c[1])+(d?"; expires="+b.toGMTString():"")+("; path="+e)+(f?"; domain="+f:"")+(g?"; secure":"");return c[1]}return(b=document.cookie.match("(?:^|;)\\s*"+a+"=([^;]*)"))?unescape(b[1]):0}var a=k("cmpid"),b,c;a&&null!=a&&void 0!=a&&""!=a&&(b=a.split("^!"),c=b[b.length-1]);var d="";b=/(^|\?|&)cmpid=([^&]*)(&|$)/;b=location.href.replace(/#$/,
	// "").match(b);if(null!=b&&b[2]!=c)a&&null!=a&&void 0!=a&&""!=a&&(d=a+"^!"),d+=b[2];else if(null!=b||null==document.referrer||""==document.referrer||a&&null!=a&&void 0!=a&&""!=a)d=a&&null!=a&&void 0!=a&&""!=a?a:"direct";else{var a=document.referrer,d=!1,e,g;c=[];c=[["www.baidu.com","baidu"],["m.baidu.com","baidum"],["www.sogou.com","sogou"],["www.soso.com","soso"],["www.yahoo.","yahoo"],["www.google.com","google"],["www.haosou.com","360"],["m.haosou.com","360m"],["www.youdao.com","youdao"],[".bing.com",
	// "bing"],["m.sm.cn","sm"]];var h=/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/.exec(a)[0];c[0][0]==h&&(d=!0,e=c[0][1],b=/(^|\?|&)wd=([^&]*)(&|$)/,g=a.match(b)[2]);c[1][0]==h&&(d=!0,e=c[1][1],b=/(^|\?|&)word=([^&]*)(&|$)/,g=a.match(b)[2]);for(var f=2;4>f;f++)c[f][0]==h&&(d=!0,e=c[f][1],b=/(^|\?|&)query=([^&]*)(&|$)/,g=a.match(b)[2]);c[4][0]==h&&(d=!0,e=c[4][1],b=/(^|\?|&)p=([^&]*)(&|$)/,g=a.match(b)[2]);for(f=5;f<c.length;f++)-1!=h.indexOf(c[f][0])&&(d=!0,e=c[f][1],b=/(^|\?|&)q=([^&]*)(&|$)/,
	// g=a.match(b)[2]);d?d="seo_"+e+"_"+g:(e=a.split("/")[2],d="gome"!=e.split(".")[1]?"yj_"+e:"direct")}e=location.hostname.split(".");k("cmpid",d,1800,null,/^\d+$/.test(e.join(""))||3>e.length?location.hostname:e.slice(1).join("."));return d})();
	// 获取页面上一页路径
	if (document.referrer != "") customer.dimension3 = document.referrer;
	// 设置landingPage的utm参数
	// if(window.location.href.indexOf('cmpid=') > -1) {
	// var url = document.location.href;
	// var search = document.location.search;
	// var hostname = document.location.hostname;
	// var path = document.location.pathname;
	// var hash = document.location.hash;
	// var cmpid = search.replace(/^\?.*cmpid=([^&]*)(&.*)?$/i, "$1").split("_");
	// var utm = '';
	// customer.dimension12 = cmpid.join("_");
	// cmpid.length && (utm += '&utm_campaign=' + encodeURIComponent(cmpid.shift())) && cmpid.length && (utm += '&utm_source=' + encodeURIComponent(cmpid.shift())) && cmpid.length &&  (utm += '&utm_medium=' + encodeURIComponent(cmpid.shift())) && cmpid.length && (utm += '&utm_content=' + encodeURIComponent(cmpid.shift())) && cmpid.length && (utm += '&utm_term=' + encodeURIComponent(cmpid.join('_')));
	// customer.location = document.location.protocol + '//' + hostname + path + search + utm + hash;
	// }
	// if ("undefined" != typeof merchantId) customer.dimension14 = merchantId
	// else if("undefined" != typeof bbcShopId && bbcShopId != "") customer.dimension14 = bbcShopId;
	// if("undefined" != typeof goodsNo) customer.dimension9 = goodsNo;
	// if("undefined" != typeof skuId) customer.dimension13 = skuId;
	return customer;
})());
window.gomeClicki('send', 'pageview');

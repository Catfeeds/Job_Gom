// 用于同步v2与v4的cookie，并同时更新cookie的过期时间
function cookie(n) {
	var d = new Date(),
		a = arguments,
		l = a.length;
	if (l > 1) {
		var e = a[2] || 0,
			p = a[3] || '/',
			dm = a[4] || 0,
			se = a[5] || 0;
		if (e) d.setTime(d.getTime() + (e * 1000));
		document.cookie = n + "=" + escape(a[1]) + (e ? ("; expires=" + d.toGMTString()) : "") + ("; path=" + p) + (dm ? ("; domain=" + dm) : "") + (se ? "; secure" : "");
		return a[1];
	} else {
		var v = document.cookie.match('(?:^|;)\\s*' + n + '=([^;]*)');
		return v ? unescape(v[1]) : 0;
	}
}
var __clickidc = cookie("__clickidc"),
	__c_visitor = cookie("__c_visitor"),
	subs = document.domain.split("."),
	res = [];
for (var i = subs.length - 2; i >= 0; i--) {
	res.push(subs.slice(i).join("."));
}
for (var i = 0; i < res.length; i++) {
	!__c_visitor ? cookie("__c_visitor", __clickidc, 3600 * 24 * 365 * 10, "/", res[i]) : cookie("__c_visitor", __c_visitor, 3600 * 24 * 365 * 10, "/", res[i]);
	if (cookie("__clickidc") == cookie("__c_visitor"))		{ break; }
}

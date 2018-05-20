/*
 * bundle: 2017-03-30 10:45
 * (c) 2017 gomeBigData
 */
(function () {
// (c)2017, MIT Style License <browser-update.org/LICENSE.txt>
function $bu_getBrowser(ua_str) {
	var n,
	    t,
	    ua = ua_str || navigator.userAgent,
	    donotnotify = false;
	var names = {
		i: 'Internet Explorer',
		e: "Edge",
		f: 'Firefox',
		o: 'Opera',
		s: 'Safari',
		n: 'Netscape',
		c: "Chrome",
		a: "Android Browser",
		y: "Yandex Browser",
		v: "Vivaldi",
		x: "Other"
	};

	function ignore(reason, pattern) {
		if (RegExp(pattern, "i").test(ua)) return reason;
	}
	var ig = ignore("bot", "bot|spider|googlebot|facebook|slurp|bingbot|google web preview|mediapartnersadsbot|AOLBuild|Baiduspider|DuckDuckBot|Teoma") || ignore("discontinued browser", "camino|flot|k-meleon|fennec|galeon|chromeframe|coolnovo") || ignore("complicated device browser", "SMART-TV|SmartTV") || ignore("niche browser", "Dorado|Whale|SamsungBrowser|MIDP|wii|UCBrowser|Chromium|Puffin|Opera Mini|maxthon|maxton|dolfin|dolphin|seamonkey|opera mini|netfront|moblin|maemo|arora|kazehakase|epiphany|konqueror|rekonq|symbian|webos|PaleMoon|QupZilla|Otter|Midori|qutebrowser") || ignore("mobilew without upgrade path or landing page", "iphone|ipod|ipad|kindle|silk|blackberry|bb10|RIM|PlayBook|meego|nokia") || ignore("android(chrome) web view", "; wv");
	if (ig) {
		return {
			n: "x",
			v: 0,
			t: "other browser",
			donotnotify: ig
		};
	}
	var mobile = /iphone|ipod|ipad|android|mobile|phone|ios|iemobile/i.test(ua);
	var pats = [["Trident.*rv:VV", "i"], ["Trident.VV", "io"], ["MSIE.VV", "i"], ["Edge.VV", "e"], ["Vivaldi.VV", "v"], ["OPR.VV", "o"], ["YaBrowser.VV", "y"], ["Chrome.VV", "c"], ["Firefox.VV", "f"], ["Version.VV.{0,10}Safari", "s"], ["Safari.VV", "so"], ["Opera.*Version.VV", "o"], ["Opera.VV", "o"], ["Netscape.VV", "n"]];
	for (var i = 0; i < pats.length; i++) {
		if (ua.match(new RegExp(pats[i][0].replace("VV", "(\\d+\\.?\\d?)")), "i")) {
			n = pats[i][1];
			break;
		}
	}
	var v = parseFloat(RegExp.$1);
	if (!n) {
		return {
			n: "x",
			v: 0,
			t: names[n],
			mobile: mobile
		};
	}
	// check for android stock browser
	if (ua.indexOf('Android') > -1) {
		var ver = parseInt((/WebKit\/([0-9]+)/i.exec(ua) || 0)[1], 10) || 2000;
		if (ver <= 534) {
			return {
				n: "a",
				v: ver,
				t: names["a"],
				mob: true,
				donotnotify: donotnotify,
				mobile: mobile
			};
		}
		// else
		//    return {n:n,v:v,t:names[n]+" "+v,donotnotify:"mobile on android",mobile:mobile};
	}
	// do not notify old systems since there is no up-to-date browser available
	if (/windows.nt.5.0|windows.nt.4.0|windows.95|windows.98|os x 10.2|os x 10.3|os x 10.4|os x 10.5|os x 10.6|os x 10.7/.test(ua)) {
		donotnotify = "oldOS";
	}
	// do not notify firefox ESR
	if (n == "f" && (Math.round(v) == 45 || Math.round(v) == 52)) {
		donotnotify = "ESR";
	}
	if (n == "so") {
		v = 4.0;
		n = "s";
	}
	if (n == "i" && v == 7 && window.XDomainRequest) {
		v = 8;
	}
	if (n == "io") {
		n = "i";
		if (v > 6) v = 11;else if (v > 5) v = 10;else if (v > 4) v = 9;else if (v > 3.1) v = 8;else if (v > 3) v = 7;else v = 9;
	}
	if (n == "e") {
		return {
			n: "i",
			v: v,
			t: names[n] + " " + v,
			donotnotify: donotnotify,
			mobile: mobile
		};
	}
	return {
		n: n,
		v: v,
		t: names[n] + " " + v,
		donotnotify: donotnotify,
		mobile: mobile
	};
}
var res = $bu_getBrowser();
// console.log(res);
var version = res.v;
var vsmin = {
	i: 10, // MSIE
	c: 50, // Chrome
	f: 10, // Firefox
	o: 20, // Opera
	s: 7, // Safari
	n: 12 // Netscape
};
var vmin = vsmin[res.n];
// var vmin = 100;
if (vmin && version < vmin) {
	var elem = document.createElement('div');
	elem.id = 'broswer_check_mask';
	var baseurl = 'https://js-pre.meixincdn.com/m/UBA-SDK/src/other/browser/image/';
	elem.innerHTML = '<div id="browser_ie"><div class="brower_info"><div class="notice_info"><p>\u4F60\u7684\u6D4F\u89C8\u5668\u4E3A' + res.t + '\uFF0C\u7248\u672C\u8FC7\u4F4E\uFF01<br>\u8BF7\u5347\u7EA7\u6216\u66F4\u6362\u60A8\u7684\u6D4F\u89C8\u5668\u3002</p></div><div class="browser_list"><span><a href="http://www.chromeliulanqi.com/" target=_blank><img src="' + baseurl + 'chrome.png"><br>chrome </a></span><span><a href="http://www.firefox.com.cn/" target=_blank><img src="' + baseurl + 'firefox.png"><br>firefox </a></span><span><a href="http://www.apple.com/safari/" target=_blank><img src="' + baseurl + 'safari.png"><br>safari </a></span><span><a href="https://www.microsoft.com/zh-cn/download/internet-explorer.aspx" target=_blank><img src="' + baseurl + 'ie.png"><br>ie10\u53CA\u4EE5\u4E0A </a></span></div></div></div><style>#broswer_check_mask {position: fixed;top: 0;left: 0;height: 100%;width: 100%;z-index: 9999;background: rgba(255, 255, 255, 0.3);filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=\'#4cffffff\', endColorstr=\'#4cffffff\');}#browser_ie {background-color: #f6f6b4; display: block; height: 85px; color: #000; font-size: 15px;margin: 0;}#browser_ie .brower_info {margin: 0px auto; width: 800px; padding-top: 17px}#browser_ie .brower_info .notice_info {position: relative; margin-top: 5px; float: left}#browser_ie .brower_info .notice_info p {text-align: left; line-height: 25px;width: 360px;display: inline-block;margin: 0;}#browser_ie .browser_list {position: relative; float: left}#browser_ie .browser_list img {width: 40px; height: 40px}#browser_ie .browser_list span {text-align: center; width: 80px; display: inline-block}</style>';
	var loadWarning = function loadWarning() {
		setTimeout(function () {
			var body = document.body;
			if (body) {
				body.insertBefore(elem, body.firstChild);
			} else {
				loadWarning();
			}
		}, 100);
	};
	loadWarning();
}

}());

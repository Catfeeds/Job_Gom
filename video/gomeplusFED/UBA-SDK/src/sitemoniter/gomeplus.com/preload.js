/* create by quanyingying 2017-01-16 17:44 */
/* revised by lizhonging 2017-02-17 17:44 */
window["ClickiTrackerName"] = 'gomeClicki';
window.gomeClicki = window.gomeClicki || function() {
	(window.gomeClicki.queue = window.gomeClicki.queue || []).push(arguments);
};
window.gomeClicki.start = +new Date();
let url = document.location.href;
window.gomeClicki('create', url.search(/\.gomeplus\.com/) < 0 ? "dc-6" : (/dev|test|pre/.test(url) ? "dc-17" : "dc-16"), "auto");
let setinfo = {
	'dimension3': document.referrer
};
window.userId && (setinfo.dimension15 = window.userId);
window.gomeClicki('set', setinfo);
window.gomeClicki('send', 'pageview');

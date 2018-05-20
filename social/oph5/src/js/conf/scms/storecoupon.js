define('conf/scms/storecoupon.js', function (require) {
	require('$');
    require('utils/appInterface.js');
    require('mods/buried.js');
    var base64 = require('utils/base64.js');
    var Ajax = require('utils/ajax.js');
    var dropload = require('UI/dropload.js');
    var storage = require('mods/storage.js');
    var shareUrl = location.href,   
    coquetryUrl = encodeURIComponent(shareUrl);
	console.log('this is storecoupon_page.');
	//页面埋点js
    BP.send({event_id:'p000h024',url:coquetryUrl,name:'领券页',cook_id:'',user_id:''});
});

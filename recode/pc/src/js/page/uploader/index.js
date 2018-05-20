/*
//判断设备分辨率
function DprLayout (){
	var dpr, rem, scale;
	var docEl = document.documentElement;
	dpr = window.devicePixelRatio || 1;
	rem = docEl.clientWidth * dpr / 10;
	scale = 1 / dpr;
	docEl.setAttribute('data-dpr', dpr);
	window.rem2px = function(v) {
	    v = parseFloat(v);
	    return v * rem;
	};
	window.px2rem = function(v) {
	    v = parseFloat(v);
	    return v / rem;
	};
	window.dpr = dpr;
	window.rem = rem;
}
*/

/*
var bordT = $('img').outerWidth() - $('img').innerWidth();
var paddT = $('img').innerWidth() - $('img').width();
var margT = $('img').outerWidth(true) - $('img').outerWidth();
*/
window.TimeStatus = 0;
window.StatusOnoff = false;
window.upNumber = parseInt(maxNum);
window.limitNumber = parseInt(maxNum) - window.upNumber;

var flexible = require('./flexible');
var flexibleCss = require('./flexible_css');
var cubeList = require('./cubeList');
var upload = require('./upload');
var status = require('./status');

var $boxTopic = $('.box-topic');
var $boxMain = $('.box-main');
var $listCube = $('.main-list-cube')||null;
var $touchInput = $('.touch-input-icon')||null;
var $touchBtn = $('.touch-btn-icon')||null;

flexible.init(window, window['lib'] || (window['lib'] = {}));
flexible.page();
// $boxMain.height((document.body.scrollHeight||document.body.clientHeight) - $boxTopic.height() - ($boxMain.innerHeight() - $boxMain.height()));

// cubeList.addList($touchInput, $touchBtn);
if($listCube)cubeList.init($listCube);

upload.init.initNum();

status.init.getPCStatus();
window.TimeStatus = setInterval( function(){
	status.init.getPCStatus();
	// status.init.getMaxNums();
}, 2000);

// $(window).onload(function(){
// 	$.getscript("http://10.69.5.162:8080/target/target-script-min.js#anonymous")
// });


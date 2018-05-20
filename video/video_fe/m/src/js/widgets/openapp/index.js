/**
 *
 Created by sunguang on 2017/5/10.
 Email: sunguang@gomeplus.com
 */

import 'css/widgets/openApp.scss';
import '../../plugin/jquery.cookie.js';

///gome\.com

//检测cookie
function checkCookie() {
    var user = $.cookie("gome-meimiao-openapp");
    if (user != "" && user != undefined) {
        closeapp();
    } else {
        closeapp("open");
    }
}

function closeapp(status) {
    if (status == "open") {
        $("#openapp").show();
        $(".head-bar").css({
            top: "1.1rem"
        });
        $("body").css({
            "padding-top": "1.98rem!important"
        });
    } else {
        $("#openapp").hide();
        $(".head-bar").css({
            top: "0"
        });
        $("body").css({
            "padding-top": "0.88rem!important"
        });
    }
}

checkCookie();

//如果是app里隐藏呼起功能跟头部
if(navigator.userAgent.toLowerCase().indexOf('gome') > -1){
    $("#openapp").hide();
    $(".head-bar").hide();
    $("body").css({
        "padding-top": "0!important"
    });
}

$('[data-id=close]').click(() => {
    closeapp();
    $.cookie("gome-meimiao-openapp", "open", { expires: 1/12 });
});

function getDownLoadUrl(){
    var wxUrl = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.gome.eshopnew&g_f=991653';
    var androidUrl = 'http://shouji.gome.com.cn/kd/A274.html';
    var iosUrl = 'https://itunes.apple.com/cn/app/id486744917?mt=8';
//  var androidUrl = 'https://js.meixincdn.com/gvs-player/app/meimiao/com.gomeplus.v.meimiao_v1.0.1.apk';
//  var iosUrl = 'https://itunes.apple.com/cn/app/%E7%BE%8E%E7%A7%92/id1232548052?mt=8';
    var ua = navigator.userAgent.toLowerCase();
    if((ua.indexOf('mac') == -1) && (ua.indexOf('micromessenger') > -1)){
        return wxUrl;
    }
    if (ua.indexOf('mac') == -1) {
        return androidUrl;
    }
    return iosUrl;
}

var config = {
    scheme_Adr: document.getElementById('J-download-app').value,
    download_url: getDownLoadUrl(),
    timeout: 2000
};

var ifr;

function openclient(e) {
	// e.preventDefault();

    var startTime = Date.now();
    if(!ifr){
    	ifr = document.createElement('iframe');
    	ifr.style.display = 'none';
    	document.body.appendChild(ifr);
    }
    ifr.src = config.scheme_Adr;
    
    var t = setTimeout(function() {
        var endTime = Date.now();
        if (!startTime || endTime - startTime < config.timeout + 200) {
            window.location = config.download_url;
        }
    }, config.timeout);

    window.onblur = function() {
        clearTimeout(t);
    }
}

var openApp = function(openUrl, callback){
    var doc = document;
    var body = doc.body;

    function checkOpen(cb){
        var start = Date.now();
        var count = 0;
        var timer;

        var check = function(ms){
            if(ms > 3000 || document.hidden || document.webkitHidden){
                cb(1);
            } else {
                cb(0);
            }
        };

        timer = setInterval(function(){
            count++;
            var end = Date.now() - start;
            if(count >= 100 || end > 3000){
                clearInterval(timer);
                check(end);
            }
        }, 20);
    }

    var iframe = doc.createElement('iframe');
    iframe.src = openUrl;
    iframe.style.display = 'none';
    
    checkOpen(function(opend){
        callback && callback(opend);
    });
    
    body.appendChild(iframe);

    setTimeout(function(){
        body.removeChild(iframe);
    }, 2000);
}

window.addEventListener("DOMContentLoaded", function(e) {
    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf('android') > -1;
    var isWX = ua.indexOf('micromessenger') > -1;
    // TODO: 如果在微信打开,跳转到应用宝页面
//	if(!isWX){
        var canOpen = true;
        document.getElementById("J-call-app").addEventListener('click', function(){
            if(isAndroid){
                if(canOpen){
                    canOpen = false;
                    openApp(config.scheme_Adr, function(opend){
                        if(!opend){
                            window.location = config.download_url;
                        }
                        // 防止android上连续点击
                        setTimeout(function(){
                            canOpen = true;
                        }, 3000);
                    });
                }
            } else {
                openclient(e);
            }
        }, false);
//  }
}, false);


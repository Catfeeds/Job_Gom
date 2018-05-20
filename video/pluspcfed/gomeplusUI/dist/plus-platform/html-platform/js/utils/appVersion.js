/**
 * Created by lishengyong on 2016/12/8.
 */

(function appVersion() {

    window.platform = {};
    var ua = window.navigator.userAgent.toLowerCase();
    var isIphone = ua.match(/iphone os/i) == 'iphone os';
    var isAndroid = ua.match(/android/i) == 'android';
    // ipad 也为mobile
    var isMobile = ua.match(/mobile/i) == 'mobile';
    var isIpad = ua.match(/ipad/) == 'ipad';

    platform.isMobile = function () {
        return isMobile && !isIpad;
    }

})()


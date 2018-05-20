/**
 * Created by tianguangyu on 2016/9/1.
 */
define('conf/staff/login.js', function (require) {
    var $ = require('$');
    var base64 = require('utils/base64.js');

    //登陆
    $('#login').click(function(){
        window.location.href = window.loginUrl+'?redirect='+base64.encode(window.LoginSendUrl)+'&h5=1';
    });

    //注册
    $('#register').click(function(){
        window.location.href = window.registerUrl+'?redirect='+base64.encode(window.LoginSendUrl)+'&h5=1';
    });

});
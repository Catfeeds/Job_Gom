var fetch = require('io/fetch');
var urlLib = require('io/url');
var alert = require('module/popup/alert');

exports.init = function (){
    var referralCode = $('.talent.clearfix').attr('data-referralcode');
    $('.qr-code-img img').attr('src', '/expert/logocode?referralCode=' + referralCode);
}
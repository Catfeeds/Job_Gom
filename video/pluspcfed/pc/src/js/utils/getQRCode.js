// 根据字符串生成二维码
var getQRCode = function(url) {
    return $_CONFIG.group_domain + 'ajax/qrcode/urlcode?url=' + encodeURIComponent(url);
};

module.exports = getQRCode;

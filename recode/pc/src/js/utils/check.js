/**
 * Created by dongyukuan on 2016/5/20.
 */
var obj = {
    checkVal: function(val, pattern) {
        return pattern.test(val);
    },
    isMobileNum: function(mobile) {
        return /^1[34578][0-9]{9}$/.test(mobile);
    },
    isEmail: function(email) {
        return /w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*/.test(email);
    },
    isCertificate: function(certificate) {
        return /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(certificate);
    },
    isCID: function(cardNo) {
        return /^(\d{16}|\d{19})$/.test(cardNo);
    },
    isCWord: function(word, start, end) {
        start = !isNaN(start) && start > 0 ? start : 1;
        end = !isNaN(end) && end > 0 ? end : '';
        var reg = new RegExp('^[\\u4e00-\\u9fa5]{' + start + ',' + end + '}$');
        //var regPunctuation = /[1-9<>《》！\*\(\^\)\$%~!@#\…&%￥—\+=、。，；‘’“”：'"\·`]/;
        // var regRes = reg.test(word);
        //var pugRes = regPunctuation.test(word);
        return reg.test(word);
    },
    isArray: function(arr) {
        return Array.isArray(arr) || (arr instanceof Array);
    },
    passwordReg: function(val) {
        var reg = /^((?=.*?\d)(?=.*?[A-Za-z])|(?=.*?\d)(?=.*?[<>《》！\*\(\^\)\$%~!@#\…&%￥—\+=、。，\"\,\:\;；,\.‘’“”：'"\·`【】])|(?=.*?[A-Za-z])(?=.*?[<>《》！\*\(\^\)\$%~!@#\…&%￥—\+=、。，；‘’“”：'"\·`,\.【】]))[\dA-Za-z<>《》！\*\(\^\)\$%~!@#\…&%￥—\+=、。，；‘’“”：'"\·`,\.【】]{6,21}$/;
        return reg.test(val);
    },
    checkSpace: function(val) {
        var reg = /\s+/;
        return reg.test(val);
    },
    checkRefCode: function(refCode) {
        var reg = /^[0-9a-zA-Z]{8}$/;
        return reg.test(refCode);
    },
    checkNickName: function(name) {
        var nickNameReg = /^([\u4e00-\u9fa5]|[0-9a-zA-Z_-])+$/;
        return nickNameReg.test(name);
    },
    isMsgCode: function(num) {
        var reg = /^\d{6}$/;
        return reg.test(num);
    },
    isImgCode: function(str) {
        var reg = /^[0-9a-zA-Z]{4}$/;
        return reg.test(str);
    }
};
module.exports = obj;
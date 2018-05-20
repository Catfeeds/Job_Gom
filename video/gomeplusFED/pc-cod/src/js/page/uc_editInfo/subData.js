var fetch = require('io/fetch');
var url = require('io/url');
var nameTips = require('module/i18n').nickName;
var trim = require('utils/trim');

var verifyName = require('./verifyName');

var editBox = $('[data-node=editBox]').eq(0);
var nickname = editBox.find('[data-node=nickname]');
var sexBox = editBox.find('[data-node=sexBox]');
var birthday = editBox.find('[data-node=showDate]');
var subDate = editBox.find('[data-action=subDate]');
var comTip = editBox.find('[data-node=comErrTip]');
var nameBorErr = editBox.find('[data-node=nameBorErr]');
var faceImg = editBox.find('[data-node=faceImg]');
var birthTip = editBox.find('[data-node=birTip]');

var header = $('[data-node=header]');
var headImg = header.find('[data-node=headImg]');
var headName = header.find('[data-node=headName]');

var birthPre = birthday.attr('data-default');

var dateReg = /^\d{4}-\d{1,2}-\d{1,2}$/;
var hideCls = 'hide';
var errBorCls = 'nicknerror';
var sub = function() {
    comTip.addClass(hideCls);
    var nameVal = nickname.val();
    var sexVal = sexBox.find('input:checked').val();
    var birthVal = birthday.val();
    birthVal = birthPre || (dateReg.test(birthVal) ? birthVal : '');
    var faceImgUrl = faceImg.attr('src');
    var nameFlag = verifyName.checkNameRule();
    var errFlag = !nameBorErr.hasClass(errBorCls);
    if (nameFlag && errFlag) {
        // verifyName.checkExist().then(function(data) {
        // if (data.success) {
        var subData = {
            "facePicUrl": faceImgUrl,
            "birthday": birthVal,
            "nickname": nameVal,
            "gender": sexVal
        };
        fetch.post(url.get('subName'), {
            data: subData
        }).done(function(data) {
            if (data.success) {
                comTip.removeClass(hideCls).text(nameTips.sucSub);
                headImg.attr('src', faceImgUrl);
                headName.text(nameVal);
                var birFlag = dateReg.test(birthVal);
                if (birFlag && !birthPre) {
                    birthday.attr('data-default', birthVal);
                    birthTip.addClass(hideCls);
                }
            } else {
                comTip.removeClass(hideCls).text(data.message);
            }
        }).fail(function() {
            comTip.removeClass(hideCls).text(nameTips.errLine);
        });
    }
    // });
    // }
};
var subEvent = function() {
    subDate.on('click', sub);
};
module.exports = {
    subInit: subEvent
};
var byteLen = require('utils/byteLen');

var chooseCategory = require('../chooseCategory');
var upload = require('../photoUpload');

var $form = $('[data-node=form]');
var $categoryList = $form.find('[data-node=categoryList]');
var $categoryTxt = $form.find('[data-node=categoryTxt]');

var $liName = $form.find('[data-node=liName]');
var $inputName = $liName.find('[data-node=inputName]');
var $markerName = $liName.find('[data-node=markerName]');

var $liId = $form.find('[data-node=liId]');
var $inputId = $liId.find('[data-node=inputId]');
var $markerId = $liId.find('[data-node=markerId]');

var $liSummary = $form.find('[data-node=liSummary]');
var $inputSummary = $liSummary.find('[data-node=inputSummary]');
var $numSummary = $liSummary.find('[data-node=numSummary]');

if ($_CONFIG.applyFlag === 1) {
    var backfillData = $_CONFIG.expertInfo;
    // backfillData = {
    //        "auditFailReason": "123",
    //        "auditOperator": "admin",
    //        "auditStatus": 1,//data不为空，且auditStatus=1时，即为达人
    //        "auditTime": 1469419814000,
    //        "category": {
    //            "id": 36,
    //            "name": "无节操"
    //        },
    //        "createTime": 1469080394000,
    //        "expertType": "normal",
    //        "idCardNo": "131155188602486244",
    //        "idcardBackImageUrl": "https://i-pre.meixincdn.com/v1/img/T1At_TBT_T1RXrhCrK.jpg",
    //        "idcardFrontImageUrl": "https://i-pre.meixincdn.com/v1/img/T1YzxTBgLT1RXrhCrK.jpg",
    //        "idcardPersonImageUrl": "https://i-pre.meixincdn.com/v1/img/T1ZzxTBTdT1RXrhCrK.jpg",
    //        "introduction": "dawdwadwadawdw个人介绍",
    //        "isExpert": true,
    //        "realName": "杨艳艳",
    //        "userId": 767
    //    }
    chooseCategory.getChooseData(function() {
        var listOptions = $categoryList.children('a');
        $(listOptions).each(function() {
            if (backfillData.category.id == $(this).attr('data-id')) {
                return $categoryTxt.attr('data-id', $(this).attr('data-id')).html($(this).html());
            }
        });
    });
    $inputName.val(backfillData.realName);
    $markerName.removeClass('hide');
    $inputId.val(backfillData.idCardNo);
    $markerId.removeClass('hide');
    $inputSummary.val(backfillData.introduction);
    $numSummary.html(byteLen($inputSummary.val()));
    var imgs = [backfillData.idcardFrontImageUrl, backfillData.idcardBackImageUrl, backfillData.idcardPersonImageUrl];
    var time = 0;
    upload.callback(function() {
        var t = setInterval(function() {
            time++;
            var $pick = $form.find('.webuploader-pick');
            if ($pick.length === 3) {
                clearInterval(t);
                var $uploader = $form.find('[data-node=uploader]');
                $uploader.each(function(i) {
                    var ruid = $(this.childNodes[1]).attr('id').substring(3);
                    $(this.childNodes[0]).html('<img data-node="uploaderImg" src="' + imgs[i] + '" alt=""><a href="javascript:;" class="modify-mask"><span class="mask-txt" data-node="change" data-ruid="' + ruid + '">更换照片 </span></a>');
                });
            } else if (time === 50) {
                clearInterval(t);
            }
        }, 100);
    });
}
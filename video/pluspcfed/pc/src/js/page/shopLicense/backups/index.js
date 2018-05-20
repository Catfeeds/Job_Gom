var fetch = require('io/fetch'),
    url = require('io/url'),
    moduleTrim = require("utils/trim"),
    truncate = require('utils/truncate'),
    praise = require('module/praise'),
    shareto = require('module/share').shareto,
    shopCollect = require('module/shopCollect');
require('textchange');

var $Form = $('[data-node=Form]');
var $codeBtn = $Form.find('[data-node=codeBtn]'),
    $codeImg = $Form.find('[data-node=codeImg]'),
    $codeInput = $Form.find('[data-node=codeInput]'),
    $codeVilid = $Form.find('[data-node=codeVilid]'),
    $codeTip = $Form.find('[data-node=codeVilid] .red'),
    $submitBtn = $Form.find('[data-node=submitBtn]'),
    $shopTop = $('[data-node="shopTop"]'),
    $love = $shopTop.find('[data-action="love"]'), //点赞
    $loveNum = $love.find('[data-node="loveNum"]'), //点赞数量
    $collect = $shopTop.find('[data-action="collect"]'), //收藏
    $collectNum = $collect.find('[data-node="collectNum"]'),
    Timeliness = true; //控制数据提交按钮点击频率

module.exports = $(function() {
    var loveNum = ~~$loveNum.text();
    var tipshow = function(msg) {
        $codeTip.html(msg);
        $codeVilid.removeClass('hide');
    }

    var codeInput = function() {
        $codeVilid.addClass('hide');
        if (moduleTrim($codeInput.val()).length > 4) {
            $codeInput.val(truncate($codeInput.val(), 4));
        }
    }

    var submit = function() {
        if (Timeliness == false) {
            return;
        }
        Timeliness = false;
        setTimeout(function() {
            Timeliness = true;
        }, 3000);
        var value = moduleTrim($codeInput.val());
        // if( value.length == 0  ){
        // 	tipshow('验证码不能为空');
        // }
        fetch.get(url.get('shopCodeCheck'), {
            data: {
                shopId: $_CONFIG.shopId,
                code: value
            }
        }, {
            async: false
        }).done(function(data /*, textStatus, jqXHR*/ ) {
            if (data.success) {
                location.href = $_CONFIG.mall_domain + 'shop/show?shopId=' + $_CONFIG.shopId + '&code=' + value;
            } else {
                tipshow(data.msg);
            }
        }).fail(function() {
            alert("数据请求失败 请稍后尝试");
        });
    }
    var codeChange = function() {
        $codeVilid.addClass('hide');
        fetch.get(url.get('getCodeOfBusiness'), {
            async: false
        }).done(function(data) {
            if (data.success) {
                $codeImg.attr('src', 'data:image/gif;base64,' + data.data);
            } else {
                alert("数据请求失败 请稍后尝试");
            }
        }).fail(function() {
            alert("数据请求失败 请稍后尝试");
        });
    };
    if ($_CONFIG.type == '9') {
        codeChange();
    }

    (function() {
        //点赞
        praise('[data-node="shopTop"]', '[data-action="love"]', {
            onPraise: function() {
                loveNum++;
                $loveNum.text(loveNum);
            },
            onUnPraise: function() {
                loveNum--;
                $loveNum.text(loveNum);
            },
            onPraised: function() {
                $love.find('em').addClass('active');
                $loveNum.text(loveNum);
            }
        });
        //收藏 店铺
        shopCollect({
            selector: '[data-action="collect"]',
            parent: '[data-node="shopTop"]'
        }, function(isAdd) {
            isAdd ? $collectNum.text(~~$collectNum.text() + 1).prev().addClass('active') : $collectNum.text(~~$collectNum.text() - 1).prev().removeClass('active');
        });
        //分享
        var shareTimer = null,
            $shareBtnBox = $('[data-node="shareBtnBox"]'),
            shareInfo = {},
            pcUrl = '';
        var shareTitle = '';
        $('[data-node="shopTop"]').on('mouseenter', '[data-action="shareto"]', function() {
                pcUrl = $(this).data('surl');
                if ($.isEmptyObject(shareInfo)) {
                    shareInfo = {
                        url: $(this).data('surl'),
                        title: $(this).data('stitle'),
                        pic: $(this).data('spic') === '' ? $_CONFIG.imgpath + '/images/public/logo.png' : $(this).data('spic')
                    };
                    shareTitle = $(this).data('stitle');
                }
                $shareBtnBox.css({
                    top: $(this).offset().top + 30,
                    left: $(this).offset().left - ~~$('[data-node="shareBtnBox"]').width() / 2 + ~~$(this).width() / 2
                }).show();
                // 发送统计数据
                BP.send({
                    event_id: 'B000P019',
                    shop_id: $_CONFIG.shopId
                })
            })
            .on('mouseleave', '[data-action="shareto"]', function() {
                shareTimer = setTimeout(function() {
                    $shareBtnBox.hide();
                }, 100)
            });
        $shareBtnBox.on('mouseenter', function() {
                clearTimeout(shareTimer);
            })
            .on('mouseleave', function() {
                $(this).hide();
            });
        //验证图片是否为图片类型以及是否为默认图片
        var headPic = $shopTop.find('img').attr('src');
        var isDefault = function(src) {
            if (src == 'https://i-pre.meixincdn.com/v1/img/T1gyVTBmLT1R4cSCrK.png' || src == 'https://i6.meixincdn.com/v1/img/T1YFxTByJT1R4cSCrK.png' || src == 'https://i-pre.meixincdn.com/v1/img/T1TaVTB7LT1R4cSCrK.png') {
                return false;
            }
            return true;
        };
        var isPic = function(src) {
            var reg = /\w+\.(jpg|gif|bmp|png)$/;
            if (isDefault(src)) {
                return reg.test(src);
            } else {
                return false;
            }
        };
        // shop_id，channel_id（out-weixin,out-QQ,out-xlwb，out-Qqzone）
        $shareBtnBox.on('click', '[data-shareto="weixin"]', function() {
            shareInfo.url = $_CONFIG.weixin_share;
            shareInfo.title = shareTitle;
            shareto.weixin(shareInfo);
            window.analytic('out-weixin');
        }).on('click', '[data-shareto="qq"]', function() {
            shareInfo.url = pcUrl;
            shareInfo.title = shareTitle;
            shareInfo.summary = '我发现了前所未有的好店，不如，你也来逛逛？';
            shareInfo.pic = isPic(headPic) ? headPic : $_CONFIG.imgpath + '/images/public/logo.jpg';
            shareto.qq(shareInfo);
            window.analytic('out-QQ');
        }).on('click', '[data-shareto="sina"]', function() {
            shareInfo.url = pcUrl;
            shareInfo.title = shareTitle + ',这是我费尽千辛万苦找到的超级好店。';
            shareInfo.pic = isPic(headPic) ? headPic : $_CONFIG.imgpath + '/images/public/logo.jpg';
            shareto.sina(shareInfo);
            window.analytic('out-xlwb');
        }).on('click', '[data-shareto="qzone"]', function() {
            shareInfo.url = pcUrl;
            shareInfo.title = shareTitle;
            shareInfo.summary = '这是我费尽千辛万苦找到的超级好店。';
            shareInfo.pic = isPic(headPic) ? headPic : $_CONFIG.imgpath + '/images/public/logo.jpg';
            shareto.qzone(shareInfo);
            window.analytic('out-Qqzone');
        });
        //bindEvent
        $codeInput.on('textchange', codeInput);
        $submitBtn.on('click', submit);
        $codeBtn.on('click', function() {
            $codeInput.val('');
            codeChange();
        })
    })();
})
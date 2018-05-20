var fetch = require('io/fetch');

var $iframe = $('[data-node="infoIframe"]');
var iframe = null;
var iframeBody = null;
var $iframeBody = null;

var cur = 0;
var oImage = new Image();
var timer = null;
var sum = 0;
var iframeHeight = 0;
var setHeight = 0;
var truethSrc = '';
var imgLoad = function(images) {

    truethSrc = images.eq(cur).attr('gome-src') !== undefined ? images.eq(cur).attr('gome-src') : images.eq(cur).attr('src');
    oImage.onload = function() {
        if (cur <= images.length) {
            imgLoad(images); //递归
            images.eq(cur).attr('src', truethSrc);
            iframeHeight = $iframe.height();
            setHeight = Math.max(iframeBody.offsetHeight, oImage.height);

            iframe.height = setHeight;
            if (cur === images.length) {
                timer = setInterval(function() {
                    setHeight = iframeBody.offsetHeight;
                    iframe.height = setHeight;
                    if (iframeHeight === setHeight) {
                        sum++;
                        if (sum > 30) {
                            clearInterval(timer);
                        }
                    }
                }, 300);
            }
        }
        cur++;
    }
    oImage.onerror = function() {
        if (cur <= images.length) {
            imgLoad(images); //递归
            images.eq(cur).css('width', '750px').attr('src', $_CONFIG.imgpath + '/images/public/img-error.png');
            iframeHeight = $iframe.height();
            setHeight = Math.max(iframeBody.offsetHeight, oImage.height);
            iframe.height = setHeight;
            if (cur === images.length) {
                timer = setInterval(function() {
                    setHeight = iframeBody.offsetHeight;
                    iframe.height = setHeight;
                    if (iframeHeight === setHeight) {
                        sum++;
                        if (sum > 30) {
                            clearInterval(timer);
                        }
                    }
                }, 300);
            }
        }
        cur++;

    }
    oImage.src = truethSrc;

}
var init = function() {
    if ($_CONFIG.prodType !== '1') { // 1:xpop商品,2/3:在线自营,联营商品,4:o2m商品
        iframe = $iframe[0];
        iframeBody = iframe.contentWindow.document.body;
        $iframeBody = $(iframeBody);
        var url = $_CONFIG.detailUrl;

        if (url === '') {
            $iframeBody.html('<div style="font-family: PingFang SC,Myriad Pro,Hiragino Sans GB,Microsoft YaHei,sans-serif;height: 600px;line-height: 600px;color: #999;text-align: center;font-size:14px;">此商品暂无图文详情</div>');

            iframe.height = iframeBody.offsetHeight;
            return;
        }
        fetch.get(url, {
            dataType: "jsonp",
            jsonp: "jianjie", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
            jsonpCallback: "jianjie" //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        }).done(function(data) {
            if (data !== '') {
                $iframeBody.html(data);
                imgLoad($iframeBody.find('img'));
            } else {
                $iframeBody.html('<div style="font-family: PingFang SC,Myriad Pro,Hiragino Sans GB,Microsoft YaHei,sans-serif;height: 600px;line-height: 600px;color: #999;text-align: center;font-size:14px;">此商品暂无图文详情</div>');

                iframe.height = iframeBody.offsetHeight;
            }
        }).fail(function() {
            $iframeBody.html('<div style="font-family: PingFang SC,Myriad Pro,Hiragino Sans GB,Microsoft YaHei,sans-serif;height: 600px;line-height: 600px;color: #999;text-align: center;font-size:14px;">此商品暂无图文详情</div>');
            iframe.height = iframeBody.offsetHeight;
        });
    }
}

module.exports = {
    init: init
}
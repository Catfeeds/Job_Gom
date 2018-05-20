define('conf/warmcup/warmcup.js', function (require) {
    require('$');
    require('utils/appInterface.js');
    require('mods/buried.js');
    var base64 = require('utils/base64.js');
    var Ajax = require('utils/ajax.js');
    var dropload = require('UI/dropload.js');
    var storage = require('mods/storage.js');
    var shareUrl = location.href,
    appUrl = shareUrl.replace('m','h5'),
    coquetryUrl = encodeURIComponent(shareUrl),
    oTitle = '冷暖相依 优享生活',
    oDesc = '让你感受到相依的温暖，品尝到秋季的味道，更多惊喜齐聚国美Plus！',
    imgPre =  cssPre.replace('https','http'),
    oImgUrl = imgPre+'/images/module/warmcup/share.jpg';
    console.log(oImgUrl)
    //weixin
	wx.ready(function () {
	    wx.hideAllNonBaseMenuItem();//隐藏所以的按钮
	    wx.showMenuItems({         //显示需要的按钮
	        menuList: ['menuItem:share:timeline','menuItem:share:appMessage','menuItem:favorite','menuItem:openWithSafari'] // 要显示的菜单项，所有menu项见附录3
	    });
	    wx.onMenuShareTimeline({     //分享到朋友圈
	        title: oTitle, // 分享标题
	        link: shareUrl, // 分享链接
	        desc: oDesc, //分享描述
	        imgUrl: oImgUrl, // 分享图标
	        success: function () {
	            //alert('成功分享到朋友圈');
	        },
	        cancel: function () {
	            //alert('取消分享朋友圈');
	        }
	    });
	    wx.onMenuShareAppMessage({   //分享给朋友
	        title:oTitle, // 分享标题
	        desc:oDesc, // 分享描述
	        link:shareUrl, // 分享链接
	        imgUrl:oImgUrl, // 分享图标
	        type: '', // 分享类型,music、video或link，不填默认为link
	        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
	        success: function () {
	            //alert('成功分享到朋友');
	        },
	        cancel: function () {
	            //alert('取消分享给朋友');
	        }
	    });
	    wx.onMenuShareQQ({
	        title: oTitle, // 分享标题
	        desc: oDesc, // 分享描述
	        link: shareUrl, // 分享链接
	        imgUrl: oImgUrl, // 分享图标
	        success: function () {
	            //alert('成功分享到QQ');
	        },
	        cancel: function () {
	            //alert('取消分享到QQ');
	        }
	    });
    });
    //页面埋点js
    BP.send({event_id:'PA0903W01',url:coquetryUrl,name:'活动页面',cook_id:'',user_id:''});

    // 点击跳转
    $('body').on('click', '.warmcup-sec a',function(){
        var oHref = $(this).attr('producturl');
        getParams(oHref)
        var productid = params.productId;
        var shopid = params.shopId;
        // 页面埋点
         BP.send({
            event_id:'GP0903W01',
            url:coquetryUrl,
            name:'活动商品位',
            user_id:'',
            cookid:'',
            shop_id:base64.encode(shopid),
            produce_id:base64.encode(productid)
        });
        location.href = oHref;
    });

    $('body').on('click', '.moreA',function(){
        var actAppurl = $(this).attr('activateurl');
        var actShareurl = actAppurl.replace('h5','m');
         BP.send({
            event_id:'BA0903W01',
            url:coquetryUrl,
            name:'活动商品位',
            cookid: '',
            user_id: ''
        });
        location.href = actAppurl;
      
    });
    
    getParams = function (url){
        params = {};
        if(!url){
            var search = location.search.substr(1);
            if(search){
                var key_values = search.split('&');
                if(key_values && key_values.length > 0){
                    for(var i=0;i<key_values.length;i++){
                        var key = key_values[i].split('=')[0];
                        var val = key_values[i].split('=')[1];
                        params[key] = val;
                    }
                }
            }
        }else{
            var search1 = url.substr(url.indexOf('?')+1);
            if(search1){
                var key_values1 = search1.split('&');
                if(key_values1 && key_values1.length > 0){
                    for(var i=0;i<key_values1.length;i++){
                        var key = key_values1[i].split('=')[0];
                        var val = parseInt(key_values1[i].split('=')[1]);
                        params[key] = val;
                    }
                }
            }
        }
        return params;
    };

});  

  
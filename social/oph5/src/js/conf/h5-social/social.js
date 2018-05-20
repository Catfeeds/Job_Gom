define('conf/h5-social/social.js',function (require,exports,module) {
    require('$');
    var common = require('mods/common');
    var storage = require('mods/storage');
    var share = require('mods/share.js');
    var base64 = require('utils/base64');
    var dropload = require('UI/dropload.js');
    var Swiper = require('UI/swiper.min');
    var H5Host = location.href.match(/^(http[s]?:\/\/(?:[^\/]*))\/.*$/)[1];
	//分享到微信;
    wx.ready(function () {
        wx.hideAllNonBaseMenuItem();//隐藏所以的按钮
        wx.showMenuItems({         //显示需要的按钮
            menuList: ['menuItem:share:timeline','menuItem:share:appMessage','menuItem:favorite','menuItem:openWithSafari'] // 要显示的菜单项，所有menu项见附录3
        });
        wx.onMenuShareTimeline({     //分享到朋友圈
            title: shareTitle, // 分享标题
            link: shareOpWapUrl, // 分享链接
            desc: shareDesc, //分享描述
            imgUrl: shareImg, // 分享图标
            success: function () {
                //alert('成功分享到朋友圈');
            },
            cancel: function () {
                //alert('取消分享朋友圈');
            }
        });
        wx.onMenuShareAppMessage({   //分享给朋友
            title: shareTitle, // 分享标题
            link: shareOpWapUrl, // 分享链接
            desc: shareDesc, //分享描述
            imgUrl: shareImg, // 分享图标
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
            title: shareTitle, // 分享标题
            link: shareOpWapUrl, // 分享链接
            desc: shareDesc, //分享描述
            imgUrl: shareImg, // 分享图标
            success: function () {
                //alert('成功分享到QQ');
            },
            cancel: function () {
                //alert('取消分享到QQ');
            }
        });
    });
	 function goTo(str){
	 	str.click(function(){
	 		var itdata = $(this).attr('datatype');
		 	var ltdataid = $(this).attr('dataid');
		 	console.log(itdata,ltdataid)
		 	jump(itdata,ltdataid);
	 	})
	 }
	 goTo($('.banner a'))
	 goTo($('.middle1 .left'));
	 goTo($('.middle1 .in'));
	 goTo($('.middle2 .m2left'));
	 goTo($('.middle2 .m2right'));
	 // goTo($('.m2left .wz'));
	 goTo($('.middle3 .m3-1'));
	 goTo($('.middle4 .m4-1'));
	 goTo($('.middle5 .m5-1'));
	 goTo($('.middle6 .m6-top'));
	 goTo($('.swiper-slide a'));

    // var all = document.querySelectorAll('.banner a,.middle1 .left,.middle1 .in,.middle2 .m2left,.middle2 .m2right,.middle3 .m3-1,.middle4 .m4-1,.middle5 .m5-1,.middle6 .m6-top,.swiper-slide a');
    // for(var i=0;i<all.length;i++){   
    //         all[i].onclick = function(){
    //           var datatype = this.getAttribute('datatype');
    //           var ltdataid = this.getAttribute('dataid');
    //           console.log(datatype,ltdataid);
    //           jump(datatype,ltdataid);
    //         }           
    //     }	
	function jump(data,ltdataid){
		if(data == 7){
			 location.href =H5Host+'/topic/'+ltdataid+'.html';
		}
		if(data == 8){
			location.href = H5Host+'/circle/'+ltdataid+'.html';
		}
     
		if(data == 6){
			location.href = ltdataid.replace("h5","m")
		}
	}

	// 滑动
  	  var mySwiper = new Swiper('.swiper-container',{
        slidesPerView : 3,
        spaceBetween : 5,
        loop : false,
        slidesPerView : 'auto',
        loopedSlides :8,
    })

	 // 返利专区里面的商品 && 上方标题栏
  
})
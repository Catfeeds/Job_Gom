var fetch = require('io/fetch');
var url = require('io/url');
var Pubsub = require('io/pubsub');
var identify = require('utils/IdentifyIE8-');
require('module/atgregion')();

var isLogin = $_CONFIG['islogin'];
var clickTopicId = $_CONFIG['topicid'];
var len = 0;
var idVideo = [];
var videoObj = [];
var $playVideo = $("#playVideo");
var videoEnv = {"sim":"dist","pro":"dist","pre":"pre","dev":"pre"},
    videoEnvironment = {env:videoEnv[$_CONFIG['environment']] || "dist"};//视频环境 dist/生产
var number = 0;

//视频
function getVideo() {
	if ($playVideo.length) {
		var v = new MeixinPlayer(),
			vId = $playVideo.attr('video-id');
		v.init(vId, 'playVideo',videoEnvironment);
	} else {
		var videoArr = $_CONFIG['video_arr'];
		//console.log();
		var newVideo = [videoArr];
		if (videoArr.length > idVideo.length) {

			newVideo = videoArr.slice(idVideo.length);
			for (var i = 0; i < newVideo.length; i++) {

				var _video = newVideo[i];
				var video_id = _video.base.id;

				var v = new MeixinPlayer();
				v.init(video_id, 'videoContainer_' + video_id + "_" + _video.config.topicId, _video.config);
				idVideo.push(newVideo[i]);
				videoObj.push(v);

				v.on('playStart', function() {
					for (var i = 0; i < videoObj.length; i++) {
						if (videoObj[i] === v) {
							//return false;
						} else {
							videoObj[i].stopVideo();
						}
					}
				}, v);
			}
		} else {
			return false;
		}
	}

}

//获取话题中商品价格
var getGoodsPrice = function(goodsId) {
    var ids = '';
    $.each(goodsId, function(i, v) {
        ids += ',' + $(v).attr('data-id') + '|' + $(v).attr('data-skuid');
    })
    return ids.substr(1);
}

//渲染话题中的价格
var changeGoodsPrice = function(topicId) {
    var curTopicId = $('[id-node="' + topicId + '"]');
    var len = curTopicId.find('strong[data-id]').length;
    var ids = getGoodsPrice(curTopicId.find('strong[data-id]'));
    if (len !== 0) {
        fetch.get(url.get('getIndexData'), {
            data: {
                type: 'product',
                ids: ids
            }
        }).done(function(data) {
            if (data.success === true) {
                $.each(data.data, function(i, v) {
                    if (v.salePrice === null) {
                        v.salePrice = '暂无售价'
                    }
                    $('[data-id="' + v.id + '"]').text(v.salePrice);
                    $('[data-id="' + v.id + '"]').parent('[data-node="price"]').removeClass('hide');
                })
            }

        })
    }
}

//右侧固定
function topFixed(scrollTop) {
    if(scrollTop >= 170){
        $(".scanCode").css({
            "position": "fixed",
            "top": "0px"            
        })
    }else {
        $(".scanCode").css({
            "position": "static"   
        })
    }
}

//右侧二维码
var changeSrc = function(){
    var $codeImg = $(".scanCode img");
    var src = $codeImg.attr('data-original');
    $codeImg.attr('src',src); 
}
    
//左侧分享
var leftS = parseInt($(".wrap-box.ovflow-hid").css("margin-left"), 10) + 20;
function ulFixt(scrollTop) {
    var $divConter = $("[data-conter-ul='" + clickTopicId + "']");
    var $ul = $($divConter).children("ul");
    var divTop = $divConter.offset().top;
    var divHeight = $divConter.height();
    var ulHeight = $ul.height();
    var s = divHeight + divTop - ulHeight;
    if (scrollTop > divTop && scrollTop < s) {
        $ul.css({
            "position": "fixed",
            "top": "6px",
            "left": leftS + "px",
            "bottom": "auto"
        });
    } else if (scrollTop > s) {
        $ul.css({
            "position": "absolute",
            "top": "auto",
            "left": "0px",
            "bottom": "0px"
        });
    } else if (scrollTop < divTop) {
        $ul.css({
            "position": "absolute",
            "top": "0",
            "bottom": "auto",
            "left": "0px"
        });
    }
}

//IE显示placeholder内容
var showTextareaTips = function() {
    var $textareaTips = $('[data-node="textareaTips"]');
    if (identify()) {
        $textareaTips.removeClass('hide');
    }
}

var init = function() {
    getVideo(); //视频
    showTextareaTips(); //IE显示placeholder内容
    changeSrc(); //右侧二维码

    Pubsub('getAreaId').sub(function() {
        changeGoodsPrice(clickTopicId);
    });

    var scrollTop = 0;
    //鼠标滚动事件
    $(window).on("scroll", function() {
        scrollTop = $(this).scrollTop();
        topFixed(scrollTop);
        ulFixt(scrollTop);
    });
}


module.exports = {
    init: init,
    topFixed: topFixed
}

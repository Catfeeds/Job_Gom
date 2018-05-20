// FastClick.attach(document.body);

// $.ajax({
//   url: 'http://js.gomein.net.cn/mobile/cms/prom/hybrid/b/components/src/vendor/base64.min.js',
//   dataType:'jsonp'
// });
//
var api = 'http://hd-u1.atguat.com.cn/promotion/hedonicValue/wap/',
apiENV = ["http://hd-u1.atguat.com.cn/promotion/hedonicValue/wap/", "http://hd.gome.com.cn/promotion/hedonicValue/wap/"],
capCdApi = 'http://imgcode.atguat.com.cn/',
proCapCdApi = 'http://imgcode.gome.com.cn/',
capCdENV = ["http://imgcode.atguat.com.cn/", "http://imgcode.gome.com.cn/"],
imgApi = 'http://js.dev.meixincdn.com:1314/CDN8176/dist/external/game/dishu/images/',
ENV = ["http://js.dev.meixincdn.com:1314/CDN8177/dist/external/game/dishu", "http://js.dev.meixincdn.com:1314/CDN8177/dist/external/game/dishu"],
http = 'http:',
td = new Array(),      //保存每个格子的地鼠
playing = false,       //游戏是否开始
shareing = false,
score = 0,             //分数
beat = 20,              //鼠标点击次数
success = 0,           //命中率
knock = 0,             //鼠标点中老鼠图片次数        //倒计时
countDown = 60,
percent = 0,
totle = 0,
num = 0,
interId = null,        //指定setInterval()的变量
timeId = null,         //指定setTimeout()的变量
imgArray = ["security.png", "ensure.png", "cancel.png", "bg.jpg", "close.png", "opa5.png", "hintBg.png", "failureBg.png", "lotto.png", "playAgain.png", "loading.png", "plan.png", "percent.png", "loadPic.png", "homeTitle.png", "startGame.png", "ruleGame.png", "back.png", "rule-bg.png", "backHome.png", "hintBtn.png", "gameGrade.png", "upload.png", "again.png", "failed.png", "share.png", "game.jpg", "state.png", "holeTop.png", "holeBottom.png", "nullHit.png", "hit.png", "star.png", "hammer.png"],
curArray = [],
current = 0,
$ratEles = $('.ratting-box'),
$hummerEles = $('#hammer'),
$surplusEles = $('#surplus'),
$addOneEles = $('#addOne'),
$gameoverEles = $('#gameover'),
$overnumEles = $('#overnum'),
$overscoreEles = $('#overscore'),
$gameagainEles = $('#gameagain'),
gameGoOn = false,
curityText = null,
// dishuid = 'b0dca4d0',      //活动id
shareState = 0,
uploadState = 0,
uploadStated = false,
isAndroid = window.navigator.userAgent.match(/android/i) ? true : false,
uuid = uuid1(),
// uuid = '1',
url = imgcode_domain + 'getimage.no?type=gome_sale_activities&capCd=' + uuid +"&v="+new Date()*1;

$('#curityimg').attr('src', '');
$('#curityimg').attr('src', url);

//验证登录
// $g.getUserInfo(function(data) {
//  //登录成功
//  console.log('登录成功')
// }, function(e) {
//  //登录失败
//  console.log('登录失败')
//  $g.login();
// });

$.ajaxSettings.beforeSend = function(xhr) {
    // see https://github.com/madrobby/zepto/issues/274
    xhr.withCredentials = true;  // TODO(elsigh): Do this in zepto w/ xhrFields.
    // crossDomain = true;
};

function getRootDomainName(apiENV) {
  if(plat_form == '1') {
  	var apiUrl = '';

  	if (window.location.hostname.indexOf('gomeplus.com') > 0) {
  		apiUrl = http + "//hd.gomeplus.com/promotion/hedonicValue/wap/";
  	} else {
  		apiUrl = http + "//hd.gome.com.cn/promotion/hedonicValue/wap/";
  	}
    apiENV[1] = apiUrl;
  	return apiENV;
  }
}

function getCookie(name)
{
   var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
　 return (arr=document.cookie.match(reg))?unescape(arr[2]):null;
}

function Risk()
{
  //【开始】这一段是风控要求的所有参数，按照这个方式来做
  var version = -1;

  if ($g.system.android && navigator.userAgent.match(/gome/)) {
    version = navigator.userAgent.match(/gome[plus]{0,4}\/[iphone\/]{0,7}(\d*)/)[1];
  } else if ($g.system.ios && navigator.userAgent.match(/gome/)) {
    version = navigator.userAgent.match(/gome[plus]{0,4}\/[iphone\/]{0,7}(\d*)/)[1];
  }
  var uniqueId = $g.cookie.parse()['__clickidc'];
  var param = {
    // promId: _promId,
    //获取登陆指纹
    equipmentUfpd: $g.cookie.parse()['ufpd'],
    mac: uniqueId,
    ufpd: $g.cookie.parse()['ufpd'],
    version: version || '',
    uniqueId: uniqueId,
    is_req: version > 64 ? '1' : '0',
    //uA: $.base64.encode(navigator.userAgent.toLowerCase()),
    uA: Base64.encode(navigator.userAgent.toLowerCase()),
    luckType: 'normal'
  }
  if ($g.env.gomeplus || (version > 64 && $g.env.gome)) {
    param.is_req = '1';//新版本
  } else {
    param.is_req = '0';//新版本
  }
  if ($g.env.app) {
    //app需要覆盖wap的部分
    param.source = 'app',
    param.app_type = $g.system.android ? 'android_app' : 'ios_app'
    param.mac = param.app_type + version + uniqueId
    param.platform = $g.system.android ? '2' : '1'
    param.equipmentUfpd = $g.cookie.parse()['GDF']
    param.ufpd = $g.cookie.parse()['GDF']
  }
  //【结束】这一段是风控要求的所有参数，按照这个方式来做
  return param;
}

var game = {
  //游戏结束
  GameOver: function () {
    console.log(interId);
    clearInterval(interId);
    game.timeStop();
    beat = 0;
    playing = false;
    gameGoOn = false;
    shareing = true;
    $hummerEles.hide();
    $('.ratting').addClass('hide');
    $surplusEles.html(beat);
    $overnumEles.html(knock);
    $overscoreEles.html(score);
    $gameoverEles.show();
  },
  getScrollTop: function (){
    var scrollTop=0;

    if(document.documentElement&&document.documentElement.scrollTop){
        scrollTop=document.documentElement.scrollTop;
    }else if(document.body){
        scrollTop=document.body.scrollTop;
    }
    return scrollTop;
  },
  //运动事件绑定
  eventBind: function () {
    document.querySelector('#plan').style.width = 0 + '%';
    if(access_terminal === "app"){
			game.resetShare();
		}
    for(var i = 0; i < 6; i++) {
      $('#rat_' + i).attr('i', i).on('touchstart', function() {
        game.hit($(this).attr('i'));
      })
    }
    $hummerEles[0].addEventListener("webkitAnimationEnd", function() {
      $hummerEles.removeClass('rotateInDownRight');
      $hummerEles.hide();
    }, false);
    $hummerEles[0].addEventListener("animationend", function() {
      $hummerEles.removeClass('rotateInDownRight');
      $hummerEles.hide();
    }, false);
    $(document).on('touchstart', function(event) {
      // console.log(event.touches[0])
      // console.log(beat)
      // 判断默认行为是否可以被禁用
      //  if (event.cancelable) {
      //      // 判断默认行为是否已经被禁用
      //      if (!event.defaultPrevented) {
      //          event.preventDefault();
      //      }
      //  }
      beat -=1;
      $surplusEles.html(beat);
      if(beat <= 0) {
        beat = 0;
        $surplusEles.html(beat);
        if(!shareing) {
          game.GameOver();
        }
      } else {
        $("#hammer").css({
          top: event.touches[0].clientY + game.getScrollTop() - parseFloat($("#hammer").css("height")) / 2 + "px",
          left: event.touches[0].clientX - parseFloat($("#hammer").css("width")) / 2 + "px"
        });
        $hummerEles.show();
        $hummerEles.addClass('rotateInDownRight');
      }
    }, false);
    $('#security .security-title')[0].addEventListener("webkitAnimationEnd", function() {
      $('#security .security-title').removeClass('shake')
    })
    $ratEles.forEach(function(item, index) {
      $(item).attr("onoff", false);
      item.addEventListener("webkitAnimationStart", function() {
        $(item).attr("onoff", true);
        $(item).children().removeClass('hide');
        $(item).parents('.hole').addClass('nullHit').removeClass('hit');
      }, false);
      item.addEventListener("webkitAnimationEnd", function() {
        $(item).attr("onoff", false);
        $(item).removeClass('move');
        $(item).children(".ratting").addClass("hide");
        // $(item).children(".ratting")[0].hit = false;
      }, false);
      item.addEventListener("animationstart", function() {
        $(item).attr("onoff", true);
        $(item).children().removeClass('hide');
        $(item).parents('.hole').addClass('nullHit').removeClass('hit');
      }, false);
      item.addEventListener("animationend", function() {
        $(item).attr("onoff", false);
        $(item).removeClass('move');
        $(item).children(".ratting").addClass("hide");
        // $(item).children(".ratting")[0].hit = false;
      }, false);
    })
    $('#curityimg').on('click', function() {
      // uuid = uuid1();
      url = imgcode_domain + 'getimage.no?type=gome_sale_activities&capCd=' + uuid +"&v="+new Date()*1;
      $('#curityimg').attr('src', '');
      $('#curityimg').attr('src', url);
    })
    $('#ensure').on('click', function() {
      game.upload(uuid);
    })
    $('#gameover .close').on('click', function() {
      $('#gameover').hide();
      $('#game').hide();
      $('#home').show();
    })
    $('#certain .close').on('click', function() {
      $('#home').hide();
      $('#certain').hide();
      $('#game').hide();
      $('#gameover').show();
    })
    $('#security .cancel').on('click', function() {
      $('#gameover').hide();
      $('#security').hide();
      $('#game').hide();
      $('#certain').show();
    })
    $('#succeed .close').on('click', function() {
      $('#certain').hide();
      $('#succeed').hide();
      $('#game').hide();
      $('#home').show();
    })
    $('#toLoad .toLoad-btn').on('click', function() {
      $g.login();
    })
    $('#toLoad .close').on('click', function() {
      $('#toLoad').hide();
      $('#home').show();
    })
    $('#hint .close').on('click', function() {
      $('#hint').hide();
      $('#game').hide();
      $('#succeed').show();
    })
    $('#hint #hint-btn').on('click', function() {
      $('#hint').hide();
      $('#game').hide();
      $('#succeed').show();
    })
    $('#share .close').on('click', function() {
      $('#share').hide();
      $('#game').hide();
      $('#home').show();
    })
    $('#happy .close').on('click', function() {
      $('#share').hide();
      $('#happy').hide();
      $('#game').hide();
      $('#home').show();
    })
    // $('#home .start-game').on('touchstart', function() {
    //   game.GameStart();
    // })
  },
  //加载页面
  loading: function() {
    game.HedonicValue();
    totle = imgArray.length;
    imgArray.forEach(function(item, index) {
      var img = document.createElement('img');
      // img.src = `../images/${item}`;
      // http://js.dev.meixincdn.com:1314/CDN8176/external/game/dishu/images/loadPic.png
      img.src = source_path + 'dishu/images/' + item;
      img.onload = function() {
        num += 1;
        percent = num/totle * 100;
        percent = percent.toFixed(0);
        document.querySelector('#plan').style.width = percent + '%';
        document.querySelector('#planNum').innerHTML = percent;
        if(percent/100 == 1) {
          document.querySelector('#loading').style.display = 'none';
          document.querySelector('#home').style.display = 'block';
        }
      }
    })
  },
  //活动规则
  ruleShow: function() {
    // document.querySelector('#home').style.display = 'none';
    document.querySelector('#rule').style.display = 'block';
  },
  //关闭活动规则
  ruleClose: function() {
    document.querySelector('#rule').style.display = 'none';
    // document.querySelector('#home').style.display = 'block';
  },
  //游戏开始
  GameStart: function(e){
    e = window.event || arguments.callee.caller.arguments[0];
    e.stopPropagation();
    $hummerEles.hide();
    // game.HedonicValue();
    //验证登录
    if(access_terminal == "app") {
      $g.getUserInfo(function(data) {
       //登录成功
       game.GameStartOver();
       console.log('登录成功')
      }, function(e) {
       //登录失败
       $('#home').hide();
       $('#toLoad').show();
       console.log('登录失败');
      });
    } else {
      game.GameStartOver();
    }
  },
  GameStartOver: function() {
    $('#toLoad').hide();
    $('#happy').hide();
    $('#share').hide();
    success = 0;
    score = 0;
    knock = 0;
    beat = 20;
    playing = true;
    shareing = false;
    gameGoOn = true;
    countDown = 60;
    document.querySelector('#secondTime').innerHTML = '01';
    document.querySelector('#milliseTime').innerHTML = '00';
    countDown = countDown-1;
    document.querySelector('#home').style.display = 'none';
    document.querySelector('#game').style.display = 'block';
    // document.form1.score.value = score;
    // document.form1.success.value = success;
    $('.ratting').addClass('hide');
    $("#succeed").hide();
    $gameoverEles.hide();
    $("#curitytext").val('');
    $surplusEles.html(beat);
    $("#knock").html(0);
    // $('.ratting').show();
    $('.ratting-box').removeClass('move');
    // $ratEles.css({webkitAnimationDuration : "2s", oAnimationDuration : "2s", animationDuration : "2s"});
    clearInterval(interId);
    interId = setInterval(game.timeShow, 1000);
    console.log(interId)
  },
  //显示当前倒计时所剩时间
  timeShow: function(){
    // console.log(countDown)
    document.querySelector('#time').value = countDown;
    if(gameGoOn){
      if(countDown == 0){
          document.querySelector('#milliseTime').innerHTML = '00';
          game.GameOver();
      }else if(countDown == 60){
          document.querySelector('#secondTime').innerHTML = '01';
          document.querySelector('#milliseTime').innerHTML = '00';
          countDown = countDown-1;
          // timeId = setTimeout("game.timeShow()",1000);
          game.show();
      }else if(countDown == 59){
          document.querySelector('#secondTime').innerHTML = '00';
          document.querySelector('#milliseTime').innerHTML = countDown;
          countDown = countDown-1;
          // timeId = setTimeout("game.timeShow()",1000);
          game.show();
      }else if(countDown < 20 && countDown >= 10){
          document.querySelector('#milliseTime').innerHTML = countDown;
          // $ratEles.css({webkitAnimationDuration : "1.5s", oAnimationDuration : "1.5s", animationDuration : "1.5s"});
          countDown = countDown-1;
          // timeId = setTimeout("game.timeShow()",1000);
          game.show();
      }else if(countDown < 10){
          document.querySelector('#milliseTime').innerHTML = '0' + countDown;
          // $ratEles.css({webkitAnimationDuration : "1s", oAnimationDuration : "1s", animationDuration : "1s"});
          countDown = countDown-1;
          // timeId = setTimeout("game.timeShow()",1000);
          game.show();
      }else{
          document.querySelector('#milliseTime').innerHTML = countDown;
          countDown = countDown-1;
          // timeId = setTimeout("game.timeShow()",1000);
          game.show();
      }
    }
  },
  //主动停止所有计时
  timeStop: function(){
    clearInterval(interId);//clearInterval()方法返回setInterval()方法的id
    countDown = 0;
    // clearTimeout(timeId);//clearTime()方法返回setTimeout()的id
  },
  //随机循环显示老鼠图片
  show: function(){
    var randomCount = Math.floor(Math.random()*3);
    curArray = [];
    for(var i = 0; i <= randomCount; i++) {
      game.count();
    }

    curArray.forEach(function(current, index) {
      var $ratEle = $('#rat_' +current);
      // console.log($ratEle.parent().attr("onoff"))
      if(playing && $ratEle.parent().attr("onoff") && !$ratEle[0].hit)
      {
          //这里的路径也需要根据自己的实际文件路径来修改
          // console.log($('#rat_' +current+ '').removeClass('hide').parent())
          // $ratEle.sporting = true;
          // $ratEle.parents('.hole').addClass('nullHit').removeClass('hit');
          // $ratEle.removeClass('hide').parent().animate({height: "58%"}, 1000, 'linear', () => {
          //   $ratEle.parent().animate({height: "0%"}, 1000, 'linear', () => {
          //     $ratEle.parents('.hole').addClass('nullHit').removeClass('hit');
          //     $ratEle.sporting = false;
          //   });
          // });
          // $ratEle.addClass('hide');
          // console.log($ratEle.parent());
          //使用setTimeout()实现3秒后隐藏老鼠图片

          $ratEle.parent().addClass('move');
      }

    });
  },
  //出现次数随机
  count: function() {
    current = Math.floor(Math.random()*6);
    if(curArray.indexOf(current) == -1 && curArray) {
      curArray.push(current);
    } else {
      game.count();
    }
    // console.log(curArray)
    return curArray;
  },
  //点击事件函数，判断是否点中老鼠
  hit: function(id){
    if(playing==false)
    {
        // alert("请点击开始游戏");
        return;
    }
    else
    {
        $("#rat_"+id).parents('.hole').addClass('hit').removeClass('nullHit');
        var EleHit = document.getElementById("rat_"+id);
        if(!EleHit.hit) {
          score += 10;
          knock +=1;
          success = knock/beat;
          //PRD内停留1.5s
          $("#rat_"+id).removeClass('hide').parent().removeClass('move').addClass('moveHit');
          EleHit.hit = true;
          $("#rat_"+id).eq(0).hit = true;
          $addOneEles.show();
          gameGoOn = false;
          //时间暂停
          // clearInterval(interId);
          setTimeout(function() {
            EleHit.hit = false;
            $("#rat_"+id).eq(0).hit = false;
            $("#rat_"+id).addClass('hide').parent().attr("onoff", false);
            $addOneEles.hide();
            // clearInterval(interId);
            // interId = setInterval(game.timeShow, 1000);
            // console.log(interId)
            gameGoOn = true;
          }, 500);

          //定位鼠标位置
          // switch (id) {
          //   case 0:
          //     $("#hammer").css({
          //       top: "2.5rem",
          //       left: "2rem"
          //     });
          //     break;
          //   case 1:
          //     $("#hammer").css({
          //       top: "2.5rem",
          //       left: "5.8rem"
          //     });
          //   break;
          //   case 2:
          //     $("#hammer").css({
          //       top: "5rem",
          //       left: "2rem"
          //     });
          //   break;
          //   case 3:
          //     $("#hammer").css({
          //       top: "5rem",
          //       left: "5.8rem"
          //     });
          //   break;
          //   case 4:
          //     $("#hammer").css({
          //       top: "7.5rem",
          //       left: "2rem"
          //     });
          //   break;
          //   case 5:
          //     $("#hammer").css({
          //       top: "7.5rem",
          //       left: "5.8rem"
          //     });
          //   break;
          //   default:
          //     return;
          // }
          // // document.form1.success.value = success;
          // // document.form1.score.value = score;
          // // console.log($("#rat_"+id+"").parents('.hole'))
          //
          // $hummerEles.show();
          // $hummerEles.addClass('rotateInDownRight');
          $("#knock").html(knock);
        }
    }
  },
  HedonicValue: function() {
    $.ajax({
      type: "GET",
      xhrFields: {
            withCredentials: true
      },
      crossDomain: true,
      url: hd_domain + 'promotion/hedonicValue/wap/getUploadHedonicState.do',
      data: {
        promId: dishuid,
        source: access_terminal
      },
      dataType: "json",
      success: function(data) {
        console.log(data)
        if(data.state == 'success') {
          uploadState = data.data.uploadState;
          // uploadStated = true;
          shareState = data.data.shareState;
          // uploadState = 1;
          // shareState = 1;
        }
      },
      error: function(err) {
        console.log(err)
      }
    });
  },
  certain: function() {
    $gameoverEles.hide();
    $('#gameover').hide();
    if(uploadState == 1) {
      $('#certain').show();
      // uploadState = 2;
      uploadStated = true;
    } else if(uploadState == 2) {
      $('#succeed').show().find('.upload-succeed').html('今日已上传过享乐值！');
      if(shareState == 1) {
        $('#succeed .extra').html('分享可额外获得<span>100享乐值</span>哦~~~');
      } else if (shareState == 2) {
        $('#succeed .extra').html('');
      }
    }

  },
  curity: function() {
    $('#gameover').hide();
    $('#certain').hide();
    $('#security').show();
    // uuid = uuid1();
    // url = imgcode_domain + 'getimage.no?type=gome_sale_activities&capCd=' + uuid +"&v="+new Date()*1;
    $('#curityimg').attr('src', url);
  },
  upload: function(uuids) {
    curityText = $('#curitytext').val();
    // var version = navigator.userAgent.match(/gomeplus\/[iphone\/]{0,7}(\d*)|gome\/[iphone\/]{0,7}(\d*)/)[1],
    //     uniqueId = navigator.userAgent.match(/gomeplus\/iphone\/\d*\/([\w\-\d]*)\//)[1],
    //     app_type = 'ios_app'
    //

    // 风控体系
    if(curityText.length == 4) {
      var params = $.extend({}, Risk(), {
        promId: dishuid,
        hitGopherCount: knock,
        captchaCode: curityText,
        uuid: uuids,
        source: access_terminal
      });
      $.ajax({
        type: "GET",
        xhrFields: {
              withCredentials: true
        },
        crossDomain: true,
        url: hd_domain + 'promotion/hedonicValue/wap/doHitGopherResult.do',
        data: params,
        dataType: "json",
        success: function(data) {
          console.log(data)
          if(data.state == 'success') {
            uploadState = 2;
            $('#security').hide();
            $('#succeed').show();
          } else {
            // uuid = uuid1();
            $('#security').hide();
            $('#failure').show();
            setTimeout(function() {
              $('#failure').hide();
              $('#gameover').show();
            }, 3000);
            url = imgcode_domain + 'getimage.no?type=gome_sale_activities&capCd=' + uuid +"&v="+new Date()*1;
            $('#curityimg').attr('src', url);
          }
        },
        error: function(err) {
          console.log(err)
        }
      });
    } else {
        $('#security .security-title').addClass('shake')
    }
  },
  shareover: function() {
    if(shareState == 1) {
      var params = $.extend({}, Risk(), {
        promId: dishuid,
        source: access_terminal
      });

      $.ajax({
        type: "GET",
        xhrFields: {
              withCredentials: true
        },
        crossDomain: true,
        url: hd_domain + 'promotion/hedonicValue/wap/doShareHedonicValue.do',
        data: params,
        dataType: "json",
        success: function(data) {
          console.log(data)
          if(data.state == 'success') {
            shareState = 2;
            $('#wShare').hide();
            $('#game').hide();
            $('#rule').hide();
      		$('#happy .smallHint-cont').html('分享成功');
          	$('#happy').show();
          }
        },
        error: function(err) {
            $('#wShare').hide();
	        $('#game').hide();
	        $('#rule').hide();
	        $('#happy').hide();
	        $('#home').show();
        }
      });
    } else {
        $('#wShare').hide();
        $('#game').hide();
        $('#rule').hide();
        $('#happy').hide();
        $('#home').show();
    }
  },
  resetShare:function() {
		$g.ready().then(function() {
			var obj = {
					type:'share',
					icon:'file://share',
					shareInfo:{
						title: '玩游戏练手速  11.11终极大考验',
						shareDesc: '千万惊喜抢个够  神秘大奖等着你！',
						shareImageUrl: share_img,
						shareUrl : location.href,
						platform: ['WeiBo', 'Wechat', 'WechatMoments', 'QQ', 'QZone', 'GomeMyFriends', 'GomeMoments', 'CopyLink'],
					},
				};
			if ($g.env.app) {
				$g.setHeadBar({
					menus:{
						isShowCloseMenu:'Y',
						rightMenus:[
							obj
						]
					},
				});
			}
		});
	},
  appShare: function(param) {
  	$g.callShareComp(param, function(data) {
        if (data.shareResult === "0") {
          // 分享成功显示结果
          $('#game').hide();
          $('#wShare').hide();
          $('#succeed').hide();
          $('#happy .smallHint-cont').html('分享成功');
          $('#happy').show();
          game.shareover();
        } else if(data.shareResult === "1"){
          $('#game').hide();
          $('#wShare').hide();
          $('#succeed').hide();
          $('#happy .smallHint-cont').html('分享失败');
          $('#happy').show();
        }
      }, function(err) {
          $('#game').hide();
          $('#wShare').hide();
          $('#succeed').hide();
          $('#happy .smallHint-cont').html('分享失败');
          $('#happy').show();
      })
  },
  share: function() {
    //确定分享
      // alert(access_terminal)

    if(access_terminal) {
      if(access_terminal == 'weixin') {
        $('#succeed').hide();
        $('#game').hide();
        $('#wShare').show();
      } else if(access_terminal == 'app') {
        var param = {
					title: '玩游戏练手速  11.11终极大考验',
					shareDesc: '千万惊喜抢个够  神秘大奖等着你！',
					shareImageUrl: share_img,
					shareUrl: location.href,
					platform: ['WeiBo', 'Wechat', 'WechatMoments', 'QQ', 'QZone', 'GomeMyFriends', 'GomeMoments', 'CopyLink'],
				};
        if (isAndroid && window.navigator.userAgent.match(/gome/)) {
           var version = window.navigator.userAgent.match(/gome[plus]{0,4}\/[iphone\/]{0,7}(\d*)/)[1]; //设备版本
           if (version < 100) {
             game.shareover();
           } else {
             game.appShare(param);
           }
         } else {
           game.appShare(param);
         }
      } else if(access_terminal == 'wap') {
        $('#succeed').hide();
        $('#game').hide();
        $('#hint .smallHint-cont').html('请用浏览器自带分享功能分享');
        $('#hint').show();
      }
    }
  }
}

game.eventBind();
game.loading();
// game.GameStart();

//
// //清除所有老鼠图片
// function clearMouse(){
//   for(var i=0;i<=24;i++)
//   {
//       document.getElementById("td["+i+"]").innerHTML="";
//   }
// }
//

$(function(){
  var Double12 = {
    init: function(){
      this.pageIndex = $("#page-index");
      this.pageSendWarm = $("#page-send-warm");
      this.pageSendSuccess = $("#page-send-success");
      this.pageSendFail = $("#page-send-fail");

      this.score = 0;
      this.time = 12;
      this.retryTime = 0;
      this.isFirst = true;
      this.isInScale = false;
      this.bind();
    },

    bind: function(){
      var _this = this;
      this.pageIndex.on("click", '[data-node="send-warm"]', this.gotoSendWarmPage.bind(this));
      this.pageSendWarm.on('touchstart', '[data-node="send-warm"]', function(e){
        _this.startSendWarm(e)
      });
      $(document).on('touchmove', function(e){
        _this.moveSendWarm(e)
      });
      $(document).on('touchend', function(e){
        _this.endSendWarm(e)
      });
      this.bury();

    },
    bury: function(){
      var scoreNumber = localStorage.getItem("score" + $GLOBAL_CONFIG.taUserId) || 0;

      if( scoreNumber > 0 ){
        this.pageSendSuccess.on('click', '[data-node="seekWarm"]', function(){
            gomeClicki('send', 'event', 'resultpage','give', 'index');
            window.location.href = $(this).attr('data-link');
        }).on('click', '[data-node="goMain"]', function(){
            gomeClicki('send', 'event', 'resultpage','give', 'play');
            window.location.href = $(this).attr('data-link');
        });
      }else{
        this.pageSendSuccess.on('click', '[data-node="seekWarm"]', function(){
            gomeClicki('send', 'event', 'resultpage','without', 'index');
            window.location.href = $(this).attr('data-link');
        }).on('click', '[data-node="goMain"]', function(){
            gomeClicki('send', 'event', 'resultpage','without', 'play');
            window.location.href = $(this).attr('data-link');
        });
      }

    },
    gotoSendWarmPage: function(){
      this.pageIndex.addClass("hide");
      this.pageSendWarm.removeClass("hide");
      gomeClicki('send', 'pageview', {
        'location':'warm-b2'
      });

      this.startTimer();
    },

    startSendWarm: function(e){
      let touch = e.touches[0];
      this.initPosition = {
        x: touch.pageX,
        y: touch.pageY
      }
      this.isInScale = true;
    },

    moveSendWarm: function(e){
      if(!this.isInScale){
        return;
      }
      e.preventDefault();
      var pageSendWarm = this.pageSendWarm;
      var touch = e.touches[0];
      var pageX = touch.pageX;
      var pageY = touch.pageY;
      var moveWarp = pageSendWarm.find('[data-node="send-warm"]');
      var thermograph = pageSendWarm.find('[data-node="thermograph"]');
      var warpInfo = {
        height: moveWarp.height(),
        top: moveWarp.offset().top
      };

      thermograph.css('-webkit-transition', 'all .2s linear')
      if( pageY > warpInfo.top && pageY < (warpInfo.top + warpInfo.height) ){
        if( Math.abs(pageX - this.initPosition.x ) > 100 || Math.abs(pageY - this.initPosition.y ) > 100){
          if(!this.first){
            this.first = true;
            pageSendWarm.find('[data-node="figure"]').addClass("hide");
            pageSendWarm.find('[data-node="gif"]').removeClass("hide");
            pageSendWarm.find('[data-node="gif"] img').attr("src", pageSendWarm.find('[data-node="gif"] img').attr("src"))
          }
          if(this.score < 40){
            this.score += 5;
            this.initPosition = {
              x: touch.pageX,
              y: touch.pageY
            }
            thermograph.css('bottom', (this.score/40*100) + '%');
          }
        }
      }
    },

    endSendWarm: function(e){
      this.isInScale = false;
    },

    startTimer: function(){
      var _this = this;
      var time = this.pageSendWarm.find('[data-node="time"]');

      this.timerId = setInterval(function(){
        time.text(--_this.time);
        if( _this.time == 0 ){
          clearInterval(_this.timerId);
          var score = _this.score;
          if (typeof localStorage === 'object') {
            try {
              localStorage.setItem("score" + $GLOBAL_CONFIG.taUserId , score);
            } catch (e) {
              console.log('当前为无痕模式，无法保存本地数据');
            }
          }
          _this.postScore(score);
          _this.gotoSendWarmResult(score);
        }
      }, 1000);
    },

    postScore: function(score){
      var _this = this;
      $.ajax({
        url: "/api/incrWarm",
        type: "post",
        headers:{
          'Source-Mark-Type': this.getCookie($GLOBAL_CONFIG['cookie_prefix'] + "content_ctag_type") || ''
        },
        data: {
          userStr: $GLOBAL_CONFIG.taUserStr,
          warmNum: score,
          userId: $GLOBAL_CONFIG.taUserId
        },
        success: function(res){
          if(res.code == "200"){
            _this.retryTime = 0;
          }else{
            _this.rePostScore(score);
          }
        },
        error: function(err){
          _this.rePostScore(score);
        }
      })
    },

    rePostScore: function(score){
      if(this.retryTime > 1){
        return;
      }
      this.retryTime++;
      this.postScore(score);
    },

    gotoSendWarmResult: function(score){
      if(score > 0){
        this.gotoSendWarmSuccessPage(score);
      }else{
        this.gotoSendWarmFailPage();
      }
    },

    gotoSendWarmSuccessPage: function(score){
      var pageSendSuccess = this.pageSendSuccess;
      var resultScore = score + $GLOBAL_CONFIG.totalScore;
      var totalNotice = pageSendSuccess.find('[data-node="total-notice"]');
      var couponNotice = pageSendSuccess.find('[data-node="total-coupon"]');
      this.pageSendWarm.addClass("hide");
      pageSendSuccess.removeClass("hide");
      pageSendSuccess.find('[data-node="rise-score"]').text(score);
      if( resultScore < 150 ){
        totalNotice.html('好友当前暖心值为：<span class="now">'+ resultScore +'</span>');
      }else if( resultScore >= 150 && resultScore <= 10000 ){
        totalNotice.html('好友暖心值已爆表：<span class="now">'+ resultScore +'</span>');
      }else if( resultScore > 10000 ){
        totalNotice.html('好友暖心值已爆表：<span class="now">10000+</span>');
      }
      if( resultScore >= 50 ){
        var couponNumber = 0;
        if( resultScore >= 50 && resultScore < 100 ){
          couponNumber = 2;
        }else if(resultScore >= 100 && resultScore < 150 ){
          couponNumber = 5;
        }else if( resultScore >= 150 ){
          couponNumber = 121;
        }
        couponNotice.show().find('span').text(couponNumber);
      }
    },

    gotoSendWarmFailPage: function(){
      this.pageSendWarm.addClass("hide");
      this.pageSendFail.removeClass("hide");
      gomeClicki('send', 'pageview', {
        'location':'warm-b3'
      });
    },

    getCookie: function(name){
      var str = name + "=([^;]+);?"
      var reg = new RegExp(str);
      reg.test(document.cookie);
      return RegExp.$1;
    }
  }
  window.addEventListener("load", function(){
    Double12.init();
  }, false);
})

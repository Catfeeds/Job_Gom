
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8">
    <meta name="robots" content="noarchive">
    <meta name="Baiduspider" content="noarchive">
    <meta http-equiv="Cache-Control" content="no-transform">
    <meta http-equiv="Cache-Control" content="no-siteapp">
    <meta name="applicable-device" content="pc,mobile">
    <meta name="MobileOptimized" content="width">
    <meta name="HandheldFriendly" content="true">
    <title>送温暖</title>
    <script src="http://apps.bdimg.com/libs/jquery/2.1.1/jquery.min.js"></script>
    <link rel="stylesheet" href="../css/double12.css">
    <script type="text/javascript">
      (function() {
      /*rem*/
      function setFont() {
      var __rootrem;
      var clientWidth = (document.documentElement || document.body.parentNode).clientWidth;
      if ( clientWidth > 650) {
      clientWidth = 640;
      }
      // 375尺寸的比例，换算成@1x设计稿后1px=0.01rem
      __rootrem = Math.floor(clientWidth * 100 / 640);
      (document.documentElement || document.body.parentNode).style.fontSize = __rootrem + "px";
      }
      setFont();
      window.addEventListener("resize", function() {
      setFont();
      });
      })();
    </script>
  </head>
  <body>
    <div class="outer hide">
      <div class="home hide">
        <div class="home-text"></div>
        <div class="home-btn"><a class="warmBtn" href="javascript:;"></a><a class="ruleBtn" href="javascript:;"></a></div>
      </div>
      <div class="rule hide">
        <div class="bg">
          <div class="back"><a href="javascript:;"></a></div>
          <div class="rule-cont">
            <div class="cont-text">
              <div class="text-title">规则：</div>
              <p>1.完善H5需要提交的信息</p>
              <p>2.H5生成参与者专属形象</p>
              <p>3.参与者可以选择生成专属海报并保存到相册，分享给朋友或朋友圈求“温暖”；也可以直接将连接分享到朋友圈“求温暖”</p>
              <p>4.参与者好友通过分享进入到H5之后，选择温暖您，您将会获得“温暖值”，到达一定数额的温暖值可以兑换相应的优惠券，每个区间的优惠券一人限领一次。</p>
            </div>
          </div>
        </div>
      </div>
      <div class="info hide">
        <div class="bg">
          <div class="back"><a href="javascript:;"></a></div>
          <div class="sex">
            <div class="sex-title">请选择你的性别</div>
            <div class="sex-btn clearfix">
              <div class="man fl">
                <div class="head"><img src="../images/man.png" alt=""></div>
                <div class="btn"><a class="btn-man" href="javascript:;"></a></div>
              </div>
              <div class="woman fr">
                <div class="head pitch"><img src="../images/woman.png" alt=""></div>
                <div class="btn"><a class="btn-woman" href="javascript:;"></a></div>
              </div>
            </div>
          </div>
          <div class="nickname">
            <input type="text" name="tname" placeholder="输入昵称">
          </div>
          <div class="picture">
            <div class="picturetitle">请选择你的头像</div>
            <div class="head"><img class="head-woman" src="../images/photoWoman.jpg" alt=""><img class="head-man hide" src="../images/photoMan.jpg" alt=""></div>
            <div class="picture-btn"></div>
          </div>
        </div>
      </div>
      <div class="adjust hide">
        <div class="bg">
          <div class="back"><a href="javascript:;"></a></div>
          <div class="adjust-title">调整你的头像位置</div>
          <div class="head"><img class="head-woman" src="../images/photoWoman.jpg" alt=""><img class="head-man hide" src="../images/photoMan.jpg" alt=""></div>
          <div class="btn"><a href="javascript:;"></a></div>
        </div>
      </div>
      <div class="choice hide">
        <div class="bg">
          <div class="back"><a href="javascript:;"></a></div>
          <div class="choice-pic">
            <div class="pic"><img src="../images/choicePic.jpg" alt=""></div>
            <div class="choice-woman"></div>
            <div class="choice-man hide"></div>
          </div>
          <div class="choice-text"><span>sunshine</span>，选一个过冬吧？</div>
          <div class="choice-btn">
            <div class="btn choice1"><a class="pitch-btn" href="javascript:;"></a></div>
            <div class="btn choice2"><a href="javascript:;"></a></div>
            <div class="btn choice3"><a href="javascript:;"></a></div>
            <div class="btn choice4"><a href="javascript:;"></a></div>
          </div>
        </div>
        <div class="ok-btn"></div>
      </div>
      <div class="equip hide">
        <div class="bg">
          <div class="equip-text"> <span class="name">Sunshine </span><br>你给我的温暖，我都收在心里了</div>
          <div class="equip-pic">
            <div class="pic-head">
              <div class="pic"><img src="../images/choicePic.jpg" alt=""></div>
              <div class="head-woman hide"></div>
              <div class="head-man"></div>
              <div class="pic-equip1 hide"></div>
              <div class="pic-equip2 hide"></div>
              <div class="pic-equip3"></div>
              <div class="pic-equip4 hide"></div>
            </div>
            <div class="pic-title"></div>
          </div>
        </div>
        <div class="equip-btn clearfix">
          <div class="poster btn"><a href="javascript:;"></a></div>
          <div class="share btn"><a href="javascript:;"></a></div>
        </div>
      </div>
      <div class="music open">
        <audio src="" autoplay loop></audio>
      </div>
      <div class="shareWx hide">
        <div class="share-bg"></div>
        <div class="share-title"></div>
      </div>
    </div>
  </body>
</html>

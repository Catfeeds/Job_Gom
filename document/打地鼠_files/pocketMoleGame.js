
FastClick.attach(document.body);

var td = new Array(),      //保存每个格子的地鼠
playing = false,       //游戏是否开始
score = 0,             //分数
beat = 0,              //鼠标点击次数
success = 0,           //命中率
knock = 0,             //鼠标点中老鼠图片次数        //倒计时
countDown = 60,
percent = 0,
totle = 0,
num = 0,
interId = null,        //指定setInterval()的变量
timeId = null,         //指定setTimeout()的变量
imgArray = ["bg.jpg", "close.png", "opa5.png", "hintBg.png", "failureBg.png", "lotto.png", "playAgain.png", "loading.png", "plan.png", "percent.png", "loadPic.png", "homeTitle.png", "startGame.png", "ruleGame.png", "back.png", "rule-bg.png", "backHome.png", "hintBtn.png", "gameGrade.png", "upload.png", "again.png", "failed.png", "share.png", "game.jpg", "state.png", "holeTop.png", "holeBottom.png", "nullHit.png", "hit.png", "star.png", "hammer.png"];
curArray = [],
current = 0,
$ratEles = $('.ratting-box'),
$hummerEles = $('#hammer');

var game = {
  //游戏结束
  GameOver() {
    this.timeStop();
    playing = false;
    this.clearMouse();
    alert("游戏结束！\n你获得的分数为："+score+"\n命中率为："+success);
    success = 0;
    score = 0;
    knock = 0;
    beat = 0;
  },
  //运动事件绑定
  eventBind() {
    $hummerEles[0].addEventListener("webkitAnimationEnd", () => {
      $hummerEles.removeClass('rotateInDownRight');
      $hummerEles.hide();
    }, false);
    $hummerEles[0].addEventListener("animationend", () => {
      $hummerEles.removeClass('rotateInDownRight');
      $hummerEles.hide();
    }, false);
    $(document).on('touchstart', (event) => {
      $("#hammer").css({
        top: event.touches[0].clientY - parseFloat($("#hammer").css("height")) / 2 + "px",
        left: event.touches[0].clientX - parseFloat($("#hammer").css("width")) / 2 + "px"
      });
      $hummerEles.show();
      $hummerEles.addClass('rotateInDownRight');
    });
    $ratEles.forEach((item, index) => {
      $(item).attr("onoff", false);
      item.addEventListener("webkitAnimationStart", () => {
        $(item).attr("onoff", true);
        $(item).children().removeClass('hide');
        $(item).parents('.hole').addClass('nullHit').removeClass('hit');
      }, false);
      item.addEventListener("webkitAnimationEnd", () => {
        $(item).attr("onoff", false);
        $(item).removeClass('move');
        $(item).children(".ratting").addClass("hide");
        $(item).children(".ratting")[0].hit = false;
      }, false);
      item.addEventListener("animationstart", () => {
        $(item).attr("onoff", true);
        $(item).children().removeClass('hide');
        $(item).parents('.hole').addClass('nullHit').removeClass('hit');
      }, false);
      item.addEventListener("animationend", () => {
        $(item).attr("onoff", false);
        $(item).removeClass('move');
        $(item).children(".ratting").addClass("hide");
        $(item).children(".ratting")[0].hit = false;
      }, false);
    })
  },
  //加载页面
  loading() {
    totle = imgArray.length;
    imgArray.forEach((item, index) => {
      let img = document.createElement('img');
      img.src = `../images/${item}`;
      img.onload = function() {
        num += 1;
        percent = num/totle * 100;
        percent = percent.toFixed(0);
        document.querySelector('#plan').style.width = `${percent}%`;
        document.querySelector('#planNum').innerHTML = percent;
        if(percent/100 == 1) {
          document.querySelector('#loading').style.display = 'none';
          document.querySelector('#home').style.display = 'block';
        }
      }
    })
  },
  //活动规则
  ruleShow() {
    // document.querySelector('#home').style.display = 'none';
    document.querySelector('#rule').style.display = 'block';
  },
  //关闭活动规则
  ruleClose() {
    document.querySelector('#rule').style.display = 'none';
    // document.querySelector('#home').style.display = 'block';
  },
  //游戏开始
  GameStart(){
    playing = true;
    document.querySelector('#home').style.display = 'none';
    document.querySelector('#game').style.display = 'block';
    // document.form1.score.value = score;
    // document.form1.success.value = success;
    $("#knock").html(0);
    this.eventBind();
    this.timeShow();
  },
  //显示当前倒计时所剩时间
  timeShow(){
    // console.log(countDown)
    document.querySelector('#time').value = countDown;
    document.querySelector('#milliseTime').innerHTML = countDown;

    if(countDown == 0){
        document.querySelector('#milliseTime').innerHTML = '00';
        this.GameOver();
        return;
    }else if(countDown == 60){
        document.querySelector('#secondTime').innerHTML = '01';
        document.querySelector('#milliseTime').innerHTML = '00';
        countDown = countDown-1;
        timeId = setTimeout("game.timeShow()",1000);
        this.show();
    }else if(countDown == 59){
        document.querySelector('#secondTime').innerHTML = '00';
        countDown = countDown-1;
        timeId = setTimeout("game.timeShow()",1000);
        this.show();
    }else if(countDown < 10){
        document.querySelector('#milliseTime').innerHTML = '0' + countDown;
        countDown = countDown-1;
        timeId = setTimeout("game.timeShow()",1000);
        this.show();
    }else{
        countDown = countDown-1;
        timeId = setTimeout("game.timeShow()",1000);
        this.show();
    }
  },
  //主动停止所有计时
  timeStop(){
    clearInterval(interId);//clearInterval()方法返回setInterval()方法的id
    clearTimeout(timeId);//clearTime()方法返回setTimeout()的id
  },
  //随机循环显示老鼠图片
  show(){
    let randomCount = Math.floor(Math.random()*4);
    curArray = [];
    for(var i = 0; i <= randomCount; i++) {
      game.count();
    }

    curArray.forEach((current, index) => {
      let $ratEle = $('#rat_' +current);
      // console.log($ratEle.parent().attr("onoff"))
      if(playing && $ratEle.parent().attr("onoff"))
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
  count() {
    current = Math.floor(Math.random()*6);
    if(curArray.indexOf(current) == -1) {
      curArray.push(current);
    } else {
      game.count();
    }
    // console.log(curArray)
    return curArray;
  },
  //点击事件函数，判断是否点中老鼠
  hit(id){
    if(playing==false)
    {
        alert("请点击开始游戏");
        return;
    }
    else
    {
        $("#rat_"+id).parents('.hole').addClass('hit').removeClass('nullHit');
        var EleHit = document.getElementById("rat_"+id);
        if(!EleHit.hit) {
          beat +=1;
          score += 10;
          knock +=1;
          success = knock/beat;
          EleHit.hit = true;
          $("#rat_"+id).eq(0).hit = true;

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
  }

}

game.loading();


//
// //清除所有老鼠图片
// function clearMouse(){
//   for(var i=0;i<=24;i++)
//   {
//       document.getElementById("td["+i+"]").innerHTML="";
//   }
// }
//

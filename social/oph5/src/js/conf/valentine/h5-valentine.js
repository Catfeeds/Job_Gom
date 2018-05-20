define('conf/valentine/h5-valentine.js', function(require, exports, module) { 
    require('$');
    require('vendors/zepto.js');
    require('UI/zepto-fx.js');
    require('mods/buried.js');
    require('utils/appInterface.js');
    var ajax = require('utils/ajax');
    var common = require('mods/common');
    var UI = require('UI/alert');
    var base64 = require('utils/base64.js');
    var dropload = require('UI/dropload.js');
    var appEvent = require('mods/appEvent');
    $("#myTab li").bind("click",function(){
        var $curTab = $(this).attr("id");
        $(this).addClass("active").siblings().removeClass("active");
        $("#tab"+$curTab).css("display","block");
        $("#tab"+$curTab).siblings().css("display","none");
    });
    $('#deliver').on('click',function(){
        var oNum = $('this').attr('number');
        BP.send({event_id:'P804W011',name:'送出礼物',url:mypacksUrl,cook_id:'',user_id: userId,
            send_item_count:oNum       
        });
    })
    $('#receive').on('click',function(){
        var oNum = $('this').attr('number');
        BP.send({event_id:'P804W011',name:'收到礼物',url:mypacksUrl,cook_id:'',user_id: userId,
            received_item_count:oNum       
        });
    })
    $("#downLoad").on('click',function(){
        window.location.href=WAP_DOMAIN +'state/appdownload'   
    });
    $("#vlGift li img").on('click',function(){
        var giftid = $(this).attr("giftid");
        var pName  = $('#pName').val();
        var pWord = $("#sayWorld").val(); 
        $("#pName").val(giftid);
        $(this).parents("#vlGift").find("span.p-tip").removeClass("active");
        $(this).parent().find("span.p-tip").addClass("active");
        
        if( pWord ){
            $("#pBag").removeAttr("disabled");
            $("#pBag").removeClass("disabled"); 
        } 

    });
     BP.send({event_id:'P804W007',name:'整蛊七夕',url:SendUrl,cook_id:'',user_id: userId});

      //先判断登录状态   
    $('#startPerson').click(function(){
            //页面埋点参数
            BP.send({event_id:'B804W008',name:'开始整人',url:SendUrl,cook_id:'',user_id: userId});
            if(userId==0){  //未登录,先注销再调登录
              location.href=loginUrl+'/index?redirect='+base64.encode(LoginSendUrl);
             
            }else{  
                 //userId 有值  选择礼物页面
                $(".opg-start").css("display","none");
                $(".opg-valent").css("display","block");
                $(".opg-getpresent").css("display","none");
            }
                
    });
    // 验证字符长度  需求：不超过100个字符即汉字占两个字符，字符数字占一个字符
    function len(w){
        var len = 0;
        var arr   = w.split("");
        for( var i=0;i<arr.length;i++ ){
            if( arr[i].charCodeAt(0) < 299 ){
                len++;
            }else{
               len += 2;
            }   
        }
        return len;
    }
    
    function isBeyondWorld(word){
        var worldlen  = len(word);
        if( worldlen > 100 ){
         UI.alerter("请输入50个以内文字哟");
            return false;

        }    

    }
    $("#sayWorld").on("keyup",function(){
        var pName  = $('#pName').val();
        var pWord = $(this).val(); 
        if( pName && pWord ){
            $("#pBag").removeAttr("disabled");
            $("#pBag").removeClass("disabled");  

        } 
        else{
            $("#pBag").attr("disabled","disabled");
            $("#pBag").addClass("disabled"); 
            return false;
        }   
    });
    
    $("#sayWorld").on("blur",function(){
        var that      = $(this);
        var pWord     = that.val(); 
        isBeyondWorld(pWord);
    });
    
    $("#pBag").on('click',function(){
        var pName  = $('#pName').val();
        var pWord = $("#sayWorld").val();
       
        if( pName && pWord){
            $(this).removeAttr("disabled");
            $(this).removeClass("disabled");
            if(userId==0){  
              location.href=loginUrl+'/index?redirect='+base64.encode(SendUrl);
             
            }else{  
                $("#sayWorld").trigger("blur");
                var worldlen  = len(pWord);
                if( worldlen > 100 ){
                 UI.alerter("请输入50个以内文字哟");
                    return false;

                } 
                ajax.query('/op/qixi/addpacks', {
                    giftid : pName,
                    word : pWord
                },function(data){
                    libaoId = data.libaoId;
                    if(data.success){
                        $(".opg-start").css("display","none");
                        $(".opg-valent").css("display","none");
                        $(".opg-getpresent").css("display","block"); 
                        //window.location.reload();
                        window.location.href= SendUrl;

                    }
                });
            }
            
        }

         
    });
    //分享内容/images/module/h5-valentine/valentine-step.png
    var title = '来自七夕的意外惊喜。。。';
    var desc2 = '[有人@你]我送了你一个七夕礼包，赶紧去拆吧！';
    var imgUrl=shareImgUrlPrefix.replace("https","http")+'/images/module/h5-valentine/vshare.png';
    var link = ShareUrl+$('#callFriend').attr('createlibaoid');
     //微信的分享----配置     
     
 wx.ready(function () {
        wx.hideAllNonBaseMenuItem();//隐藏所以的按钮
        wx.showMenuItems({         //显示需要的按钮
            menuList: ['menuItem:share:timeline','menuItem:share:appMessage','menuItem:favorite','menuItem:openWithSafari'] // 要显示的菜单项，所有menu项见附录3
        });
        wx.onMenuShareTimeline({     //分享到朋友圈
            title: desc2, // 分享标题
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
                //alert('成功分享到朋友圈');
            },
            cancel: function () {
                //alert('取消分享朋友圈');
            }
        });
        wx.onMenuShareAppMessage({   //分享给朋友
            title:title, // 分享标题
            desc:desc2, // 分享描述
            link:link, // 分享链接
            imgUrl:imgUrl, // 分享图标
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
            title: title, // 分享标题
            desc: desc2, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
                //alert('成功分享到QQ');
            },
            cancel: function () {
                //alert('取消分享到QQ');
            }
        });
    });


     // // callFriend  sentContinue
    $("#callFriend").on('click',function(){
        BP.send({event_id:'B804W010',name:'喊好友领礼物啦~',url:SendUrl,cook_id:'',user_id: userId});
        weixinShare();
    });
    // 点击关闭蒙层 
    function weixinShare(){
        $('.share-weixin').show();   //显示指示区（点击右上角）
        $('.share-weixin').on('click',function(){
            $('.share-weixin').css('display','none');
        })
    } 

     
    $("#sentContinue").on('click',function(){
        BP.send({event_id:'B804W011',name:'继续送礼~',url:SendUrl,cook_id:'',user_id: userId});
        $(".opg-start").css("display","none");
        $(".opg-valent").css("display","block");
        $(".opg-getpresent").css("display","none"); 

    });
    

    function startMove(){ 
        var t;
        window.clearInterval(t);
        var timemove;
        window.clearTimeout(timemove);
        var playList = [{
            //从何时开始
            time:0,
            //经过的时间
            duration:7992,
            //舞台偏移的高度
            top:20,
            //弹幕文字大小
            size:0.4,
            //弹幕颜色
            color:'#0070c0',    
            //内容
            text:'送你块肥皂，基佬@&…#'
            },
            { time:100,duration:7992,top:60,size:0.4,color:'#00b050', text:'妞儿：你家里的黄瓜该换啦~'  },

            {time:200,duration:7992,top:100,size:0.4,color:'#ff66cc',text:'老妹儿：你们两口子今晚的套我承包了'},

            { time:3000, duration:7992,top:25,size:0.4,color:'#ff9933',text:'若单身是狗&那我送你一袋狗粮'},
            {time:3200,duration:7992,top:65,size:0.4,color:'#ff99cc',text:'一言不合 就送棒棒糖6666' },
            { time:3300, duration:7992,top:105,size:0.4,color:'#ffffff', text:'小撸怡情 大撸伤身 卫生纸奉上' },

            {time:5500, duration:7992,top:20, size:0.4, color:'#0070c0',text:'送人肥皂~手有“基”香2333' },
            {time:5600,duration:7992, top:60,size:0.4,  color:'#00b050',text:'赶紧脱单~要不明年还送你黄瓜~'} ,
            {time:5800, duration:7992,top:100,size:0.4, color:'#ff99cc',text:'想送你个套套 然并卵 只因你单身' },

            {time:7600, duration:7992,top:25,size:0.4, color:'#ff9933',text:'情人节，你单身，你就吃狗粮，，，' },
            {time:7500, duration:7992,top:65,size:0.4, color:'#ff66cc',text:'给你一根大大大吮吸棒棒糖' },
            {time:7700, duration:7992,top:105,size:0.4, color:'#ff0000',text:'你口味这么重 一定要根绳子' },

            {time:9600, duration:7992,top:20,size:0.4, color:'#0070c0',text:'哥们儿 七夕搞基怎能没有肥皂~' },
            {time:9500, duration:7992,top:60,size:0.4, color:'#ff0000',text:'这并不是一根简单的绳子' },
            {time:9700, duration:7992,top:100,size:0.4, color:'#ff99cc',text:'护士帽~护士~你懂得~666' },

            {time:11300, duration:7992,top:25,size:0.4, color:'#ff99cc',text:'戴护士帽 和你媳妇一起激战' },
            {time:11500, duration:7992,top:65,size:0.4, color:'#ff0000',text:'七夕 有绳子！才过瘾！' },
            {time:11200, duration:7992,top:105,size:0.4, color:'#ffffff',text:'兄弟 你床前的卫生纸还够吗' }
            ]

        //弹幕的总时间（演出总时间）
        var Time = 12000;
        //检测时间间隔（每一场的时间）
        var CheckTime = 2000;
        //总场数
        var PlayCount = Math.ceil(Time / CheckTime);
        var Actor = function(play){
           this.play = play;
           this.appearance = this.makeUp();
           this.appearance.hide().appendTo(stage);
        }

        Actor.prototype.makeUp = function() {
            var appearance = $('<div style="min-width:400px;font-size:'+this.play.size +'rem;color:'+this.play.color+';">'+this.play.text+'</div>');
            return appearance;
        }

 
        Actor.prototype.animate = function() {
            var that = this;
            var appearance = that.appearance;
            var mywidth = appearance.width();
            
            appearance.animate({
                left:-mywidth
            }, that.play.duration,'swing',function(){
                appearance.hide();
            });
        }

   
        Actor.prototype.perform = function() {
            var that = this;
            var appearance = that.appearance;
           
            appearance.css({
                position:'absolute',
                left: stage.width()+'px',
                top:that.play.top||0,
                zIndex:10,
                display:'block'
            });
          
            var delayTime = that.play.time - (that.play.session-1) * CheckTime;

           
            timemove = setTimeout(function(){
                that.animate();
            },delayTime)

        }
        var director = $({});
        var stage = $('#J_stage');
        stage.css({
            position:'relative',
            overflow:'hidden'
        })

        $.each(playList,function(k,play){
            var session = Math.ceil(play.time / CheckTime);
            play.session = session;
            var actor = new Actor(play);
            director.on(session+'start',function(){
                actor.perform();
            })
        })

        currentSession = 0;

        t=setInterval(function(){
           director.trigger(currentSession+'start');
           if (currentSession === PlayCount) {
                currentSession = 0;
            }else{
                currentSession++;
            }

        },CheckTime);
    }
     startMove();

    $('#viewDetail').on('click',function(){
        BP.send({event_id:'B804W012',name:'查看领取明细',url:SendUrl,cook_id:'',user_id: userId,sent_item_count:'',receive_item_count:'',received_item_count:''});
        location.href = mypacksUrl;
    })
    
})


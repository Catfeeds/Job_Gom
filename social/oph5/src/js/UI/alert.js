define("UI/alert",function(require,exports,module) {
	var $ = require('vendors/zepto');
	var base64 = require('utils/base64');
	module.exports = {
		self:this,
		alerter:function(str,btn,callback){
		    if(str=='用户未登录'){
                this.alertBox('账号已在其他设备登录','提示',function(){
                    var str=base64.encode(location.href);
                    location.assign('/login/index?redirect='+str);
                },'去登录','知道了',true,function(){
                    location.reload();
                });
                return false;
            }
		    var div = document.querySelector('.xin-mask');
		    btn=btn?btn:'确定';
		    if(div){
		        return false;
		    }
		    var cover_bg = document.createElement('div');
		    cover_bg.innerHTML = '<div class="xin-dialog xin-dialog-tip"><h3 class="xin-dialog-title">'+str+'</h3><div class="xin-dialog-btns"><a class="xin-btn-strech" id="remove_bg" href="javascript:void(0);">确定</a></div></div>';
		    cover_bg.className = 'xin-mask cover_bg';
		    if($('.xin-mask').length==0){
		        document.body.appendChild(cover_bg);
		    }
		    $('#remove_bg').on('click',function(){
		        document.body.removeChild(cover_bg);
		        callback&&callback();
		    });
		},
		alertBox:function(text,title,callBack,btn,btn1,flog,cancelCallback){
		    if(text=='用户未登录'){
		        this.alertBox('账号已在其他设备登录','提示',function(){
                    var str=base64.encode(location.href);
                    location.assign('/login/index?redirect='+str);
		        },'去登录','知道了',true,function(){
					location.reload();
				});
		        return false;
		    }
		    var str="";
		    title=title?title:"提示";
		    text=text?text:"确定下架吗？";
		    btn=btn?btn:"确定";
		    btn1=btn1?btn1:"取消";
		    if(flog){
		        str="<div class='deleteBox' id='deleteBox'><h2>"+title+"</h2><div><p>"+text+"</p><button  class='cancel' id='confirm'>"+btn+"</button><button  class='confirm' id='cancel'>"+btn1+"</button></div></div>";
		    }else{
		        str="<div class='deleteBox' id='deleteBox'><h2>"+title+"</h2><div><p>"+text+"</p><button class='cancel' id='cancel'>"+btn1+"</button><button class='confirm' id='confirm'>"+btn+"</button></div></div>";
		    }
		    if($('#deleteBox').length===0){
		        $(str).appendTo($('body'));
		        $('<div class="mark" id="mark"></div>').appendTo($('body'));
		    }
		    var h=$('#deleteBox').height();
		    $('#deleteBox').css('margin-top',-h/2);
		    $('#cancel').on("click",function(e){
		        e.stopPropagation();
		        $('#mark').remove();
		        $('#deleteBox').remove();
				cancelCallback && cancelCallback();
		    }),
		    $('#confirm').on("click",function(e) {
		        e.stopPropagation();
		        $('#mark').remove();
		        $('#deleteBox').remove();
		        callBack();
		    });
		},
       carAlertBox:function(num,callBack){
           var text='您确定要删除这'+num+'个宝贝?';
           this.alertBox(text,'提示',callBack);
       },
       OrderAlertBox:function(text,text2,title,callBack){
           var str = "";
           var title = title ? title : "提示";
           var text = text ? text : "确定下架吗？";
           str = "<div class='deleteBox' id='deleteBox'>" +
               "<h2>" + title + "</h2>" +
               "<div>" +
               "<div class='t_wrap'>" +
               "<p>" + text + "</p>" +
               "</div>" +
               "<button class='cancel' id='cancel'>取消</button>" +
               "<button class='confirm' id='confirm'>确定</button>" +
               "</div>" +
               "</div>";
           if ($('#deleteBox').length === 0) {
               $(str).appendTo($('body'));
               $('<div class="mark" id="mark"></div>').appendTo($('body'));
           }
           var h = $('#deleteBox').height();
           $('#deleteBox').css('margin-top', -h / 2);
           $('#cancel').bind("click", function (e) {
               e.stopPropagation();
               $('#mark').remove();
               $('#deleteBox').remove();
           });
           $('#confirm').bind("click", function (e) {
               e.stopPropagation();
               $('#mark').remove();
               $('#deleteBox').remove();
               callBack && callBack();
           });
       },
		alertr1:function(str,btn,callback){
			var that = this;
		    var div = document.querySelector('.mark_content');
		    if(div){
		        return false;
		    }
		    var cover_bg = document.createElement('div');
		    cover_bg.innerHTML='<p><span>'+str+'</span></p>'+
		    '<div class="g_adput clearfix"><div class="g_adput1 clearfix">'+
		    '<div></div>'+
		    '<div></div>'+
		    '<div></div>'+
		    '<div></div>'+
		    '<div></div>'+
		    '<div></div></div>'+
		    '<input type="tel" id="password2" maxlength="6" autocomplete="off"  pattern="\d*" />'+
		    '<input type="hidden" id="j_hidden">'+
		    '</div><p class="mark_content_btn clearfix"><button id="btnCel">取消</button><button id="btnSub">'+btn+'</button></p>';
		    cover_bg.className = 'mark_content';
		    if($('.xin-mask').length==0){
		        document.body.appendChild(cover_bg);
		        $("#cover_bj").show();
		        $("#password2").focus();
		    }
		    var isInputEvent = "oninput" in document ? true : false;
		    var inputEvent = isInputEvent ? "input" : 'keyup';
		    var pwd = $('#password2');
		    var encryptpwd = $('#j_hidden');
		    var isPaste = false;
		    pwd.on('paste',function(e){
		        isPaste = true;
		    });
		    var clean = function () {
		        pwd.val('');
		        encryptpwd.val('');
		        $(".g_adput1").find('div').html("");
		    }
		    encryptpwd.val('');
		    var isInputEvent = "oninput" in document ? true : false;
		    var inputEvent = isInputEvent ? "input" : 'keyup';
		    pwd.on(inputEvent, function(e) {
		        var el = e.target;
		        if (isPaste) clean();
		        isPaste = false;
		        var currentPW =  el.value.split('*').slice(-1).toString();
		        var encryptPW =  encryptpwd[0].value;
		        $(".g_adput1 div").eq($(el).val().length).html("");
		        //删除（触发input事件，未获取删除keycode）
		        if(currentPW.length === 0) {
		            encryptpwd[0].value = encryptpwd[0].value.split(',').slice(0, el.value.length).toString();
		        } else {
		            //新增
		            for (var i=0;i < currentPW.length;i++) {
		                var outkey =currentPW[i];
		                if(encryptpwd.val() === ''){
		                    encryptpwd.val(outkey);
		                } else {
		                    encryptpwd[0].value +=outkey;
		                }
		            }
		            el.value = el.value.replace(/\S/g,"*")
		            $(".g_adput1 div").eq($(el).val().length-1).html("*");
		        }
		    });
		    $('#btnCel').on('click',function(){
		        document.body.removeChild(cover_bg);
		        $("#cover_bj").hide();
                $(".submitOrder").removeAttr('disabled');
		    });
		    $("#btnSub").on('click',function(){
		        if($("#password2").val().length==6){
		            callback();
		            document.body.removeChild(cover_bg);
		            $("#cover_bj").hide();
		        }else{
		            that.alerter("请输入密码！");
		        }
		    });
		},
		alertSecond:function(str,time){
		    this.remliste();
		    var div = document.createElement('div');
		    div.innerHTML = str;
           time=time?time:1500;
		    div.id = 'alertSecond';
		    if($('#alertSecond').length==0){
		        document.body.appendChild(div);
		    }
		    setTimeout(function(){
		        if(div){
					try{
		            	document.body.removeChild(div);
					}catch(e){}
		        }
		    },time);
		},
		//提示2
		alertSecond2:function(str,element,str2){
		    var div = document.createElement('div');
		    div.innerHTML = str;
		    div.id = 'alertSecond2';
		    this.remliste();
		    if($('#alertSecond2').length==0){
		        document.body.appendChild(div);
		    }
		    setTimeout(function(){
		        if(div){
		            document.body.removeChild(div);
		            if(element){
		                if(str2!="true"){
		                    element.hide();
		                }
		            }
		        }
		    },1000);
		},
		//取消禁止滚动
		remliste:function() {
		    window.removeEventListener('touchmove', this.move);
		    window.onmousewheel=function(){return true};//禁止鼠标滚轴滚动
		},
		//禁止滚动
		addliste:function() {
		    window.addEventListener('touchmove', this.move);
		    window.onmousewheel=function(){return false};//禁止鼠标滚轴滚动
		},
		move:function(e) {
		    e.preventDefault && e.preventDefault();
		    e.returnValue = false;
		    e.stopPropagation && e.stopPropagation();
		    return false;
		}
	}
});
webpackJsonp([4],{"10":function(e,exports,i){"use strict";var a={"tel":{"ept":"请填写11位手机号","err":"手机号格式错误","errBack":"该手机号已被注册"},"msgCode":{"tipGet":"请获取短信验证码","tipEpt":"请输入短信验证码","tipErr":"验证码是6位数字,请重新输入","tipErrEdit":"验证码错误","tipWrong":"验证码有误,请重新输入","checkCodeWrong":"验证码输入错误,请重新输入","send":"验证码已发送，请注意查收","tipSend":"验证码已发送您的手机，10分钟内输入有效","tipDisabled":"验证码再次获取需间隔60s","tipLimitEdit":"获取验证码超限，请稍后再试","btnAfterSend":"秒后重新获取","btnDefault":"获取验证码"},"pwd":{"commonTip":"请输入6-20位英文字母,数字或符号"},"pwdV":{"ept":"请再次输入密码","err":"两次输入的密码不一致"},"nickName":{"eptName":"请输入昵称！","commonTip":"昵称只能输入2-20位字符、字母、数字、-、_","existName":"此昵称太受欢迎了，已经有人抢了~","sucSub":"资料修改成功！","errLine":"网络超时!","wrongName":"此昵称含有敏感词,请重新输入"},"birthTip":{"tip":"生日不能重复设置"},"refCode":{"err":"推荐码错误"},"imgCode":{"ept":"请输入验证码","err":"验证码输入错误，请重新输入"},"login":{"errCode":"请输入验证码","errNum":"请输入账号","errPwd":"请输入密码","agreement":"请同意协议并勾选"},"createCircle":{"typeEmpty":"请选择圈子分类","nameEmpty":"圈子名称不能为空","upperLimit":"抱歉，您创建的圈子已经达到上限，暂不能创建！"},"circle":{"login":"登录成功！","unJoin":"需要先加入该圈子才能发布话题","cannotJoin":"抱歉！该圈子不允许发布话题!","review":"加入圈子审核中，请耐心等待!","joinSuccess":"恭喜您已经加入圈子！","joinSuccessPublic":"恭喜您已经加入圈子，快来发布话题吧！","cannotJoinCircle":"抱歉！该圈子不允许任何人加入！","exit":"您已经退出该圈子！","dissolved":"抱歉！该圈子已被解散"},"qrCodeTip":{"loseEffTip":"二维码已失效","loseEffBtn":"点击刷新","failGetTip":"二维码生成失败","failGetBtn":"重新生成"},"masterApply":{"nameLength":"姓名要2-20个字符","nameType":"姓名仅限汉字和字母","isIdCard":"请填写18位有效身份证号","type":"请选择达人类别","summary":"请输入自我介绍，2-100个字符"},"upload":{"noUpload":"请上传图片","uploadError":"请上传小于2M的图片，支持格式jpg、jpeg、png、gif！","uploadFaild":"上传失败,请重新上传","uploadError_Master":"请上传小于2M的图片，支持格式jpg、jpeg、png、gif!","Q_EXCEED_NUM_LIMIT":"请上传小于2M的图片，支持格式jpg、jpeg、png、gif！","Q_EXCEED_SIZE_LIMIT":"总文件大小超出限制","Q_TYPE_DENIED":"文件类型错误","F_EXCEED_SIZE":"请上传jpg、png格式且小于2M的图片！","excess":"文件个数超出限制"},"errLine":{"tip":"网络错误,请稍后再试！"}};e.exports=a},"11":function(e,exports,i){"use strict";(function($){var a=i(6),n=function(){},t=function(e,i){var t={"fixed":!0,"modal":!0,"content":'<p class="del-pop-p">'+e+"</p>","className":"pop-box","okCls":"pc-btn pc-btnh35 circle-pop-btn","ok":n,"cancel":n,"btnWrapCls":"two-buttons"};$.extend(!0,t,i);var c=a(t);return c.show(),c};e.exports=t}).call(exports,i(0))},"16":function(e,exports,i){"use strict";var a=function(e){return null==e?0:("string"!=typeof e&&(e+=""),e.replace(/[^\x00-\xff]/g,"01").length)};e.exports=a},"17":function(e,exports,i){"use strict";(function($){var a,n,t=i(18),c=i(20),r=i(21),o={},l=function(e){for(var i=e.length,a=Math.ceil(i/24),n=[],t=0;t<a;t++){n[t]=[];var c=24*(t+1);c=c>i?i:c;for(var r=24*t;r<c;r++){var l=e[r];n[t].push(l),o[l.name]=l.url}}return{"page":new Array(a),"list":n}},s=function(e,i){d(0),$("[data-node=faceBox]").css({"left":e+"px","top":i+"px"}).show()},u=function(){$("[data-node=faceBox]").hide()},d=function(e){e=e||0,$("[data-action=facePage] > li").eq(e).addClass("active").siblings("li").removeClass("active"),$("[data-node=faceList] > div").eq(e).removeClass("hide").siblings("div").addClass("hide")},p=function(e,i){$("body").on("click","[data-face]",function(t){t.preventDefault(),t.stopPropagation(),a=$(this).data("face"),n=$(this).attr("src"),e({"reg":a,"url":n}),!1!==i&&$("[data-node=faceBox]").hide()})},m=function(e){var i=l(t),a=r(i);$("body").append(a),e()},f=function(){$("body").on("click","[data-node=faceBox]",function(e){e.stopPropagation()}),$(document).on("click",function(){$("[data-node=faceBox]").hide()}),$("[data-node=faceBox]").on("mouseenter","[data-action=facePage] > li",function(){var e=$(this).index();d(e)})},h=function(e){var i=/(\[([\s\S]+?)\])/g;return $.isEmptyObject(o)&&l(t),e.replace(i,function(e,i,a){var n=o[a];if(n)return'<img width="22" height="22" src="'+n+'" />';var t=c[a];return t?'<img width="22" height="22" src="'+t.url+'" />':e})},g=function(){m(f)};e.exports={"init":g,"insert":p,"show":s,"hide":u,"parseEmoji":h}}).call(exports,i(0))},"18":function(e,exports,i){"use strict";(function(i){var a=i.imgpath+"/images/emoji/",n=[{"name":"微笑","url":"weixiao"},{"name":"色","url":"se"},{"name":"亲亲","url":"qinqin"},{"name":"得意","url":"deyi"},{"name":"流泪","url":"liulei"},{"name":"害羞","url":"haixiu"},{"name":"闭嘴","url":"bizui"},{"name":"鼓掌","url":"guzhang"},{"name":"大哭","url":"daku"},{"name":"尴尬","url":"ganga"},{"name":"生气","url":"shengqi"},{"name":"调皮","url":"tiaopi"},{"name":"呲牙","url":"ciya"},{"name":"惊讶","url":"jingya"},{"name":"委屈","url":"weiqu"},{"name":"吐血","url":"tuxue"},{"name":"冷汗","url":"lenghan"},{"name":"抓狂","url":"zhuakuang"},{"name":"难过","url":"nanguo"},{"name":"偷笑","url":"touxiao"},{"name":"白眼","url":"baiyan"},{"name":"不屑","url":"buxie"},{"name":"快哭了","url":"kuaikule"}],t=[{"name":"困","url":"kun"},{"name":"装酷","url":"zhuangku"},{"name":"大笑","url":"daxiao"},{"name":"偷瞄","url":"toumiao"},{"name":"奋斗","url":"fendou"},{"name":"咒骂","url":"zhouma"},{"name":"疑问","url":"yiwen"},{"name":"晕","url":"yun"},{"name":"捶打","url":"chuida"},{"name":"再见","url":"zaijian"},{"name":"抠鼻","url":"koubi"},{"name":"发呆","url":"fadai"},{"name":"坏笑","url":"huaixiao"},{"name":"哈欠","url":"haqian"},{"name":"鄙视","url":"bishi"},{"name":"睡觉","url":"shuijiao"},{"name":"饿","url":"e"},{"name":"阴险","url":"yinxian"},{"name":"难受","url":"nanshou"},{"name":"可怜","url":"kelian"},{"name":"撇嘴","url":"piezui"},{"name":"石化","url":"shihua"},{"name":"泪眼","url":"leiyan"}],c=[{"name":"嘘","url":"xu"},{"name":"哼哼","url":"hengheng"},{"name":"爱慕","url":"aimu"},{"name":"财迷","url":"caimi"},{"name":"耶","url":"ye"},{"name":"思考","url":"sikao"},{"name":"骷髅","url":"kulou"},{"name":"痛哭","url":"tongku"},{"name":"恭喜","url":"gongxi"},{"name":"捂脸","url":"wulian"},{"name":"嘿哈","url":"heiha"},{"name":"机智","url":"jizhi"},{"name":"皱眉","url":"zhoumei"},{"name":"安慰","url":"anwei"},{"name":"飞吻","url":"feiwen"},{"name":"奸笑","url":"jianxiao"},{"name":"猪头","url":"zhutou"},{"name":"玫瑰","url":"meigui"},{"name":"凋谢","url":"diaoxie"},{"name":"爱心","url":"aixin"},{"name":"心碎","url":"xinsui"},{"name":"蛋糕","url":"dangao"},{"name":"喝水","url":"heshui"}],r=[{"name":"西瓜","url":"xigua"},{"name":"咖啡","url":"kafei"},{"name":"啤酒","url":"pijiu"},{"name":"包包","url":"baobao"},{"name":"高跟鞋","url":"gaogenxie"},{"name":"帽子","url":"maozi"},{"name":"口红","url":"kouhong"},{"name":"裙子","url":"qunzi"},{"name":"T恤","url":"txu"},{"name":"裤子","url":"kuzi"},{"name":"眼镜","url":"yanjing"},{"name":"太阳镜","url":"taiyangjing"},{"name":"蜡烛","url":"lazhu"},{"name":"礼物","url":"liwu"},{"name":"红包","url":"hongbao"},{"name":"拥抱","url":"yongbao"},{"name":"太阳","url":"taiyang"},{"name":"月亮","url":"yueliang"},{"name":"便便","url":"bianbian"},{"name":"炸弹","url":"zhadan"},{"name":"菜刀","url":"caidao"},{"name":"握手","url":"woshou"},{"name":"胜利","url":"shengli"}],o=[{"name":"赞","url":"zan"},{"name":"OK","url":"ok"},{"name":"勾引","url":"gouyin"},{"name":"NO","url":"no"},{"name":"打脸","url":"dalian"},{"name":"抱拳","url":"baoquan"},{"name":"乒乓球","url":"pingpangqiu"},{"name":"足球","url":"zuqiu"},{"name":"篮球","url":"lanqiu"}];e.exports=function(e){for(var i=0,n=e.length;i<n;i++){var t=e[i];t.url=a+t.url+".png"}return e}(n.concat(t,c,r,o))}).call(exports,i(1))},"19":function(e,exports,i){"use strict";function a(e){return e>=55296&&e<=56319}function n(e){return e>=56320&&e<=57343}function t(e,i){if("string"!=typeof e)throw new Error("Input must be string");for(var t,r,o=e.length,l=0,s=0;s<o;s+=1){if(t=e.charCodeAt(s),r=e[s],a(t)&&n(e.charCodeAt(s+1))&&(s+=1,r+=e[s]),(l+=c(r))===i)return e.slice(0,s+1);if(l>i)return e.slice(0,s-r.length+1)}return e}var c=i(16);e.exports=t},"20":function(e,exports,i){"use strict";(function(i){var a=i.imgpath+"/images/emoji/",n=".png",t={"亲":{"name":"亲亲","url":a+"qinqin"+n},"愤怒":{"name":"生气","url":a+"shengqi"+n},"惊恐":{"name":"惊讶","url":a+"jingya"+n},"迷茫":{"name":"委屈","url":a+"weiqu"+n},"伤心":{"name":"难过","url":a+"nanguo"+n},"努力":{"name":"奋斗","url":a+"fendou"+n},"YY":{"name":" 坏笑","url":a+"huaixiao"+n},"恶心":{"name":"难受","url":a+"nanshou"+n}};e.exports=t}).call(exports,i(1))},"21":function(e,exports,i){var a=i(3);e.exports=a("src/js/module/popup/face/face",function(e,i){"use strict";var a=this,n=(a.$helpers,a.$each),t=e.list,c=(e.v,e.i,e.face,e.$index,a.$escape),r=e.page,o="";return o+='<div data-node="faceBox" class="imoj-box" style="position: absolute;z-index: 9999;display:none"> <em class="sanjiao"></em> <div data-node="faceList" class="imoj-list"> ',n(t,function(e,i){o+=' <div class="imoj-content clearfix ',i&&(o+="hide"),o+='"> ',n(e,function(e,i){o+=' <a href="javascript:;"> <img width="22" height="22" data-face="[',o+=c(e.name),o+=']" src="',o+=c(e.url),o+='" alt="',o+=c(e.name),o+='" title="',o+=c(e.name),o+='"> </a> '}),o+=" </div> "}),o+=' </div> <ul data-action="facePage" class="pagination"> ',n(r,function(e,i){o+=" <li ",0==i&&(o+='class="active"'),o+=">",o+=c(i+1),o+="</li> "}),o+=" </ul> </div>",new String(o)})},"22":function(e,exports,i){"use strict";var a=function(e,i){return e?e.replace(i||/[&<">'](?:(amp|lt|ldquo|rdquo|quot|gt|#39|nbsp|#\d+);)?/g,function(e,i){return i?e:{"<":"&lt;","&":"&amp;",'"':"&quot;","“":"&ldquo;","”":"&rdquo;",">":"&gt;","'":"&#39;"}[e]}):""};e.exports=a},"3":function(e,exports){!function(){function i(e,i){return(/string|function/.test(typeof i)?l:o)(e,i)}function a(e,i){return"string"!=typeof e&&(i=typeof e,"number"===i?e+="":e="function"===i?a(e.call(e)):""),e}function n(e){return p[e]}function t(e){return a(e).replace(/&(?![\w#]+;)|[<>"']/g,n)}function c(e,i){if(m(e))for(var a=0,n=e.length;n>a;a++)i.call(e,e[a],a,e);else for(a in e)i.call(e,e[a],a)}function r(e,i){var a=/(\/)[^\/]+\1\.\.\1/,n=("./"+e).replace(/[^\/]+$/,""),t=n+i;for(t=t.replace(/\/\.\//g,"/");t.match(a);)t=t.replace(a,"/");return t}function o(e,a){var n=i.get(e)||s({"filename":e,"name":"Render Error","message":"Template not found"});return a?n(a):n}function l(e,i){if("string"==typeof i){var a=i;i=function(){return new d(a)}}var n=u[e]=function(a){try{return new i(a,e)+""}catch(e){return s(e)()}};return n.prototype=i.prototype=f,n.toString=function(){return i+""},n}function s(e){var i="{Template Error}",a=e.stack||"";if(a)a=a.split("\n").slice(0,2).join("\n");else for(var n in e)a+="<"+n+">\n"+e[n]+"\n\n";return function(){return"object"==typeof console&&console.error(i+"\n\n"+a),i}}var u=i.cache={},d=this.String,p={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},m=Array.isArray||function(e){return"[object Array]"==={}.toString.call(e)},f=i.utils={"$helpers":{},"$include":function(e,i,a){return e=r(a,e),o(e,i)},"$string":a,"$escape":t,"$each":c},h=i.helpers=f.$helpers;i.get=function(e){return u[e.replace(/^\.\//,"")]},i.helper=function(e,i){h[e]=i},e.exports=i}()},"31":function(e,exports,i){"use strict";(function($){var a=i(2),n=i(5),t=i(32),c=i(9),r={"qq":"http://connect.qq.com/widget/shareqq/index.html","wb":"http://v.t.sina.com.cn/share/share.php","qz":"http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey"},o={"url":"https://group.gomeplus.com/","title":"国美APP边玩边分享，购物不孤单","pic":"../../images/public/logo.png","summary":"国美APP边玩边分享，购物不孤单"},l=function(e){window.open(e)},s=!1,u=function(){$("body").append('<p data-node="shareBtnBox" class="share-down" style="z-index:21;"><span class="share-box"><span class="icon icon-up-arrow"></span><span class="icon-box"><em data-shareto="weixin" class="iconn-30"></em><em data-shareto="qq" class="iconn-32"></em><em data-shareto="sina" class="iconn-31"></em><em data-shareto="qzone" class="iconn-33"></em></span></span></p>'),s=!0},d=function(e){!s&&u(),$("[data-node=shareBtnBox]").css({"left":e.x,"top":e.y}).show()},p=!1,m=function(){$("body").append('<div class="share-weixin"><div class="wx-mask"></div><div class="wx-main"><div class="wx-code"><span></span><img data-node="shareWeixinCode" alt="分享到微信" /></div><p>打开微信扫一扫，即可分享</p><a href="javascript:;" title="点击关闭" class="wx-close">×</a></div></div>'),p=!0},f=function(e,i){var a=[],n={"url":e.url,"title":e.title,"summary":e.summary,"site":e.site};e.kid&&(n.url=e.url+"?kid="+e.kid);for(var t in n)a.push(t+"="+encodeURIComponent(n[t]||""));return i?a.push("pics="+e.pic):a.push("pic="+e.pic),a.join("&")},h={"weixin":function(e){var i=t(e.url);!p&&m(),$("[data-node=shareWeixinCode]")[0].src=i,$(".share-weixin").show(),$(".wx-close").on("click",function(){$(".share-weixin").hide()})},"qq":function(e){var i=r.qq+"?"+f(e,!0);l(i)},"wb":function(e){var i=r.wb+"?"+f(e);l(i)},"qz":function(e){var i=r.qz+"?"+f(e,!0);l(i)}},g=function(e){var i="0"!==e.isRebate;a.get(n.get("shareGetGoodsKid"),{"validate":i,"data":{"skuId":e.skuId,"itemId":e.itemId,"parentKid":e.parentKid},"async":!1}).done(function(i){if(!0===i.success){var a=i.data.kid,n=e.shareInfo,t=n.url,c=t.indexOf("?");c>0&&(t=t.substring(0,c)),n.url=t+"?onlineUserId="+n.onlineUserId+"&kId="+a,h[e.shareto](n)}else h[e.shareto](e.shareInfo)}).fail(function(){i?c()&&h[e.shareto](e.shareInfo):h[e.shareto](e.shareInfo)})},v=function(e){var i={"title":e.title||o.title,"url":e.url||o.url,"pic":e.pic||o.pic,"summary":e.summary||"","desc":e.desc||""};!!h[e.type]&&h[e.type](i)},w=function(e,i,a){var n=null,t=null;t="string"==typeof e?$(e):e,i=i||"[data-action=shareto]",t.on("mouseenter",i,function(){var e=$(this).data("surl"),i=$(this).data("stitle"),a=$(this).data("spic");n={"url":e,"title":i,"pic":a};var t=$(this).width(),c=$(this).height(),r=$(this).offset().left/1+t/2-80+"px",o=$(this).offset().top/1+(c-1)+"px";return d({"x":r,"y":o}),!1}),t.on("mouseleave",i,function(){return $("[data-node=shareBtnBox]").hide(),!1}),$("body").on("click","[data-shareto]",function(e){e.preventDefault();var i=$(this).data("shareto");n.type=i,a=a||function(){},a.call(null,n),v(n)}),$("body").on("mouseenter","[data-node=shareBtnBox]",function(){$(this).show()}),$("body").on("mouseleave","[data-node=shareBtnBox]",function(){$(this).hide()})};e.exports={"share":v,"shareto":h,"shareItem":w,"shareWithKid":g}}).call(exports,i(0))},"32":function(e,exports,i){"use strict";(function(i){var a=function(e){return i.group_domain+"ajax/qrcode/urlcode?url="+encodeURIComponent(e)};e.exports=a}).call(exports,i(1))},"4":function(e,exports,i){"use strict";(function($){var a=i(6),n=function(){},t=function(e,i){e=e||"",i=i||{};var t={"fixed":!0,"modal":!0,"autofocus":!1,"content":'<p class="del-pop-p">'+e+"</p>","className":"pop-box","okCls":"pc-btn pc-btnh35 circle-pop-btn","ok":n};$.extend(!0,t,i);var c=a(t),r=c._$("header"),o=c._$("title");return i.title||o.css("borderBottom","none"),r.show(),c.show(),c};e.exports=t}).call(exports,i(0))},"41":function(e,exports,i){"use strict";var a=i(3),n=i(19),t=i(16),c=i(22),r=i(17),o=function(e,i){var a,o=t(e);return a=o>i?n(e,i)+"...":e,r.parseEmoji(c(a))};e.exports=function(){a.helper("truncateByteLen",o)}},"418":function(e,exports,i){"use strict";var a=i(419),n=i(77),t=i(420),c=i(421),r=i(422);i(61)(),i(70)(),i(25).setPageData("group"),a.init(),n.init(),t.init(),c.init(),r.init()},"419":function(e,exports,i){"use strict";(function($,a){var n=i(69),t=i(15),c=i(4),r=(i(11),i(10).circle),o=function(){function e(){a.islogin="1",window.location.href=window.location.href}function i(e){l=$("[data-action=joinGroup]").attr("data-membertype"),"1"==l?"2"==a.approval_type?c(r.cannotJoin):c(r.unJoin,{"okValue":"加入圈子","ok":function(){$("[data-action=joinGroup]").click()}}):"2"==l?c(r.review):"1000"==$GLOBAL_CONFIG.member_type?c("该圈子人数已达上限，稍后再尝试"):"2"==$GLOBAL_CONFIG.member_type?c("抱歉，该圈子在审核中"):window.open(a.group_domain+JSON.parse($(e).attr("bp-data")).publish_url)}var o=$("[data-node=postTopic]"),l=$GLOBAL_CONFIG.member_type;$("[data-action=joinCircle]").each(function(){0==$(this).attr("data-membertype")&&$(this).removeAttr("data-action")}),$("[data-action=joinGroup]").on("click",{"done":function(e,i){"join"==e?i.attr("data-membertype",0):"exit"==e?i.attr("data-membertype",1):"limit"==e&&i.removeClass("c-t-l-join").addClass("c-t-l-limit")},"word":{"join":"加入圈子","focus":"退出圈子"}},n),$("[data-action=joinCircle]").on("click",{"done":function(e,i){"join"==e?(i.attr("data-membertype",0),i.removeAttr("data-action"),i.off("click"),i.addClass("circle-s-l-c-button-joined"),i.attr("href",i.attr("data-href"))):"joined"==e?i.addClass("circle-s-l-c-button-joined"):"joining"==e?(i.removeClass("circle-s-l-c-button-joined"),i.html("审核中")):"exit"==e&&(i.attr("data-membertype",1),i.removeClass("circle-s-l-c-button-joined"))},"word":{"join":"+ 加入圈子","focus":"&radic; 已加入"}},n),o.on("click",function(){var n=this;if("0"==a.islogin)return t(e),!1;i(n)})};e.exports={"init":o}}).call(exports,i(0),i(1))},"420":function(e,exports,i){"use strict";(function(a,$){var n=i(31).shareto,t=i(72),c=a.group_id,r=function(){function e(e){var i=/\w+\.(jpg|gif|bmp|png)$/;return e==a.imgpath+"/images/public/circle-default.png"&&(e=!1),i.test(e)}var i=$("body"),r=$("[data-node=groupPic]").attr("src"),o=function(){return{"url":location.href,"title":$("[data-node=groupName]").html(),"pic":e(r)?r:a.imgpath+"/images/public/logo.jpg","summary":"这儿有我们志趣相投的小伙伴，快加入我们吧！","site":"国美"}},l=function(e){return function(){var i=o();return n[e](i),t({"page":"qz","shareTo":e,"shareId":c}),!1}};i.on("click","[data-node=wx]",function(){n.weixin({"url":"https://circle.m.gomeplus.com/circle-"+c+".html"}),t({"page":"qz","shareTo":"wx","shareId":c})}),i.on("click","[data-node=wb]",l("wb")),i.on("click","[data-node=qq]",l("qq")),i.on("click","[data-node=qzone]",l("qz"))};e.exports={"init":r}}).call(exports,i(1),i(0))},"421":function(e,exports,i){"use strict";(function($){var i=function(){var e={"sameClassChange":{"ele":".circle-s-t-change","num":0},"groupList":"[data-node=groupList]","hotTopicChange":{"ele":".circle-t-t-change","num":0},"topicsList":"[data-node=topicsList]"},i=function(e){return function(i){$(e.ele).on("click",function(){e.num<$(i).length-1?e.num++:e.num=0,$(i).each(function(a,n){e.num==a&&$(n).show().siblings(i).hide()})})}};i(e.sameClassChange)(e.groupList),i(e.hotTopicChange)(e.topicsList)};e.exports={"init":i}}).call(exports,i(0))},"422":function(e,exports,i){"use strict";(function($){var a=i(2),n=i(5);i(41)(),i(61)();var t=i(423),c={"tabData":{},"data":{"gid":$(".circle-l-l-tab").attr("data-gid")},"requestType":function(){$(".circle-l-l-t-topic").find("a").on("click",function(e){e.preventDefault(),$(this).parent().addClass("tabtopic-active").siblings().removeClass("tabtopic-active"),c.tabData[$(this).attr("data-type")]?c.changeTab($(this).attr("data-type"),c.tabData):c.changeTab($(this).attr("data-type"))})},"changeTab":function(e,i){i?($("[data-node=content]").html(t({"data":i[e],"type":e,"domain":$GLOBAL_CONFIG.group_domain})),$(".page").html(""),i[e].data.link_url&&$(".page").html(i[e].data.link_url)):a.get(n.get("moreTopics"),{"data":{"gid":c.data.gid,"type":e}}).done(function(i){i&&i.success&&(c.tabData[e]=i,$("[data-node=content]").html(t({"data":i,"type":e,"domain":$GLOBAL_CONFIG.group_domain})),$(".page").html(""),i.data.link_url&&$(".page").html(i.data.link_url))}).fail(function(){}).always(function(){})}};e.exports={"init":c.requestType}}).call(exports,i(0))},"423":function(e,exports,i){var a=i(3);e.exports=a("src/js/page/topics/topicList",function(e,i){"use strict";var a=this,n=a.$helpers,t=e.data,c=a.$each,r=(e.key,e.$index,a.$escape),o=e.domain,l=a.$string,s=(e.val,e.type),u="";return 0==t.data.topTopics.length&&0==t.data.topics.length||(u+=' <div class="circle-lists-cell"> <ul class="circle-l-c-wrap clearfix"> ',0!=t.data.topTopics.length&&(u+=" ",c(t.data.topTopics,function(e,i){u+=' <li class="circle-l-c-w-minute " modelid="PQZQBHTlt0002"> <div class="circle-l-c-w-m-wrap clearfix"> <div class="circle-l-c-w-m-user clearfix"> <a target="_blank" href="',u+=r(o),u+="ta/",u+=r(e.user.id),u+='.html"><img class="circle-l-c-w-m-u-icon" onerror="imgError(this, \'h\')" src="',u+=r(e.user.facePicUrl),u+='"></a> <a target="_blank" href="',u+=r(o),u+="ta/",u+=r(e.user.id),u+='.html"><span class="circle-l-c-w-m-u-name">',u+=r(e.user.nickname),u+='</span></a> </div> <div class="circle-l-c-w-m-title clearfix"> <span class="circle-l-c-w-m-titlewrap"> ',e.isUpper&&(u+=' <i class="circle-l-c-w-m-titletop">置顶</i> '),u+=" ",e.isEssence&&(u+=' <i class="circle-l-c-w-m-titlequality">精品</i> '),u+=" ","1"==e.style&&(u+=' <i class="circle-l-c-w-m-titleinterview">专访</i> '),u+=' </span> <a target="_blank" title="',u+=r(e.name),u+='" href="',u+=r(o),u+="topic/",u+=r(e.id),u+='.html"><h3>',u+=l(n.truncateByteLen(e.name,"78")),u+='</h3></a> </div> <div class="circle-l-c-w-m-paper"><p><a target="_blank" title="',u+=r(e.name),u+='" href="',u+=r(o),u+="topic/",u+=r(e.id),u+='.html">',u+=l(n.truncateByteLen(e.text,"150")),u+="</a></p></div> ",0!=e.images_lst.length&&(u+=' <div class="circle-l-c-w-m-imagepreview clearfix"> ',c(e.images_lst,function(i,a){u+=" ","image"==i.type&&(u+=' <a class="circle-l-c-w-m-imagepreviewhover" target="_blank" title="',u+=r(i.name),u+='" href="',u+=r(o),u+="topic/",u+=r(e.id),u+='.html"> <div class="circle-imagepreview-img"><img onerror="imgError(this, \'m\')" alt="',u+=r(i.name),u+='" src="',u+=r(i.mainImage),u+='"></div> </a> '),u+=" ","video"==i.type&&(u+=' <a class="circle-l-c-w-m-imagepreviewhover" target="_blank" title="',u+=r(i.name),u+='" href="',u+=r(o),u+="topic/",u+=r(e.id),u+='.html"> <div class="circle-imagepreview-img circle-imagepreview-play"><img src="',u+=r(i.mainImage),u+='" alt="',u+=r(i.name),u+='"> <div class="circle-i-p-icon"></div> </div></a> '),u+=" ","item"==i.type&&(u+=' <a class="circle-l-c-w-m-imagepreviewhover" target="_blank" href="',u+=r(o),u+="topic/",u+=r(e.id),u+='.html"> <div class="circle-imagepreview-goods"> <img onerror="imgError(this, \'m\')" alt="',u+=r(i.name),u+='" src="',u+=r(i.mainImage),u+='"> <div class="circle-i-goodsmask clearfix"> <div class="circle-i-g-price"><span class="circle-i-g-p-currency">￥</span><span class="circle-i-g-p-pricecount">',u+=r(null!==i.salePrice?i.salePrice:"暂无售价"),u+='</span></div> <div class="circle-i-g-icon"> <i class="circle-i-g-i-icon"></i> </div></div> <div class="circle-i-goodstitle"><span>',u+=r(i.name),u+="</span></div> </div> </a> "),u+=" "}),u+=" </div> "),u+=' <div class="circle-l-c-w-m-state clearfix"> <div class="circle-l-c-w-m-s-left"><em class="iconn-75"></em><span class="circle-l-c-w-m-s-l-timedate">',u+=r(e.time_str),u+='更新</span></div> <div class="circle-l-c-w-m-s-right"> <ul class="circle-l-c-w-m-s-r-tool"> <li><em class="icon iconn-10"></em><span class="circle-l-c-w-m-s-r-islikecount">',u+=r(e.like.userQuantity),u+='</span></li> <li><em class="icon iconn-11"></em><span class="circle-l-c-w-m-s-r-iscommetcount">',u+=r(e.replyQuantity),u+='</span></li> <li><em class="icon iconn-57"></em><span class="circle-l-c-w-m-s-r-isstarcount">',u+=r(e.topicCollectionQuantity),u+="</span></li> </ul> </div> </div> </div> </li> "}),u+=" "),u+=" ",0!=t.data.topics.length&&(u+=" ",c(t.data.topics,function(e,i){u+=' <li class="circle-l-c-w-minute " modelid="PQZQBHTlt0002"> <div class="circle-l-c-w-m-wrap clearfix"> <div class="circle-l-c-w-m-user clearfix"> <a target="_blank" href="',u+=r(o),u+="ta/",u+=r(e.user.id),u+='.html"><img class="circle-l-c-w-m-u-icon" onerror="imgError(this, \'h\')" src="',u+=r(e.user.facePicUrl),u+='"></a> <a target="_blank" href="',u+=r(o),u+="ta/",u+=r(e.user.id),u+='.html"><span class="circle-l-c-w-m-u-name">',u+=r(e.user.nickname),u+='</span></a> </div> <div class="circle-l-c-w-m-title clearfix"> <span class="circle-l-c-w-m-titlewrap"> ',e.isUpper&&(u+=' <i class="circle-l-c-w-m-titletop">置顶</i> '),u+=" ",e.isEssence&&(u+=' <i class="circle-l-c-w-m-titlequality">精品</i> '),u+=" ","1"==e.style&&(u+=' <i class="circle-l-c-w-m-titleinterview">专访</i> '),u+=' </span> <a target="_blank" title="',u+=r(e.name),u+='" href="',u+=r(o),u+="topic/",u+=r(e.id),u+='.html"><h3>',u+=l(n.truncateByteLen(e.name,"78")),u+='</h3></a> </div> <div class="circle-l-c-w-m-paper"><p><a target="_blank" title="',u+=r(e.name),u+='" href="',u+=r(o),u+="topic/",u+=r(e.id),u+='.html">',u+=l(n.truncateByteLen(e.text,"150")),u+="</a></p></div> ",0!=e.images_lst.length&&(u+=' <div class="circle-l-c-w-m-imagepreview clearfix"> ',c(e.images_lst,function(i,a){u+=" ","image"==i.type&&(u+=' <a class="circle-l-c-w-m-imagepreviewhover" target="_blank" title="',u+=r(i.name),u+='" href="',u+=r(o),u+="topic/",u+=r(e.id),u+='.html"> <div class="circle-imagepreview-img"><img onerror="imgError(this, \'m\')" alt="',u+=r(i.name),u+='" src="',u+=r(i.mainImage),u+='"></div> </a> '),u+=" ","video"==i.type&&(u+=' <a class="circle-l-c-w-m-imagepreviewhover" target="_blank" title="',u+=r(i.name),u+='" href="',u+=r(o),u+="topic/",u+=r(e.id),u+='.html"> <div class="circle-imagepreview-img circle-imagepreview-play"><img src="',u+=r(i.mainImage),u+='" alt="',u+=r(i.name),u+='"> <div class="circle-i-p-icon"></div> </div></a> '),u+=" ","item"==i.type&&(u+=' <a class="circle-l-c-w-m-imagepreviewhover" target="_blank" href="',u+=r(o),u+="topic/",u+=r(e.id),u+='.html"> <div class="circle-imagepreview-goods"> <img onerror="imgError(this, \'m\')" alt="',u+=r(i.name),u+='" src="',u+=r(i.mainImage),u+='"> <div class="circle-i-goodsmask clearfix"> <div class="circle-i-g-price"><span class="circle-i-g-p-currency">￥</span><span class="circle-i-g-p-pricecount">',u+=r(null!==i.salePrice?i.salePrice:"暂无售价"),u+='</span></div> <div class="circle-i-g-icon"> <i class="circle-i-g-i-icon"></i> </div></div> <div class="circle-i-goodstitle"><span>',u+=r(i.name),u+="</span></div> </div> </a> "),u+=" "}),u+=" </div> "),u+=' <div class="circle-l-c-w-m-state clearfix"> <div class="circle-l-c-w-m-s-left"><em class="iconn-75"></em><span class="circle-l-c-w-m-s-l-timedate">',u+=r(e.time_str),u+='更新</span></div> <div class="circle-l-c-w-m-s-right"> <ul class="circle-l-c-w-m-s-r-tool"> <li><em class="icon iconn-10"></em><span class="circle-l-c-w-m-s-r-islikecount">',u+=r(e.like.userQuantity),u+='</span></li> <li><em class="icon iconn-11"></em><span class="circle-l-c-w-m-s-r-iscommetcount">',u+=r(e.replyQuantity),u+='</span></li> <li><em class="icon iconn-57"></em><span class="circle-l-c-w-m-s-r-isstarcount">',u+=r(e.topicCollectionQuantity),u+="</span></li> </ul> </div> </div> </div> </li> "}),u+=" "),u+=" </ul> </div> "),u+=" ",0==t.data.topTopics.length&&0==t.data.topics.length&&0==t.data.totalTopicQuantity&&(u+=" ",0==s&&(u+=' <div class="circle-nonetopic"> <div class="circle-nt-center"> <div class="circle-nt-c-left"></div> <div class="circle-nt-c-right"><span>暂无话题，快来抢占沙发，</span>发布话题<span>&nbsp;吧！</span></div> </div> </div> '),u+=" ",1==s&&(u+=' <div class="circle-nonequality"> <div class="circle-nq-center"> <div class="circle-nq-c-left"></div> <div class="circle-nq-c-right"><span>还没有精选话题</span></div> </div> </div> '),u+=" "),u+=" ",t.data.topTopics||t.data.topics||(u+=' <div class="circle-nonetopic"> <div class="circle-nt-center"> <div class="circle-nt-c-left"></div> <div class="circle-nt-c-right"><span>暂无话题，快来抢占沙发，</span>发布话题<span>&nbsp;吧！</span></div> </div> </div> '),u+=" ",new String(u)})},"61":function(e,exports,i){"use strict";var a=i(3),n=i(19),t=i(16),c=i(22),r=i(17),o=function(e,i){var a,o=0;for(var l in e)!0===e[l]&&o++;if(0!==o){a=i-8*o}else a=i;var s,u=t(e.str);return s=u>a?n(e.str,a)+"...":e.str,r.parseEmoji(c(s))};e.exports=function(){a.helper("truncateLenByJson",o)}},"69":function(e,exports,i){"use strict";(function($,a){var n=i(2),t=i(5),c=i(4),r=i(11),o=i(10).circle,l=i(9),s=i(15),u=function(e){var i=e.data?e.data.selector||$(this):$(this),u=i.attr("data-action"),d=e.data?e.data.done||function(){}:function(){},p=e.data?e.data.word||{"join":"加入圈子","focus":"退出圈子"}:{"join":"加入圈子","focus":"退出圈子"},m=i.attr("data-groupid"),f=i.attr("data-membertype"),h={"event_id":i.attr("event-id"),"group_id":m,"circle_type":a.s_c};if(a.topicid&&(h.topic_id=a.topicid),void 0!==window.BP&&BP.send(h),1==i.attr("data-verif"))return void c("您已提交申请，请等待审核");var g=i.attr("data-userid"),v=function(e){n.post(t.get("joinCircle"),{"data":{"groupid":m,"imid":"b_"+g}}).done(function(n){n&&200===n.code&&n.success?(0===n.data.status?(u&&"joinGroup"==u&&!e?r(o.joinSuccessPublic,{"className":"pop-box","okValue":"暂不发布","cancelValue":"立即发布话题","okCls":"pc-btn pc-btnh35 circle-pop-btn circle-cancel-btn","cancelCls":"pc-btn pc-btnh35 circle-pop-btn","content":'<button data-active="close-join" class="ui-dialog-close icon icon-close" title="取消">×</button><div i="title" class="ui-dialog-title" style="border-bottom: none;"></div><p class="del-pop-p">'+o.joinSuccessPublic+"</p>","ok":function(){},"cancel":function(){var e="topic/publiser?gid="+i.attr("data-groupid");window.open(a.group_domain+e)}}):c(u&&"joinCircle"==u?o.joinSuccess:o.joinSuccess),$("[data-active=close-join]").on("click",function(){$(".pop-box-backdrop").hide(),$("[role=alertdialog]").hide()}),i.html(p.focus)):1===n.data.status&&($("[data-node=QRcode]").attr("src",a.imgpath+"/images/public/down-ma.png"),$(".dialog_p").css({"text-align":"center","margin":"10px 0px","font-size":"1.5em"}),$("[data-node=QRcode]").css({"margin-left":"173px"}),c("您已申请加入圈子，请等待圈主审核"),d("joining",i),setTimeout(function(){e&&location.reload()},1500)),d("join",i)):403===n.code||"圈子拒绝加入"==n.message?c(o.cannotJoinCircle):409===n.code?(i.html(p.join),n.error&&("2"===n.error.code||"该圈子人数已达上限"===n.message?(c(n.message),d("limit",i)):"3"===n.error.code||"您已申请加入圈子，请等待圈主审核"===n.message?(c(n.message),d("joining",i)):"1"!==n.error.code&&"您已加入该圈子！"!==n.message||(c(n.message),d("joined",i),i.html(p.focus)))):c(n.message)}).fail(function(){}).always(function(){})};return l()?(0==f?function(){n.post(t.get("exitCircle"),{"data":{"groupid":m}}).done(function(e){e&&200==e.code&&e.success?(c(o.exit),i.attr("data-membertype",1),i.html(p.join),d("exit",i)):410==e.code?c(o.dissolved,{"ok":function(){location.reload()},"onclose":function(){location.reload()}}):404==e.code&&location.reload()}).fail(function(){}).always(function(){i.attr("data-firing",0)})}():v(),!1):void s(function(){a.islogin="1",v(1),setTimeout(function(){window.location.href=window.location},1500)})};e.exports=u}).call(exports,i(0),i(1))},"70":function(e,exports,i){"use strict";(function(a){var n=i(3),t=function(e){return"0"!==a.islogin&&a.userId==e?a.i_domain+"member/profileHome":a.group_domain+"ta/"+e+".html"};e.exports=function(){n.helper("othersLink",t)}}).call(exports,i(1))},"72":function(e,exports,i){"use strict";(function(a){function n(e){var i=e.page,a=e.shareTo,n=e.shareId,o={"sp":"plus","pf":"pc","sc":a,"st":i,"ss":0,"pid":window.page_id,"sid":n,"uid":r.user_id,"cid":function(e){for(var i=document.cookie.split("; "),a=0;a<i.length;a++){var n=i[a].split("=");if(n[0]==e)return unescape(n[1])}}("__gmz"),"url":r[i].url[a],"env":r.env,"di":""};o=JSON.stringify(o),t.post(c,{"data":o}).done(function(e){})}var t=i(2),c="https://beacon.gomeplus.com/log_share",r={"ht":{"share":{"qq":"2010506904","qz":"2020506904","wx":"2030506904","wb":"2050506904"},"url":{"qq":location.href+"&cmpid=fx_pc_qq"+a.share_time,"qz":location.href+"&cmpid=fx_pc_qz"+a.share_time,"wx":location.href+"&cmpid=fx_pc_wx"+a.share_time,"wb":location.href+"&cmpid=fx_pc_wb"+a.share_time}},"qz":{"share":{"qq":"2010507903","qz":"2020507903","wx":"2030507903","wb":"2050507903"},"url":{"qq":location.href+"&cmpid=fx_pc_qq"+a.share_time,"qz":location.href+"&cmpid=fx_pc_qz"+a.share_time,"wx":location.href+"&cmpid=fx_pc_wx"+a.share_time,"wb":location.href+"&cmpid=fx_pc_wb"+a.share_time}},"user_id":a.userId,"cookie_id":a.share_ssid,"env":a.share_env};e.exports=n}).call(exports,i(1))},"77":function(e,exports,i){"use strict";(function($,a){function n(){s.on("click",function(e){return e.preventDefault(),c()?(u=2,d()):(u=1,t(d)),!1})}var t=i(15),c=i(9),r=i(4),o=i(2),l=i(5),s=$("[data-node=createCircle]"),u=0,d=function(){var e=s.attr("href").slice(1);o.post(l.get("createCircle1"),{"async":!1}).done(function(i){i&&i.success&&(0===i.check?1==u?r("用户创建的圈子已达到上限"):2==u&&r("用户创建的圈子已达到上限",{"ok":function(){window.location.reload()}}):1===i.check&&(1==u?(window.open(a.group_domain+e),window.location.reload()):2==u&&window.open(a.group_domain+e)))}).fail(function(){}).always(function(){})};e.exports={"init":n}}).call(exports,i(0),i(1))}},[418]);
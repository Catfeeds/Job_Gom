webpackJsonp([32],{0:function(a,t,n){(function($,a){"use strict";var t=n(256),e=n(257),i=n(123).shareto,o=n(175),s=n(2),c=n(28),r=n(51),l=n(258),d=n(260),u=n(262),p=n(265),f=n(187),h=n(266),m=n(56);m.setPageData("shopDetail");var v=$('[data-node="shopTop"]'),g=$("[data-node=detail-menu]"),x=v.find('[data-action="love"]'),b=x.find('[data-node="loveNum"]'),w=v.find('[data-action="collect"]'),y=w.find('[data-node="collectNum"]'),k=g.find("[data-node=searchBtn]"),q=g.find("[data-node=searchInput]"),C=$('[data-node="goodsBox"]'),I=C.find('[data-action="moreGoods"]'),B=~~b.text();p.init(),e.init(),f.init(),"8"==a.type&&u.init(),t('[data-node="shopTop"]','[data-action="love"]',{onPraise:function(){B++,b.text(B)},onUnPraise:function(){B--,b.text(B)},onPraised:function(){x.addClass("active"),b.text(B)}}),o({selector:'[data-action="collect"]',parent:'[data-node="shopTop"]'},function(a){a?y.text(~~y.text()+1).prev().addClass("active"):y.text(~~y.text()-1).prev().removeClass("active")});var T=null,_=$('[data-node="shareBtnBox"]'),j={},P="",z="";$('[data-node="shopTop"]').on("mouseenter",'[data-action="shareto"]',function(){P=$(this).data("surl"),$.isEmptyObject(j)&&(j={url:$(this).data("surl"),title:$(this).data("stitle"),pic:""===$(this).data("spic")?a.imgpath+"/images/public/logo.png":$(this).data("spic")},z=$(this).data("stitle")),_.css({top:$(this).offset().top+30,left:$(this).offset().left-~~$('[data-node="shareBtnBox"]').width()/2+~~$(this).width()/2}).show(),BP.send({event_id:"B000P019",shop_id:a.shopId})}).on("mouseleave",'[data-action="shareto"]',function(){T=setTimeout(function(){_.hide()},100)}),_.on("mouseenter",function(){clearTimeout(T)}).on("mouseleave",function(){$(this).hide()});var L=function(t){BP.send({event_id:"B000P016",shop_id:a.shopId,channel_id:t||""})},D=v.find("img").attr("src"),S=function(a){return"https://i-pre.meixincdn.com/v1/img/T1gyVTBmLT1R4cSCrK.png"!=a&&"https://i6.meixincdn.com/v1/img/T1YFxTByJT1R4cSCrK.png"!=a&&"https://i-pre.meixincdn.com/v1/img/T1TaVTB7LT1R4cSCrK.png"!=a},R=function(a){var t=/\w+\.(jpg|gif|bmp|png)$/;return!!S(a)&&t.test(a)};_.on("click",'[data-shareto="weixin"]',function(){j.url=a.weixin_share,j.title=z,i.weixin(j),L("out-weixin")}).on("click",'[data-shareto="qq"]',function(){j.url=P,j.title=z,j.summary="我发现了前所未有的好店，不如，你也来逛逛？",j.pic=R(D)?D:a.imgpath+"/images/public/logo.jpg",i.qq(j),L("out-QQ")}).on("click",'[data-shareto="sina"]',function(){j.url=P,j.title=z+",这是我费尽千辛万苦找到的超级好店。",j.pic=R(D)?D:a.imgpath+"/images/public/logo.jpg",i.sina(j),L("out-xlwb")}).on("click",'[data-shareto="qzone"]',function(){j.url=P,j.title=z,j.summary="这是我费尽千辛万苦找到的超级好店。",j.pic=R(D)?D:a.imgpath+"/images/public/logo.jpg",i.qzone(j),L("out-Qqzone")});var N=2,U=a.shopId;I.on("click",function(){var t=$(this).html(),n=this,e="",i={};"1"==a.isSearch?(e=a.mall_domain+c.get("searchGetMore"),i={shop_type:~~a.shoptype,shop_id:~~a.shopId,pageNum:N,word:a.word}):(e=c.get("moreGoods"),i={shopId:~~a.shopId,type:~~a.shoptype,tabId:~~a.type,pageNum:N,pagesize:20}),$(n).hasClass("disabled")||($(n).addClass("disabled").html('<span><img src="'+a.imgpath+'/images/public/loading.gif">正在加载...</span>'),s.get(e,{data:i}).done(function(e){var i=e.data.itemList,o=e.data.count;o<20?$(n).html("<span>没有可加载内容</span>"):0==i.length?$(n).html("<span>没有可加载内容</span>"):$(n).removeClass("disabled").html(t),"2"==a.type?l(i,U):d(i,U),N++}))});var G=function(){var t=q.val();""!=r(t)&&(location.href=a.mall_domain+"shop/search?shopid="+a.shopId+"&shopword="+encodeURIComponent(t))};k.on("click",G),$(document).keydown(function(a){"13"==a.which&&G()}),h.init()}).call(t,n(1),n(4))},51:function(a,t){"use strict";var n=function(a){return a.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g,"")};a.exports=n},87:function(a,t,n){(function($){"use strict";var t,n,e,i=function(){t.off().on("click",function(){t.hide(),n.hide()}),n.off().on("click",function(){t.hide(),n.hide()})},o=function(a,o){var s={duration:2e3,callback:function(){}};$.extend(s,o||{}),clearTimeout(e),t=$('[data-action="publicMask"]'),n=$('[data-action="publicTips"]'),t.length>0?(t.show(),n.show().text(a)):($("body").append('<div data-action="publicMask" class="ordi-toast"></div><div class="ordi-toast-txt" data-action="publicTips">'+a+"</div>"),t=$('[data-action="publicMask"]'),n=$('[data-action="publicTips"]'),i()),n.css("margin",-n[0].offsetHeight/2+"px 0 0 "+-n.width()/2+"px"),e=setTimeout(function(){t.hide(),n.hide(),s.callback()},s.duration)};a.exports={init:o,events:i}}).call(t,n(1))},88:function(a,t,n){"use strict";var e=n(26),i=function(a,t){return"number"!=typeof t&&(t=24),a.length>t?a.substr(0,t)+"...":a};a.exports=function(){e.helper("substrLen",i)}},123:function(a,t,n){(function($){"use strict";var t=n(2),e=n(28),i=n(124),o=n(47),s={qq:"http://connect.qq.com/widget/shareqq/index.html",sina:"http://v.t.sina.com.cn/share/share.php",qzone:"http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey"},c={url:"http://www.gomeplus.com",title:"国美PlusAPP边玩边分享，购物不孤单",pic:"http://www.gomeplus.com/images/logo.png",summary:"国美PlusAPP边玩边分享，购物不孤单"},r=function(a){window.open(a)},l=!1,d=function(){var a='<p data-node="shareBtnBox" class="share-down" style="z-index:21;"><span class="share-box"><span class="icon icon-up-arrow"></span><span class="icon-box"><em data-shareto="weixin" class="iconn-30"></em><em data-shareto="qq" class="iconn-32"></em><em data-shareto="sina" class="iconn-31"></em><em data-shareto="qzone" class="iconn-33"></em></span></span></p>';$("body").append(a),l=!0},u=function(a){!l&&d(),$("[data-node=shareBtnBox]").css({left:a.x,top:a.y}).show()},p=!1,f=function(){var a='<div class="share-weixin"><div class="wx-mask"></div><div class="wx-main"><div class="wx-code"><span></span><img data-node="shareWeixinCode" alt="分享到微信" /></div><p>打开微信扫一扫，即可分享</p><a href="javascript:;" title="点击关闭" class="wx-close">×</a></div></div>';$("body").append(a),p=!0},h=function(a,t){var n=[],e={title:a.title,url:a.url,summary:a.summary,desc:a.desc,site:a.site};t?e.pics=a.pic:e.pic=a.pic;for(var i in e)n.push(i+"="+encodeURIComponent(e[i]||""));return n.join("&")},m={weixin:function(a){var t=i(a.url);!p&&f(),$("[data-node=shareWeixinCode]")[0].src=t,$(".share-weixin").show(),$(".wx-close").on("click",function(){$(".share-weixin").hide()})},qq:function(a){var t=s.qq+"?"+h(a,!0);r(t)},sina:function(a){var t=s.sina+"?"+h(a);r(t)},qzone:function(a){var t=s.qzone+"?"+h(a,!0);r(t)}},v=function(a){var n="0"!==a.isRebate;t.get(e.get("shareGetGoodsKid"),{validate:n,data:{skuId:a.skuId,itemId:a.itemId,parentKid:a.parentKid},async:!1}).done(function(t){if(t.success===!0){var n=t.data.kid,e=a.shareInfo,i=e.url,o=i.indexOf("?");o>0&&(i=i.substring(0,o)),e.url=i+"?onlineUserId="+e.onlineUserId+"&kId="+n,m[a.shareto](e)}else m[a.shareto](a.shareInfo)}).fail(function(t){n?o()&&m[a.shareto](a.shareInfo):m[a.shareto](a.shareInfo)})},g=function(a){var t={title:a.title||c.title,url:a.url||c.url,pic:a.pic||c.pic,summary:a.summary||"",desc:a.desc||""};!!m[a.type]&&m[a.type](t)},x=function(a,t,n){var e=null;$item="string"==typeof a?$(a):a,t=t||"[data-action=shareto]",$item.on("mouseenter",t,function(a){var t=$(this).data("surl"),n=$(this).data("stitle"),i=$(this).data("spic");e={url:t,title:n,pic:i};var o=$(this).width(),s=$(this).height(),c=$(this).offset().left/1+o/2-80+"px",r=$(this).offset().top/1+(s-1)+"px";return u({x:c,y:r}),!1}),$item.on("mouseleave",t,function(a){return $("[data-node=shareBtnBox]").hide(),!1}),$("body").on("click","[data-shareto]",function(a){a.preventDefault(),shareType=$(this).data("shareto"),e.type=shareType,n=n||function(){},n.call(null,e),g(e)}),$("body").on("mouseenter","[data-node=shareBtnBox]",function(){$(this).show()}),$("body").on("mouseleave","[data-node=shareBtnBox]",function(){$(this).hide()})};a.exports={share:g,shareto:m,shareItem:x,shareWithKid:v}}).call(t,n(1))},124:function(a,t,n){(function(t){"use strict";var n=function(a){return t.wap_url+"q.php?t="+encodeURIComponent(a)};a.exports=n}).call(t,n(4))},157:function(a,t,n){(function(t){"use strict";var n=t.imgpath+"/images/emoji/",e=".png",i=[{name:"微笑",url:"weixiao"},{name:"色",url:"se"},{name:"亲亲",url:"qinqin"},{name:"得意",url:"deyi"},{name:"流泪",url:"liulei"},{name:"害羞",url:"haixiu"},{name:"闭嘴",url:"bizui"},{name:"鼓掌",url:"guzhang"},{name:"大哭",url:"daku"},{name:"尴尬",url:"ganga"},{name:"生气",url:"shengqi"},{name:"调皮",url:"tiaopi"},{name:"呲牙",url:"ciya"},{name:"惊讶",url:"jingya"},{name:"委屈",url:"weiqu"},{name:"吐血",url:"tuxue"},{name:"冷汗",url:"lenghan"},{name:"抓狂",url:"zhuakuang"},{name:"难过",url:"nanguo"},{name:"偷笑",url:"touxiao"},{name:"白眼",url:"baiyan"},{name:"不屑",url:"buxie"},{name:"快哭了",url:"kuaikule"}],o=[{name:"困",url:"kun"},{name:"装酷",url:"zhuangku"},{name:"大笑",url:"daxiao"},{name:"偷瞄",url:"toumiao"},{name:"奋斗",url:"fendou"},{name:"咒骂",url:"zhouma"},{name:"疑问",url:"yiwen"},{name:"晕",url:"yun"},{name:"捶打",url:"chuida"},{name:"再见",url:"zaijian"},{name:"抠鼻",url:"koubi"},{name:"发呆",url:"fadai"},{name:"坏笑",url:"huaixiao"},{name:"哈欠",url:"haqian"},{name:"鄙视",url:"bishi"},{name:"睡觉",url:"shuijiao"},{name:"饿",url:"e"},{name:"阴险",url:"yinxian"},{name:"难受",url:"nanshou"},{name:"可怜",url:"kelian"},{name:"撇嘴",url:"piezui"},{name:"石化",url:"shihua"},{name:"泪眼",url:"leiyan"}],s=function(a){for(var t=0,i=a.length;t<i;t++){var o=a[t];o.url=n+o.url+e}return a};a.exports=s(i.concat(o))}).call(t,n(4))},158:function(a,t,n){(function(t){"use strict";var n=t.imgpath+"/images/emoji/",e=".png",i={"亲":{name:"亲亲",url:n+"qinqin"+e},"愤怒":{name:"生气",url:n+"shengqi"+e},"惊恐":{name:"惊讶",url:n+"jingya"+e},"迷茫":{name:"委屈",url:n+"weiqu"+e},"伤心":{name:"难过",url:n+"nanguo"+e},"努力":{name:"奋斗",url:n+"fendou"+e},YY:{name:" 坏笑",url:n+"huaixiao"+e},"恶心":{name:"难受",url:n+"nanshou"+e}};a.exports=i}).call(t,n(4))},159:function(a,t,n){var e=n(26);a.exports=e("src/js/module/popup/face/face",function(a,t){"use strict";var n=this,e=(n.$helpers,n.$each),i=a.list,o=(a.v,a.i,a.face,a.$index,n.$escape),s=a.page,c="";return c+='<div data-node="faceBox" class="imoj-box" style="position: absolute;z-index: 9999;display:none"> <em class="sanjiao"></em> <div data-node="faceList" class="imoj-list"> ',e(i,function(a,t){c+=' <div class="imoj-content clearfix ',t&&(c+="hide"),c+='"> ',e(a,function(a,t){c+=' <a href="javascript:;"> <img width="22" height="22" data-face="[',c+=o(a.name),c+=']" src="',c+=o(a.url),c+='" alt="',c+=o(a.name),c+='" title="',c+=o(a.name),c+='"> </a> '}),c+=" </div> "}),c+=' </div> <ul data-action="facePage" class="pagination"> ',e(s,function(a,t){c+=" <li ",0==t&&(c+='class="active"'),c+=">",c+=o(t+1),c+="</li> "}),c+=" </ul> </div>",new String(c)})},175:function(a,t,n){(function($,t){"use strict";var e,i=n(2),o=n(28),s=n(87),c=n(47),r=!1,l=function(a,n){var l=$(a.parent?a.parent:a.selector),d=a.parent?a.selector:void 0;l.on("click",d,function(){function a(a){i.post(e,a).done(function(a){200===a.code?(d?$(l).addClass("active").attr("data-collect","collect"):$(l).removeClass("active").attr("data-collect",""),u.call(l,d)):s.init(a.message)}).fail(function(a){c()&&s.init("店铺收藏失败")}).always(function(){r=!1})}var l=this,d=!0,u=n||function(){},p={validate:!0,data:{shopId:t.shopId}};return r||(r=!0,""===$(l).attr("data-collect")?(e=o.get("shopCollect"),d=!0):(e=o.get("unShopCollect"),d=!1)),a(p),!1})};a.exports=l}).call(t,n(1),n(4))},187:function(a,t,n){(function($){"use strict";var t=n(47),e=n(3),i=function(){$('[data-action="shortcutBanner"]').on("click","a",function(a){var n=$(this);t()||(a.preventDefault(),e({onLogin:function(){window.location.href=n.attr("href")}}))})};a.exports={init:i}}).call(t,n(1))},232:function(a,t,n){"use strict";var e=n(26),i=n(42),o=n(43),s=n(233),c=n(234),r=function(a,t){var n,e=o(a);return n=e>t?i(a,t)+"...":a,c.parseEmoji(s(n))};a.exports=function(){e.helper("truncateByteLen",r)}},233:function(a,t){"use strict";var n=function(a,t){return a?a.replace(t||/[&<">'](?:(amp|lt|ldquo|rdquo|quot|gt|#39|nbsp|#\d+);)?/g,function(a,t){return t?a:{"<":"&lt;","&":"&amp;",'"':"&quot;","“":"&ldquo;","”":"&rdquo;",">":"&gt;","'":"&#39;"}[a]}):""};a.exports=n},234:function(a,t,n){(function($){"use strict";var t,e,i=n(157),o=n(158),s=n(159),c=0,r={},l=function(a){for(var t=a.length,n=24,e=Math.ceil(t/n),i=[],o=0;o<e;o++){i[o]=[];var s=n*(o+1);s=s>t?t:s;for(var c=o*n;c<s;c++){var l=a[c];i[o].push(l),r[l.name]=l.url}}return{page:new Array(e),list:i}},d=function(a,t){p(0),$("[data-node=faceBox]").css({left:a+"px",top:t+"px"}).show()},u=function(){$("[data-node=faceBox]").hide()},p=function(a){a=a||c,$("[data-action=facePage] > li").eq(a).addClass("active").siblings("li").removeClass("active"),$("[data-node=faceList] > div").eq(a).removeClass("hide").siblings("div").addClass("hide")},f=function(a,n){$("body").on("click","[data-face]",function(i){i.preventDefault(),i.stopPropagation(),t=$(this).data("face"),e=$(this).attr("src"),a({reg:t,url:e}),n!==!1&&$("[data-node=faceBox]").hide()})},h=function(a){var t=l(i),n=s(t);$("body").append(n),a()},m=function(){$("body").on("click","[data-node=faceBox]",function(a){a.stopPropagation()}),$(document).on("click",function(){$("[data-node=faceBox]").hide()}),$("[data-node=faceBox]").on("mouseenter","[data-action=facePage] > li",function(){var a=$(this).index();p(a)})},v=function(a){var t=!0;for(var n in a){t=!1;break}return t},g=function(a){var t=/(\[([\s\S]+?)\])/g;return v(r)&&l(i),a.replace(t,function(a,t,n){var e=r[n];if(e)return'<img width="22" height="22" src="'+e+'" />';var i=o[n];return i?'<img width="22" height="22" src="'+i.url+'" />':a})},x=function(){h(m)};a.exports={init:x,insert:f,show:d,hide:u,parseEmoji:g}}).call(t,n(1))},256:function(a,t,n){(function($,t){"use strict";var e=n(2),i=n(28),o=n(37),s=n(48),c=n(71),r=n(47),l=r(),d=function(){},u=function(a,t,n){a.data("praise",t),a.data("count",n)},p={normal:{add:function(a,t,n){a.addClass("active"),n||(n="取消点赞"),a.find("span").text(n)},reduce:function(a,t,n){a.removeClass("active"),n||(n="点赞"),a.find("span").text(n)}}},f=function(a){return p[a]},h=function(a,n,r){var p=$(a),h=r.onPraise||d,m=r.onUnPraise||d,v=r.onPraised||d,g=r.mode||"normal";p.on("click",n,function(){function a(a){e.post(i.get("praise"),a).done(function(a){var e=f(g);if(s(c.comment.enableEditor).pub({pid:"enable"}),a&&200===a.code&&a.success)1===p?(u(n,0,++b),e.add(n,a,b),h.call(n,a,b)):0===p&&(u(n,1,--b),e.reduce(n,a,b),m.call(n,a,b));else if(a&&422===a.code);else if(a&&403===a.code)o("抱歉！该话题审核未通过",{ok:function(){window.location.href=t.group_domain+"index/error?code=topic"}});else{var i=a.message;if(409===a.code)return v.call(n,a,b),l&&o(i),!1;0===d&&404===a.code?o(i,{ok:function(){window.location.reload()}}):o(i)}}).fail(function(){}).always(function(){n.data("firing",0)})}var n=$(this),r=n.data("firing");if(1!==r){n.data("firing",1);var d=n.data("type"),p=n.data("praise"),x=n.data("id"),b=n.data("count"),w={validate:!0,data:{id:x,type:d,isPraise:p},onLogin:a,refresh:!0};return a(w),!1}})};a.exports=h}).call(t,n(1),n(4))},257:function(a,t,n){(function($,t){"use strict";var e=n(37),i=n(28),o=n(2),s=function(){var a,n=!0;$(document).on("click",'[data-action="getRed"]',function(){if(n){n=!1,a=$(this).attr("data-redid");var s=function s(){o.post(i.get("getTicket"),{validate:!0,data:{batchSn:a,userId:t.userId},onLogin:s}).done(function(a){var t=0,i="";a&&a.success&&200===a.code?(t=a.data.userRemainingAvailableQuantity,i="还可以领取"+t+"张",t<1&&(i="领取次数已达上限"),e("领取成功，"+i)):e(a.message),n=!0}).fail(function(){e("网络可能出问题了，请稍后重试"),n=!0})};return s(),!1}})};a.exports={init:s}}).call(t,n(1),n(4))},258:function(a,t,n){(function($,t){"use strict";var e=n(259),i=function(a,n){var i=$('[data-node="goodsBox"]'),o=i.find(".more-comments"),s=i.find('[data-action="moreGoods"]'),c="",r=t.mall_domain;for(var l in a){var d=i.find("[data-node="+l+"]"),u=i.find("[data-tip=dateTitle]");if(0==d.length){if(u.length>=7)return void s.html("<span>没有可加载内容</span>");o.before('<h2 class="title">'+a[l].title+'</h2><ul class="clearfix" data-node="'+l+'" data-tip="dateTitle"></ul>'),d=i.find("[data-node="+l+"]")}c=e({data:a[l].data,shopId:n,hostName:r}),d.append(c)}};a.exports=i}).call(t,n(1),n(4))},259:function(a,t,n){var e=n(26);a.exports=e("src/js/page/shopInfo/newGoods/goods",function(a,t){"use strict";var n=this,e=(n.$helpers,n.$each),i=a.data,o=(a.group,a.$index,n.$escape),s=a.hostName,c=a.shopId,r="";return e(i,function(a,t){r+=' <li> <a target="_blank" href="',r+=o(s),r+="item/",r+=o(c),r+="-",r+=o(a.id),r+='.html"> ',a.isRebate&&a.isDiscount?r+=' <em class="icon-fan">返</em> ':(r+=" ",a.isRebate&&(r+=' <em class="icon-fan">返</em> '),r+=" ",a.isDiscount&&(r+=' <em class="icon-fan icon-jiang">降</em> '),r+=" "),r+=' <div class="mg-negative"> <a href="',r+=o(s),r+="item/",r+=o(c),r+="-",r+=o(a.id),r+='.html" target="_blank"> <img src=',r+=o(a.img),r+=' alt="',r+=o(a.title),r+='"> </a> <div class="btn-box"> <a href="',r+=o(s),r+="item/",r+=o(c),r+="-",r+=o(a.id),r+='.html" target="_blank" class="pc-btn pc-btnh40">立即购买</a> <a href="',r+=o(s),r+="item/",r+=o(c),r+="-",r+=o(a.id),r+='.html" target="_blank" class="pc-btn pc-btnh40 pc-bj-fc8753">加入购物车</a> </div> <div class="text">￥<span>',r+=o(a.price),r+='</span> <p title="',r+=o(a.title),r+='"> <a target="_blank" href="',r+=o(s),r+="item/",r+=o(c),r+="-",r+=o(a.id),r+='.html">',r+=o(a.title),r+="</a> </p> </div> </div> </li> "}),r+=" ",new String(r)})},260:function(a,t,n){(function($,t){"use strict";var e=n(261),i=function(a,n){var i=$('[data-node="goodsBox"]'),o=i.find("ul"),s="",c=t.mall_domain;s=e({data:a,shopId:n,hostName:c}),o.append(s)};a.exports=i}).call(t,n(1),n(4))},261:function(a,t,n){var e=n(26);a.exports=e("src/js/widget/shopInfo/shopInfo",function(a,t){"use strict";var n=this,e=(n.$helpers,n.$each),i=a.data,o=(a.$value,a.$index,n.$escape),s=a.hostName,c=a.shopId,r="";return r+=" ",e(i,function(a,t){r+=" <li> ",i[t].isRebate&&i[t].isDiscount?r+=' <em class="icon-fan">返</em> ':(r+=" ",i[t].isRebate&&(r+=' <em class="icon-fan">返</em> '),r+=" ",i[t].isDiscount&&(r+=' <em class="icon-fan icon-jiang">降</em> '),r+=" "),r+=' <div class="mg-negative"> <a href="',r+=o(s),r+="product/",r+=o(c),r+="-",r+=o(i[t].id),r+='.html" target="_blank"> <img src=',r+=o(i[t].img),r+=' alt="',r+=o(i[t].title),r+='"> </a> <div class="btn-box"> <a href="',r+=o(s),r+="product/",r+=o(c),r+="-",r+=o(i[t].id),r+='.html" target="_blank" class="pc-btn pc-btnh40">立即购买</a> <a href="',r+=o(s),r+="product/",r+=o(c),r+="-",r+=o(i[t].id),r+='.html" target="_blank" class="pc-btn pc-btnh40 pc-bj-fc8753">加入购物车</a> </div> <div class="text">￥<span>',r+=o(i[t].price),r+='</span> <p title="',r+=o(i[t].title),r+='"> <a target="_blank" href="',r+=o(s),r+="product/",r+=o(c),r+="-",r+=o(i[t].id),r+='.html">',r+=o(i[t].title),r+="</a> </p> </div> </div> </li> "}),r+=" ",new String(r)})},262:function(a,t,n){(function($,t){"use strict";var e=n(2),i=n(28),o=n(263),s=n(264);n(232)(),n(88)();var c=$("[data-node=shopTopic]"),r=$("[data-node=topicList] li"),l=$("[data-node=loadMore]"),d=$("[data-node=loading]"),u=$("[data-node=noMore]"),p=$("[data-action=dataFail]"),f=!1,h=1,m=!1,v="hide",g=function(){l.removeClass(v),d.addClass(v)},x=function(){l.addClass(v),u.addClass(v),d.removeClass(v)},b=function(){d.addClass(v),u.removeClass(v)},w=function(){d.addClass(v),p.removeClass(v)},y=function(){if(!f)return m?void b():(f=!0,x(),e.get(i.get("dynamicGetData"),{data:{ownerUserId:t.ownerUserId,pageNum:h,pageSize:20}}).done(function(a){if(a.success===!0){h++;var n=a.data.topics;if($.each(n,function(a,t){if(""!==t.text&&t.text.length>98){var n=t.text,e="",i=n.substr(0,98),o=i.slice(0,-6),s=i.slice(-6),c=s.indexOf("[");e=c>-1?s.substr(0,c)+"...":s+"...",t.text=o+e}else t.text=t.text}),n.groupDomain=t.group_domain,n.shopname=t.shop_name,n.shopicon=t.shop_icon,0===n.length)m=!0,r.length?b():(c.append(s({url:t.mall_domain,shopId:t.shopId})),d.addClass(v));else{var e=o({list:n});0===$("[data-node=shopTopicList]").length&&c.append('<ul class="topic-list" data-node="shopTopicList"></ul>'),$("[data-node=shopTopicList]").append(e),n.length<20?d.addClass(v):g()}}else m=!0,w()}).fail(function(){w()}).always(function(){f=!1}),!1)},k=function(){$("[data-node=shopTopic]").children().remove(),y(),l.on("click",y),p.on("click",y)};a.exports={init:k}}).call(t,n(1),n(4))},263:function(a,t,n){var e=n(26);a.exports=e("src/js/page/shopInfo/dynamic/topicList",function(a,t){"use strict";var n=this,e=n.$helpers,i=n.$each,o=a.list,s=(a.value,a.$index,n.$escape),c=n.$string,r=(a.imgs,a.i,"");return i(o,function(a,t){r+=' <li> <a href="',r+=s(o.groupDomain),r+="topic/",r+=s(a.topid),r+='.html" target="_blank">',r+=s(a.title),r+="</a> ",""!==a.text&&(r+=' <p><a href="',r+=s(o.groupDomain),r+="topic/",r+=s(a.topid),r+='.html" target="_blank">',r+=c(e.truncateByteLen(a.text,"238")),r+="</a></p> "),r+=" ",0!==a.images.length&&(r+=' <dl class="clearfix"> ',i(a.images,function(t,n){r+=' <dd> <a href="',r+=s(o.groupDomain),r+="topic/",r+=s(a.topid),r+='.html" target="_blank"> <img src="',r+=s(t.url),r+='" alt="" onerror="imgError(this,\'l\')"> ',"image"!==t.type&&(r+=" ","item"==t.type?r+=' <em class="icon icon-goods"></em> ':"video"==t.type&&(r+=' <em class="icon icon-video"></em> '),r+=" "),r+=" ",a.count>3&&2==n&&(r+=' <em class="icon icon-num">',r+=s(a.count),r+="</em> "),r+=" </a> </dd> "}),r+=" </dl> "),r+=' <div class="clearfix"> <div class="fl"> <span class="m0">',r+=s(a.time),r+='</span> <span>来自圈子：</span> <a href="',r+=s(o.groupDomain),r+="circle/",r+=s(a.groupid),r+='.html" target="_blank">',r+=s(a.groupName),r+='</a> <span class="name"> <a><img src="',r+=s(o.shopicon),r+='">',r+=s(o.shopname),r+='</a> </span> </div> <div class="fr"> <span><em class="iconn-56"></em>',r+=s(a.likeQuantity),r+='</span> <span><em class="iconn-11"></em>',r+=s(a.replyQuantity),r+='</span> <span><em class="iconn-57"></em>',r+=s(a.topicCollectionQuantity),r+="</span> </div> </div> </li> "}),r+=" ",new String(r)})},264:function(a,t,n){var e=n(26);a.exports=e("src/js/page/shopInfo/dynamic/no_topic",function(a,t){"use strict";var n=this,e=(n.$helpers,n.$escape),i=a.url,o=a.shopId,s="";return s+='<div class="no-topic"> <div class="txt clearfix"><em class="iconn-55"></em> <p>店主暂无动态，去看看店铺的<a href="',s+=e(i),s+="shop-",s+=e(o),s+='-1.html">商品</a>吧！</p> </div> </div>',new String(s)})},265:function(a,t,n){(function($){"use strict";var t,n=$('[data-action="shopSelector"]'),e=$('[data-node="shopSelectList"]'),i=function(){n.on("mouseenter",function(){n.addClass("hover"),e.show()}),n.on("mouseleave",function(){t=setTimeout(function(){n.removeClass("hover"),e.hide()},200)}),e.on("mouseenter",function(){clearTimeout(t)}),e.on("mouseleave",function(){n.removeClass("hover"),e.hide()})};a.exports={init:i}}).call(t,n(1))},266:function(a,t,n){(function($){"use strict";var t=$("[data-node=fixMenu]"),n=$("[data-node=detail-menu]"),e=$("[data-node=detail-menu] a"),i=$("[data-node=searchBox]"),o="fixed-menu",s="active",c=n.offset().top,r=$(window).scrollTop(),l=function(){r>=c?(t.addClass(o),i.hide()):(t.removeClass(o),i.show())},d=function(a){var t=$(a),n=e.index(t);e.removeClass(s).eq(n).addClass(s)},u=function(){l(),$(window).on("scroll",function(){r=$(window).scrollTop(),l()}),n.on("click","a",function(){d(this)})};a.exports={init:u}}).call(t,n(1))}});
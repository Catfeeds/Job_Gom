webpackJsonp([43],{0:function(n,a,e){var i=e(278),t=e(54);t.setPageData("uc_topics"),i.init()},46:function(n,a){var e=function(n){return null==n?0:("string"!=typeof n&&(n+=""),n.replace(/[^\x00-\xff]/g,"01").length)};n.exports=e},49:function(n,a,e){function i(n){return n>=55296&&n<=56319}function t(n){return n>=56320&&n<=57343}function r(n,a){if("string"!=typeof n)throw new Error("Input must be string");for(var e,r,u=n.length,c=0,l=0;l<u;l+=1){if(e=n.charCodeAt(l),r=n[l],i(e)&&t(n.charCodeAt(l+1))&&(l+=1,r+=n[l]),c+=o(r),c===a)return n.slice(0,l+1);if(c>a)return n.slice(0,l-r.length+1)}return n}var o=e(46);n.exports=r},178:function(n,a,e){(function($){var a,i,t=e(179),r=e(180),o=e(181),u=0,c={},l=function(n){for(var a=n.length,e=24,i=Math.ceil(a/e),t=[],r=0;r<i;r++){t[r]=[];var o=e*(r+1);o=o>a?a:o;for(var u=r*e;u<o;u++){var l=n[u];t[r].push(l),c[l.name]=l.url}}return{page:new Array(i),list:t}},s=function(n,a){f(0),$("[data-node=faceBox]").css({left:n+"px",top:a+"px"}).show()},d=function(){$("[data-node=faceBox]").hide()},f=function(n){n=n||u,$("[data-action=facePage] > li").eq(n).addClass("active").siblings("li").removeClass("active"),$("[data-node=faceList] > div").eq(n).removeClass("hide").siblings("div").addClass("hide")},m=function(n,e){$("body").on("click","[data-face]",function(t){t.preventDefault(),t.stopPropagation(),a=$(this).data("face"),i=$(this).attr("src"),n({reg:a,url:i}),e!==!1&&$("[data-node=faceBox]").hide()})},p=function(n){var a=l(t),e=o(a);$("body").append(e),n()},g=function(){$("body").on("click","[data-node=faceBox]",function(n){n.stopPropagation()}),$(document).on("click",function(){$("[data-node=faceBox]").hide()}),$("[data-node=faceBox]").on("mouseenter","[data-action=facePage] > li",function(){var n=$(this).index();f(n)})},h=function(n){var a=!0;for(var e in n){a=!1;break}return a},v=function(n){var a=/(\[([\s\S]+?)\])/g;return h(c)&&l(t),n.replace(a,function(n,a,e){var i=c[e];if(i)return'<img width="22" height="22" src="'+i+'" />';var t=r[e];return t?'<img width="22" height="22" src="'+t.url+'" />':n})},x=function(){p(g)};n.exports={init:x,insert:m,show:s,hide:d,parseEmoji:v}}).call(a,e(1))},179:function(n,a,e){(function(a){var e=a.imgpath+"/images/emoji/",i=".png",t=[{name:"微笑",url:"weixiao"},{name:"色",url:"se"},{name:"亲亲",url:"qinqin"},{name:"得意",url:"deyi"},{name:"流泪",url:"liulei"},{name:"害羞",url:"haixiu"},{name:"闭嘴",url:"bizui"},{name:"鼓掌",url:"guzhang"},{name:"大哭",url:"daku"},{name:"尴尬",url:"ganga"},{name:"生气",url:"shengqi"},{name:"调皮",url:"tiaopi"},{name:"呲牙",url:"ciya"},{name:"惊讶",url:"jingya"},{name:"委屈",url:"weiqu"},{name:"吐血",url:"tuxue"},{name:"冷汗",url:"lenghan"},{name:"抓狂",url:"zhuakuang"},{name:"难过",url:"nanguo"},{name:"偷笑",url:"touxiao"},{name:"白眼",url:"baiyan"},{name:"不屑",url:"buxie"},{name:"快哭了",url:"kuaikule"}],r=[{name:"困",url:"kun"},{name:"装酷",url:"zhuangku"},{name:"大笑",url:"daxiao"},{name:"偷瞄",url:"toumiao"},{name:"奋斗",url:"fendou"},{name:"咒骂",url:"zhouma"},{name:"疑问",url:"yiwen"},{name:"晕",url:"yun"},{name:"捶打",url:"chuida"},{name:"再见",url:"zaijian"},{name:"抠鼻",url:"koubi"},{name:"发呆",url:"fadai"},{name:"坏笑",url:"huaixiao"},{name:"哈欠",url:"haqian"},{name:"鄙视",url:"bishi"},{name:"睡觉",url:"shuijiao"},{name:"饿",url:"e"},{name:"阴险",url:"yinxian"},{name:"难受",url:"nanshou"},{name:"可怜",url:"kelian"},{name:"撇嘴",url:"piezui"},{name:"石化",url:"shihua"},{name:"泪眼",url:"leiyan"}],o=function(n){for(var a=0,t=n.length;a<t;a++){var r=n[a];r.url=e+r.url+i}return n};n.exports=o(t.concat(r))}).call(a,e(4))},180:function(n,a,e){(function(a){var e=a.imgpath+"/images/emoji/",i=".png",t={"亲":{name:"亲亲",url:e+"qinqin"+i},"愤怒":{name:"生气",url:e+"shengqi"+i},"惊恐":{name:"惊讶",url:e+"jingya"+i},"迷茫":{name:"委屈",url:e+"weiqu"+i},"伤心":{name:"难过",url:e+"nanguo"+i},"努力":{name:"奋斗",url:e+"fendou"+i},YY:{name:" 坏笑",url:e+"huaixiao"+i},"恶心":{name:"难受",url:e+"nanshou"+i}};n.exports=t}).call(a,e(4))},181:function(n,a,e){var i=e(26);n.exports=i("src/js/module/popup/face/face",function(n,a){"use strict";var e=this,i=(e.$helpers,e.$each),t=n.list,r=(n.v,n.i,n.face,n.$index,e.$escape),o=n.page,u="";return u+='<div data-node="faceBox" class="imoj-box" style="position: absolute;z-index: 111;display:none"> <em class="sanjiao"></em> <div data-node="faceList" class="imoj-list"> ',i(t,function(n,a){u+=' <div class="imoj-content clearfix ',a&&(u+="hide"),u+='"> ',i(n,function(n,a){u+=' <a href="javascript:;"> <img width="22" height="22" data-face="[',u+=r(n.name),u+=']" src="',u+=r(n.url),u+='" alt="',u+=r(n.name),u+='" title="',u+=r(n.name),u+='"> </a> '}),u+=" </div> "}),u+=' </div> <ul data-action="facePage" class="pagination"> ',i(o,function(n,a){u+=" <li ",0==a&&(u+='class="active"'),u+="></li> "}),u+=" </ul> </div>",new String(u)})},209:function(n,a){var e=function(n,a){return n?n.replace(a||/[&<">'](?:(amp|lt|ldquo|rdquo|quot|gt|#39|nbsp|#\d+);)?/g,function(n,a){return a?n:{"<":"&lt;","&":"&amp;",'"':"&quot;","“":"&ldquo;","”":"&rdquo;",">":"&gt;","'":"&#39;"}[n]}):""};n.exports=e},278:function(n,a,e){(function($,a){var i=e(2),t=e(28);e(279)();var r=e(36),o=e(280),u=e(281),c=$("[data-node=content]"),l=$("[data-node=loading]"),s=$("[data-node=loadMore]"),d=$("[data-node=noMore]"),f=function(){var n=1,e=!1,f=!1,m=function(){s.hide(),l.show()},p=function(){l.hide(),d.show(),s.off()},g=function(){if(!e){if(f)return void p();e=!0,m(),i.get(t.get("getTopic"),{data:{pageNum:n,pageSize:20}}).done(function(e,i,t){if(e.success){n++;var r={content:e.data};$.isEmptyObject(e.data)?2===n?(f=!0,l.hide(),s.off(),c.append($(u({groupDomain:a.group_domain})))):(f=!0,p()):(r.groupDomain=a.group_domain,c.append($(o({contents:r}))),l.hide(),e.data.length<20?s.hide():s.show())}}).fail(function(n,a,e){r("数据请求失败 请稍后尝试")}).always(function(){e=!1})}};g(),s.on("click",g)};n.exports={init:f}}).call(a,e(1),e(4))},279:function(n,a,e){var i=e(26),t=(e(49),e(46),e(209)),r=e(178),o=function(n,a){var e=n;return n.length>a&&(e=e.substring(0,a)+"..."),r.parseEmoji(t(e))};n.exports=function(){i.helper("truncateLen",o)}},280:function(n,a,e){var i=e(26);n.exports=i("src/js/page/uc_topic/main/content",function(n,a){"use strict";var e=this,i=e.$helpers,t=e.$each,r=n.contents,o=(n.content,n.index,e.$escape),u="";return t(r.content,function(n,a){u+=" ",n.title&&n.title.length&&(u+=' <li><a href="',u+=o(r.groupDomain),u+="topic/",u+=o(n.topid),u+='.html" class="title" target="_blank">',u+=o(i.truncateLen(n.title,"40")),u+="</a><span>",u+=o(n.time),u+='</span> <p>发表自圈子: <a href="',u+=o(r.groupDomain),u+="circle/",u+=o(n.groupid),u+='.html" target="_blank">',u+=o(n.groupName),u+="</a></p> </li> "),u+=" "}),new String(u)})},281:function(n,a,e){var i=e(26);n.exports=i("src/js/page/uc_topic/main/noData",function(n,a){"use strict";var e=this,i=(e.$helpers,e.$escape),t=n.groupDomain,r="";return r+='<div data-node="noTopic" class="no-topic"> <div class="txt clearfix"><em class="icon">&#xe964;</em> <p><span>你还没相关话题哦,赶快去 <a href="',r+=i(t),r+='topic/publiser" target="_blank">发布话题 </a>吧</span></p> </div> </div>',new String(r)})}});
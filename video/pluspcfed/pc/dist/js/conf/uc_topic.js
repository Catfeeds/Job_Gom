webpackJsonp([17],{"17":function(n,exports,a){"use strict";(function($){var e,i,r=a(18),t=a(20),u=a(21),o={},l=function(n){for(var a=n.length,e=Math.ceil(a/24),i=[],r=0;r<e;r++){i[r]=[];var t=24*(r+1);t=t>a?a:t;for(var u=24*r;u<t;u++){var l=n[u];i[r].push(l),o[l.name]=l.url}}return{"page":new Array(e),"list":i}},c=function(n,a){m(0),$("[data-node=faceBox]").css({"left":n+"px","top":a+"px"}).show()},s=function(){$("[data-node=faceBox]").hide()},m=function(n){n=n||0,$("[data-action=facePage] > li").eq(n).addClass("active").siblings("li").removeClass("active"),$("[data-node=faceList] > div").eq(n).removeClass("hide").siblings("div").addClass("hide")},f=function(n,a){$("body").on("click","[data-face]",function(r){r.preventDefault(),r.stopPropagation(),e=$(this).data("face"),i=$(this).attr("src"),n({"reg":e,"url":i}),!1!==a&&$("[data-node=faceBox]").hide()})},p=function(n){var a=l(r),e=u(a);$("body").append(e),n()},d=function(){$("body").on("click","[data-node=faceBox]",function(n){n.stopPropagation()}),$(document).on("click",function(){$("[data-node=faceBox]").hide()}),$("[data-node=faceBox]").on("mouseenter","[data-action=facePage] > li",function(){var n=$(this).index();m(n)})},g=function(n){var a=/(\[([\s\S]+?)\])/g;return $.isEmptyObject(o)&&l(r),n.replace(a,function(n,a,e){var i=o[e];if(i)return'<img width="22" height="22" src="'+i+'" />';var r=t[e];return r?'<img width="22" height="22" src="'+r.url+'" />':n})},h=function(){p(d)};n.exports={"init":h,"insert":f,"show":c,"hide":s,"parseEmoji":g}}).call(exports,a(0))},"18":function(n,exports,a){"use strict";(function(a){var e=a.imgpath+"/images/emoji/",i=[{"name":"微笑","url":"weixiao"},{"name":"色","url":"se"},{"name":"亲亲","url":"qinqin"},{"name":"得意","url":"deyi"},{"name":"流泪","url":"liulei"},{"name":"害羞","url":"haixiu"},{"name":"闭嘴","url":"bizui"},{"name":"鼓掌","url":"guzhang"},{"name":"大哭","url":"daku"},{"name":"尴尬","url":"ganga"},{"name":"生气","url":"shengqi"},{"name":"调皮","url":"tiaopi"},{"name":"呲牙","url":"ciya"},{"name":"惊讶","url":"jingya"},{"name":"委屈","url":"weiqu"},{"name":"吐血","url":"tuxue"},{"name":"冷汗","url":"lenghan"},{"name":"抓狂","url":"zhuakuang"},{"name":"难过","url":"nanguo"},{"name":"偷笑","url":"touxiao"},{"name":"白眼","url":"baiyan"},{"name":"不屑","url":"buxie"},{"name":"快哭了","url":"kuaikule"}],r=[{"name":"困","url":"kun"},{"name":"装酷","url":"zhuangku"},{"name":"大笑","url":"daxiao"},{"name":"偷瞄","url":"toumiao"},{"name":"奋斗","url":"fendou"},{"name":"咒骂","url":"zhouma"},{"name":"疑问","url":"yiwen"},{"name":"晕","url":"yun"},{"name":"捶打","url":"chuida"},{"name":"再见","url":"zaijian"},{"name":"抠鼻","url":"koubi"},{"name":"发呆","url":"fadai"},{"name":"坏笑","url":"huaixiao"},{"name":"哈欠","url":"haqian"},{"name":"鄙视","url":"bishi"},{"name":"睡觉","url":"shuijiao"},{"name":"饿","url":"e"},{"name":"阴险","url":"yinxian"},{"name":"难受","url":"nanshou"},{"name":"可怜","url":"kelian"},{"name":"撇嘴","url":"piezui"},{"name":"石化","url":"shihua"},{"name":"泪眼","url":"leiyan"}],t=[{"name":"嘘","url":"xu"},{"name":"哼哼","url":"hengheng"},{"name":"爱慕","url":"aimu"},{"name":"财迷","url":"caimi"},{"name":"耶","url":"ye"},{"name":"思考","url":"sikao"},{"name":"骷髅","url":"kulou"},{"name":"痛哭","url":"tongku"},{"name":"恭喜","url":"gongxi"},{"name":"捂脸","url":"wulian"},{"name":"嘿哈","url":"heiha"},{"name":"机智","url":"jizhi"},{"name":"皱眉","url":"zhoumei"},{"name":"安慰","url":"anwei"},{"name":"飞吻","url":"feiwen"},{"name":"奸笑","url":"jianxiao"},{"name":"猪头","url":"zhutou"},{"name":"玫瑰","url":"meigui"},{"name":"凋谢","url":"diaoxie"},{"name":"爱心","url":"aixin"},{"name":"心碎","url":"xinsui"},{"name":"蛋糕","url":"dangao"},{"name":"喝水","url":"heshui"}],u=[{"name":"西瓜","url":"xigua"},{"name":"咖啡","url":"kafei"},{"name":"啤酒","url":"pijiu"},{"name":"包包","url":"baobao"},{"name":"高跟鞋","url":"gaogenxie"},{"name":"帽子","url":"maozi"},{"name":"口红","url":"kouhong"},{"name":"裙子","url":"qunzi"},{"name":"T恤","url":"txu"},{"name":"裤子","url":"kuzi"},{"name":"眼镜","url":"yanjing"},{"name":"太阳镜","url":"taiyangjing"},{"name":"蜡烛","url":"lazhu"},{"name":"礼物","url":"liwu"},{"name":"红包","url":"hongbao"},{"name":"拥抱","url":"yongbao"},{"name":"太阳","url":"taiyang"},{"name":"月亮","url":"yueliang"},{"name":"便便","url":"bianbian"},{"name":"炸弹","url":"zhadan"},{"name":"菜刀","url":"caidao"},{"name":"握手","url":"woshou"},{"name":"胜利","url":"shengli"}],o=[{"name":"赞","url":"zan"},{"name":"OK","url":"ok"},{"name":"勾引","url":"gouyin"},{"name":"NO","url":"no"},{"name":"打脸","url":"dalian"},{"name":"抱拳","url":"baoquan"},{"name":"乒乓球","url":"pingpangqiu"},{"name":"足球","url":"zuqiu"},{"name":"篮球","url":"lanqiu"}];n.exports=function(n){for(var a=0,i=n.length;a<i;a++){var r=n[a];r.url=e+r.url+".png"}return n}(i.concat(r,t,u,o))}).call(exports,a(1))},"20":function(n,exports,a){"use strict";(function(a){var e=a.imgpath+"/images/emoji/",i=".png",r={"亲":{"name":"亲亲","url":e+"qinqin"+i},"愤怒":{"name":"生气","url":e+"shengqi"+i},"惊恐":{"name":"惊讶","url":e+"jingya"+i},"迷茫":{"name":"委屈","url":e+"weiqu"+i},"伤心":{"name":"难过","url":e+"nanguo"+i},"努力":{"name":"奋斗","url":e+"fendou"+i},"YY":{"name":" 坏笑","url":e+"huaixiao"+i},"恶心":{"name":"难受","url":e+"nanshou"+i}};n.exports=r}).call(exports,a(1))},"21":function(n,exports,a){var e=a(3);n.exports=e("src/js/module/popup/face/face",function(n,a){"use strict";var e=this,i=(e.$helpers,e.$each),r=n.list,t=(n.v,n.i,n.face,n.$index,e.$escape),u=n.page,o="";return o+='<div data-node="faceBox" class="imoj-box" style="position: absolute;z-index: 9999;display:none"> <em class="sanjiao"></em> <div data-node="faceList" class="imoj-list"> ',i(r,function(n,a){o+=' <div class="imoj-content clearfix ',a&&(o+="hide"),o+='"> ',i(n,function(n,a){o+=' <a href="javascript:;"> <img width="22" height="22" data-face="[',o+=t(n.name),o+=']" src="',o+=t(n.url),o+='" alt="',o+=t(n.name),o+='" title="',o+=t(n.name),o+='"> </a> '}),o+=" </div> "}),o+=' </div> <ul data-action="facePage" class="pagination"> ',i(u,function(n,a){o+=" <li ",0==a&&(o+='class="active"'),o+=">",o+=t(a+1),o+="</li> "}),o+=" </ul> </div>",new String(o)})},"22":function(n,exports,a){"use strict";var e=function(n,a){return n?n.replace(a||/[&<">'](?:(amp|lt|ldquo|rdquo|quot|gt|#39|nbsp|#\d+);)?/g,function(n,a){return a?n:{"<":"&lt;","&":"&amp;",'"':"&quot;","“":"&ldquo;","”":"&rdquo;",">":"&gt;","'":"&#39;"}[n]}):""};n.exports=e},"3":function(n,exports){!function(){function a(n,a){return(/string|function/.test(typeof a)?l:o)(n,a)}function e(n,a){return"string"!=typeof n&&(a=typeof n,"number"===a?n+="":n="function"===a?e(n.call(n)):""),n}function i(n){return f[n]}function r(n){return e(n).replace(/&(?![\w#]+;)|[<>"']/g,i)}function t(n,a){if(p(n))for(var e=0,i=n.length;i>e;e++)a.call(n,n[e],e,n);else for(e in n)a.call(n,n[e],e)}function u(n,a){var e=/(\/)[^\/]+\1\.\.\1/,i=("./"+n).replace(/[^\/]+$/,""),r=i+a;for(r=r.replace(/\/\.\//g,"/");r.match(e);)r=r.replace(e,"/");return r}function o(n,e){var i=a.get(n)||c({"filename":n,"name":"Render Error","message":"Template not found"});return e?i(e):i}function l(n,a){if("string"==typeof a){var e=a;a=function(){return new m(e)}}var i=s[n]=function(e){try{return new a(e,n)+""}catch(n){return c(n)()}};return i.prototype=a.prototype=d,i.toString=function(){return a+""},i}function c(n){var a="{Template Error}",e=n.stack||"";if(e)e=e.split("\n").slice(0,2).join("\n");else for(var i in n)e+="<"+i+">\n"+n[i]+"\n\n";return function(){return"object"==typeof console&&console.error(a+"\n\n"+e),a}}var s=a.cache={},m=this.String,f={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},p=Array.isArray||function(n){return"[object Array]"==={}.toString.call(n)},d=a.utils={"$helpers":{},"$include":function(n,a,e){return n=u(e,n),o(n,a)},"$string":e,"$escape":r,"$each":t},g=a.helpers=d.$helpers;a.get=function(n){return s[n.replace(/^\.\//,"")]},a.helper=function(n,a){g[n]=a},n.exports=a}()},"4":function(n,exports,a){"use strict";(function($){var e=a(6),i=function(){},r=function(n,a){n=n||"",a=a||{};var r={"fixed":!0,"modal":!0,"autofocus":!1,"content":'<p class="del-pop-p">'+n+"</p>","className":"pop-box","okCls":"pc-btn pc-btnh35 circle-pop-btn","ok":i};$.extend(!0,r,a);var t=e(r),u=t._$("header"),o=t._$("title");return a.title||o.css("borderBottom","none"),u.show(),t.show(),t};n.exports=r}).call(exports,a(0))},"478":function(n,exports,a){"use strict";var e=a(479);a(25).setPageData("uc_topics"),e.init()},"479":function(n,exports,a){"use strict";(function($,e){var i=a(2),r=a(5);a(480)();var t=a(4),u=a(481),o=a(482),l=$("[data-node=content]"),c=$("[data-node=loading]"),s=$("[data-node=loadMore]"),m=$("[data-node=noMore]"),f=function(){var n=1,a=!1,f=!1,p=function(){s.hide(),c.show()},d=function(){c.hide(),m.show(),s.off()},g=function(){if(!a){if(f)return void d();a=!0,p(),i.get(r.get("getTopic"),{"data":{"pageNum":n,"pageSize":20}}).done(function(a){if(a.success){n++;var i={"content":a.data};$.isEmptyObject(a.data)?2===n?(f=!0,c.hide(),s.off(),l.append($(o({"groupDomain":e.group_domain})))):(f=!0,d()):(i.groupDomain=e.group_domain,l.append($(u({"contents":i}))),c.hide(),a.data.length<20?s.hide():s.show())}}).fail(function(){t("数据请求失败 请稍后尝试")}).always(function(){a=!1})}};g(),s.on("click",g)};n.exports={"init":f}}).call(exports,a(0),a(1))},"480":function(n,exports,a){"use strict";var e=a(3),i=a(22),r=a(17),t=function(n,a){var e=n;return n.length>a&&(e=e.substring(0,a)+"..."),r.parseEmoji(i(e))};n.exports=function(){e.helper("truncateLen",t)}},"481":function(n,exports,a){var e=a(3);n.exports=e("src/js/page/uc_topic/main/content",function(n,a){"use strict";var e=this,i=e.$helpers,r=e.$each,t=n.contents,u=(n.content,n.index,e.$escape),o="";return r(t.content,function(n,a){o+=" ",n.title&&n.title.length&&(o+=' <li><a href="',o+=u(t.groupDomain),o+="topic/",o+=u(n.topid),o+='.html" class="title" target="_blank">',o+=u(i.truncateLen(n.title,"40")),o+="</a><span>",o+=u(n.time),o+='</span> <p>发表自圈子: <a href="',o+=u(t.groupDomain),o+="circle/",o+=u(n.groupid),o+='.html" target="_blank">',o+=u(n.groupName),o+="</a></p> </li> "),o+=" "}),new String(o)})},"482":function(n,exports,a){var e=a(3);n.exports=e("src/js/page/uc_topic/main/noData",function(n,a){"use strict";var e=this,i=(e.$helpers,e.$escape),r=n.groupDomain,t="";return t+='<div data-node="noTopic" class="no-topic"> <div class="txt clearfix"><em class="iconn-55"></em> <p><span>你还没相关话题哦,赶快去 <a href="',t+=i(r),t+='topic/publiser" target="_blank">发布话题 </a>吧</span></p> </div> </div>',new String(t)})}},[478]);
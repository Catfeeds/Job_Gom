webpackJsonp([4],{0:function(a,s,l){var e=l(89),c=l(91);e.init(),c.init();var r=l(54);r.setPageData("groupList")},89:function(a,s,l){(function($,s){var e=l(2),c=l(28),r=l(90),o=[],i=$("[data-node=categoryName]"),p=$("[data-node=addMordList]"),n=$("[data-node=circleBox]"),t=$("[data-node=load]"),d=$("[data-node=loading]"),m=$("[data-node=noLoad]"),u=s.imgpath;s.group_domain;t.addClass("hide"),d.addClass("hide"),m.addClass("hide");var g=function(){var a=$("[data-node=circleNav]"),s=parseInt(a.position().top);$(window).scroll(function(){var a=$("[data-node=circleNav]");$(this).scrollTop()>s&&(a.css({position:"fixed","z-index":100}),a.addClass("topLy")),$(this).scrollTop()<s&&(a.css({position:"relative"}),a.removeClass("topLy"))}),N();var l=!1;v(1,20,41,l),i.on("click","li",function(){var a=!1,s=$(this);if(!s.children("a").hasClass("active")){i.children("li").children("a").removeClass("active"),s.children("a").addClass("active");var l=s.attr("data-id");"41"===l?v(1,20,41,a):h(1,20,l,a)}t.attr("data-loadId",l).attr("data-page",1)}),t.on("click",function(){var a=parseInt($(this).attr("data-page"))+1,s=$(this).attr("data-loadId"),l=!0;"41"===s?v(a,20,41,l):h(a,20,s,l),$(this).attr("data-page",a)}),p.on("click",function(){i.hasClass("h-auto")?(i.removeClass("h-auto"),$(this).children("span").html("更多＋"),$(this).children("em").addClass("icon-down").removeClass("icon-up")):(i.addClass("h-auto"),$(this).children("span").html("收起"),$(this).children("em").addClass("icon-up").removeClass("icon-down"))})},h=function(a,s,l,i){var i=i;t.addClass("hide").removeClass("show"),m.addClass("hide").removeClass("show"),i&&(d.addClass("show").removeClass("hide"),t.addClass("hide").removeClass("show")),e.post(c.get("groupLists")+"?type=1&page="+a+"&pagesize="+s+"&categoryid="+l).then(function(a){if(a.success){i?(d.addClass("show").removeClass("hide"),t.addClass("hide").removeClass("show")):n.empty(),o=[];for(var s=a.data.resultList,l=0;l<20;l++){if(s.length<20)if(l<s.length)var e={groupCategoryName:s[l].group.category.name,groupIcon:s[l].group.icon,groupId:s[l].group.id,groupIntro:s[l].group.introduction,groupMembers:s[l].group.memberQuantity,groupName:s[l].group.name,topicNum:s[l].group.topicQuantity,classShow:"show classColor"};else if(l==s.length)var e={groupCategoryName:"创建圈子",groupIcon:u+"/images/public/circle-default.png",groupId:"",groupIntro:"",groupMembers:"",groupName:"创建自己感兴趣的圈子",topicNum:"",classShow:"show classCreate"};else var e={groupCategoryName:"",groupIcon:"",groupId:"",groupIntro:"",groupMembers:"",groupName:"",topicNum:"",classShow:"hide classColor"};else var e={groupCategoryName:s[l].group.category.name,groupIcon:s[l].group.icon,groupId:s[l].group.id,groupIntro:s[l].group.introduction,groupMembers:s[l].group.memberQuantity,groupName:s[l].group.name,topicNum:s[l].group.topicQuantity,classShow:"show classColor"};e.groupIcon||(e.groupIcon=u+"/images/public/circle-default.png"),o.push(e)}var c={dataListAry:o};i||n.empty();var p=r(c);n.append(p);var g=$(".classCreate");g.removeClass("big-red1 big-blue big-red2 small-red1 small-red2  small-green2 small-blue small-green1 small-yellow1 big-yellow1 small-yellow2 "),g.children("p").empty(),g.children("p").append("<div>没有感兴趣的圈子？</div><div>去创建一个吧！</div>"),g.children(".hover-mask").children("a").children("span").removeClass("tag").addClass("pc-btn create-btn"),g.children(".hover-mask").children("a").children("ul").remove(),g.children(".hover-mask").children("a").attr("href","/index/create"),d.addClass("hide").removeClass("show"),s.length>19?t.addClass("show").removeClass("hide"):s.length<1&&m.addClass("show").removeClass("hide")}})},v=function(a,s,l,i){t.addClass("hide").removeClass("show"),m.addClass("hide").removeClass("show");var i=i;i&&(d.addClass("show").removeClass("hide"),t.addClass("hide").removeClass("show")),e.post(c.get("recommendCircle")+"?page="+a+"&pagesize="+s+"&metaid="+l).then(function(s){if(s.success){i?(d.addClass("show").removeClass("hide"),t.addClass("hide").removeClass("show")):n.empty(),o=[];for(var e=s.data.list[0].itemData,c=0;c<20;c++){if(e.length<20)if(c<e.length)var p={groupCategoryName:e[c].groupCategoryName,groupIcon:e[c].groupIcon,groupId:e[c].groupId,groupIntro:e[c].groupIntro,groupMembers:e[c].groupMembers,groupName:e[c].groupName,topicNum:e[c].topicNum,classShow:"show"};else if(c==e.length)var p={groupCategoryName:"创建圈子",groupIcon:u+"/images/public/circle-default.png",groupId:"",groupIntro:"",groupMembers:"",groupName:"创建自己感兴趣的圈子",topicNum:"",classShow:"show classCreate"};else var p={groupCategoryName:"",groupIcon:"",groupId:"",groupIntro:"",groupMembers:"",groupName:"",topicNum:"",classShow:"hide"};else var p={groupCategoryName:e[c].groupCategoryName,groupIcon:e[c].groupIcon,groupId:e[c].groupId,groupIntro:e[c].groupIntro,groupMembers:e[c].groupMembers,groupName:e[c].groupName,topicNum:e[c].topicNum,classShow:"show"};p.groupIcon||(p.groupIcon=u+"/images/public/circle-default.png"),o.push(p)}var g={dataListAry:o};i||n.empty();var h=r(g);n.append(h),t.attr("data-loadId",l).attr("data-page",a);var v=$(".classCreate");v.removeClass("big-red1  big-blue big-red2  big-yellow1 small-red1 small-red2 small-blue small-green1  small-green2 small-yellow1  small-yellow2 "),v.children("p").empty(),v.children("p").append("<div>没有感兴趣的圈子？</div><div>去创建一个吧！</div>"),v.children(".hover-mask").children("a").children("span").removeClass("tag").addClass("pc-btn create-btn"),v.children(".hover-mask").children("a").children("ul").remove(),v.children(".hover-mask").children("a").attr("href","/index/create"),d.addClass("hide").removeClass("show"),e.length>19?t.addClass("show").removeClass("hide"):e.length<1&&m.addClass("show").removeClass("hide")}})},N=function(){var a='<li data-id ="41"><a href="javascript:;" class="active">推荐</a></li>';e.post(c.get("categories")).then(function(s){if(s.success){for(var l=s.data,e=0;e<l.length;e++){var c=(l[e].icon,l[e].id),r=l[e].name;a+="<li data-id="+c+'><a href="javascript:;">'+r+"</a></li>"}i.empty(),i.append(a)}})};a.exports={init:g}}).call(s,l(1),l(4))},90:function(a,s,l){var e=l(26);a.exports=e("src/js/page/categoryList/categoryArray",function(a,s){"use strict";var l=this,e=(l.$helpers,l.$escape),c=a.dataListAry,r="";return r+=' <div class="circle-square-table clearfix">  <div class="circle-big big-red1 hover ',r+=e(c[0].classShow),r+='" data-node="divNum_1"><img src="',r+=e(c[0].groupIcon),r+='" class="head"> <p class="circle-title">',r+=e(c[0].groupName),r+='</p> <div class="hover-type-big hover-mask"><a href="/circle/',r+=e(c[0].groupId),r+='.html" target="_black"> <h2 class="circle-type">',r+=e(c[0].groupName),r+='</h2><span class="tag">',r+=e(c[0].groupCategoryName),r+='</span> <ul class="num clearfix"> <li><span class="count">',r+=e(c[0].groupMembers),r+='</span><span class="name">成员</span></li> <li><span class="count">',r+=e(c[0].topicNum),r+='</span><span class="name">话题</span></li> </ul></a></div> </div> <div class="small-wrap">  <div class="circle-small small-red1 hover ',r+=e(c[1].classShow),r+='" data-node="divNum_2"><img src="',r+=e(c[1].groupIcon),r+='" class="head"> <p class="circle-title">',r+=e(c[1].groupName),r+='</p> <div class="hover-type-small hover-mask"><a href="/circle/',r+=e(c[1].groupId),r+='.html" target="_black"> <h2 class="circle-type">',r+=e(c[1].groupName),r+='</h2><span class="tag">',r+=e(c[1].groupCategoryName),r+='</span> <ul class="num clearfix"> <li><span class="count">',r+=e(c[1].groupMembers),r+='</span><span class="name">成员</span></li> <li><span class="count">',r+=e(c[1].topicNum),r+='</span><span class="name">话题</span></li> </ul></a></div> </div>  <div class="circle-small small-blue hover ',r+=e(c[2].classShow),r+='" data-node="divNum_2"><img src="',r+=e(c[2].groupIcon),r+='" class="head"> <p class="circle-title">',r+=e(c[2].groupName),r+='</p> <div class="hover-type-small hover-mask"><a href="/circle/',r+=e(c[2].groupId),r+='.html" target="_black"> <h2 class="circle-type">',r+=e(c[2].groupName),r+='</h2><span class="tag">',r+=e(c[2].groupCategoryName),r+='</span> <ul class="num clearfix"> <li><span class="count">',r+=e(c[2].groupMembers),r+='</span><span class="name">成员</span></li> <li><span class="count">',r+=e(c[2].topicNum),r+='</span><span class="name">话题</span></li> </ul></a></div> </div> </div> <div class="small-wrap">  <div class="circle-small small-green1 hover ',r+=e(c[3].classShow),r+='" data-node="divNum_3"><img src="',r+=e(c[3].groupIcon),r+='" class="head"> <p class="circle-title">',r+=e(c[3].groupName),r+='</p> <div class="hover-type-small hover-mask"><a href="/circle/',r+=e(c[3].groupId),r+='.html" target="_black"> <h2 class="circle-type">',r+=e(c[3].groupName),r+='</h2><span class="tag">',r+=e(c[3].groupCategoryName),r+='</span> <ul class="num clearfix"> <li><span class="count">',r+=e(c[3].groupMembers),r+='</span><span class="name">成员</span></li> <li><span class="count">',r+=e(c[3].topicNum),r+='</span><span class="name">话题</span></li> </ul></a></div> </div>  <div class="circle-small small-yellow1 hover ',r+=e(c[4].classShow),r+='" data-node="divNum_5"><img src="',r+=e(c[4].groupIcon),r+='" class="head"> <p class="circle-title">',r+=e(c[4].groupName),r+='</p> <div class="hover-type-small hover-mask"><a href="/circle/',r+=e(c[4].groupId),r+='.html" target="_black"> <h2 class="circle-type">',r+=e(c[4].groupName),r+='</h2><span class="tag">',r+=e(c[4].groupCategoryName),r+='</span> <ul class="num clearfix"> <li><span class="count">',r+=e(c[4].groupMembers),r+='</span><span class="name">成员</span></li> <li><span class="count">',r+=e(c[4].topicNum),r+='</span><span class="name">话题</span></li> </ul></a></div> </div> </div> </div> <div class="circle-square-table clearfix"> <div class="small-wrap">  <div class="circle-small small-blue hover ',r+=e(c[5].classShow),r+='" data-node="divNum_6"><img src="',r+=e(c[5].groupIcon),r+='" class="head"> <p class="circle-title">',r+=e(c[5].groupName),r+='</p> <div class="hover-type-small hover-mask"><a href="/circle/',r+=e(c[5].groupId),r+='.html" target="_black"> <h2 class="circle-type">',r+=e(c[5].groupName),r+='</h2><span class="tag">',r+=e(c[5].groupCategoryName),r+='</span> <ul class="num clearfix"> <li><span class="count">',r+=e(c[5].groupMembers),r+='</span><span class="name">成员</span></li> <li><span class="count">',r+=e(c[5].topicNum),r+='</span><span class="name">话题</span></li> </ul></a></div> </div>  <div class="circle-small small-red2 hover ',r+=e(c[6].classShow),r+='" data-node="divNum_7"><img src="',r+=e(c[6].groupIcon),r+='" class="head"> <p class="circle-title">',r+=e(c[6].groupName),r+='</p> <div class="hover-type-small hover-mask"><a href="/circle/',r+=e(c[6].groupId),r+='.html" target="_black"> <h2 class="circle-type">',r+=e(c[6].groupName),r+='</h2><span class="tag">',r+=e(c[6].groupCategoryName),r+='</span> <ul class="num clearfix"> <li><span class="count">',r+=e(c[6].groupMembers),r+='</span><span class="name">成员</span></li> <li><span class="count">',r+=e(c[6].topicNum),r+='</span><span class="name">话题</span></li> </ul></a></div> </div> </div>  <div class="circle-big big-yellow1 hover ',r+=e(c[7].classShow),r+='" data-node="divNum_7"><img src="',r+=e(c[7].groupIcon),r+='" class="head"> <p class="circle-title">',r+=e(c[7].groupName),r+='</p> <div class="hover-type-big hover-mask"><a href="/circle/',r+=e(c[7].groupId),r+='.html" target="_black"> <h2 class="circle-type">',r+=e(c[7].groupName),r+='</h2><span class="tag">',r+=e(c[7].groupCategoryName),r+='</span> <ul class="num clearfix"> <li><span class="count">',r+=e(c[7].groupMembers),r+='</span><span class="name">成员</span></li> <li><span class="count">',r+=e(c[7].topicNum),r+='</span><span class="name">话题</span></li> </ul></a></div> </div> <div class="small-wrap">  <div class="circle-small small-yellow2 hover ',r+=e(c[8].classShow),r+='" data-node="divNum_8"><img src="',r+=e(c[8].groupIcon),r+='" class="head"> <p class="circle-title">',r+=e(c[8].groupName),r+='</p> <div class="hover-type-small hover-mask"><a href="/circle/',r+=e(c[8].groupId),r+='.html" target="_black"> <h2 class="circle-type">',r+=e(c[8].groupName),r+='</h2><span class="tag">',r+=e(c[8].groupCategoryName),r+='</span> <ul class="num"> <li><span class="count">',r+=e(c[8].groupMembers),r+='</span><span class="name">成员</span></li> <li><span class="count">',r+=e(c[8].topicNum),r+='</span><span class="name">话题</span></li> </ul></a></div> </div>  <div class="circle-small small-red2 hover ',r+=e(c[9].classShow),r+='" data-node="divNum_9"><img src="',r+=e(c[9].groupIcon),r+='" class="head"> <p class="circle-title">',r+=e(c[9].groupName),r+='</p> <div class="hover-type-small hover-mask"><a href="/circle/',r+=e(c[9].groupId),r+='.html" target="_black"> <h2 class="circle-type">',r+=e(c[9].groupName),r+='</h2><span class="tag">',r+=e(c[9].groupCategoryName),r+='</span> <ul class="num"> <li><span class="count">',r+=e(c[9].groupMembers),r+='</span><span class="name">成员</span></li> <li><span class="count">',r+=e(c[9].topicNum),r+='</span><span class="name">话题</span></li> </ul></a></div> </div> </div> </div> <div class="circle-square-table clearfix"> <div class="small-wrap">  <div class="circle-small small-blue hover ',r+=e(c[10].classShow),r+='" data-node="divNum_11"><img src="',r+=e(c[10].groupIcon),r+='" class="head"> <p class="circle-title">',r+=e(c[10].groupName),r+='</p> <div class="hover-type-small hover-mask"><a href="/circle/',r+=e(c[10].groupId),r+='.html" target="_black"> <h2 class="circle-type">',r+=e(c[10].groupName),r+='</h2><span class="tag">',r+=e(c[10].groupCategoryName),r+='</span> <ul class="num"> <li><span class="count">',r+=e(c[10].groupMembers),r+='</span><span class="name">成员</span></li> <li><span class="count">',r+=e(c[10].topicNum),r+='</span><span class="name">话题</span></li> </ul></a></div> </div>  <div class="circle-small small-green2 hover ',r+=e(c[11].classShow),r+='" data-node="divNum_12"><img src="',r+=e(c[11].groupIcon),r+='" class="head"> <p class="circle-title">',r+=e(c[11].groupName),r+='</p> <div class="hover-type-small hover-mask"><a href="/circle/',r+=e(c[11].groupId),r+='.html" target="_black"> <h2 class="circle-type">',r+=e(c[11].groupName),r+='</h2><span class="tag">',r+=e(c[11].groupCategoryName),r+='</span> <ul class="num"> <li><span class="count">',r+=e(c[11].groupMembers),r+='</span><span class="name">成员</span></li> <li><span class="count">',r+=e(c[11].topicNum),r+='</span><span class="name">话题</span></li> </ul></a></div> </div> </div>  <div class="circle-big big-blue hover ',r+=e(c[12].classShow),r+='" data-node="divNum_13"><img src="',r+=e(c[12].groupIcon),r+='" class="head"> <p class="circle-title">',r+=e(c[12].groupName),r+='</p> <div class="hover-type-big hover-mask"><a href="/circle/',r+=e(c[12].groupId),r+='.html" target="_black"> <h2 class="circle-type">',r+=e(c[12].groupName),r+='</h2><span class="tag">',r+=e(c[12].groupCategoryName),r+='</span> <ul class="num clearfix"> <li><span class="count">',r+=e(c[12].groupMembers),r+='</span><span class="name">成员</span></li> <li><span class="count">',r+=e(c[12].topicNum),r+='</span><span class="name">话题</span></li> </ul></a></div> </div> <div class="small-wrap">  <div class="circle-small small-yellow2 hover ',r+=e(c[13].classShow),r+='" data-node="divNum_14"><img src="',r+=e(c[13].groupIcon),r+='" class="head"> <p class="circle-title">',r+=e(c[13].groupName),r+='</p> <div class="hover-type-small hover-mask"><a href="/circle/',r+=e(c[13].groupId),r+='.html" target="_black"> <h2 class="circle-type">',r+=e(c[13].groupName),r+='</h2><span class="tag">',r+=e(c[13].groupCategoryName),r+='</span> <ul class="num"> <li><span class="count">',r+=e(c[13].groupMembers),r+='</span><span class="name">成员</span></li> <li><span class="count">',r+=e(c[13].topicNum),r+='</span><span class="name">话题</span></li> </ul></a></div> </div>  <div class="circle-small small-red2 hover ',r+=e(c[14].classShow),r+='" data-node="divNum_15"><img src="',r+=e(c[14].groupIcon),r+='" class="head"> <p class="circle-title">',r+=e(c[14].groupName),r+='</p> <div class="hover-type-small hover-mask"><a href="/circle/',r+=e(c[14].groupId),r+='.html" target="_black"> <h2 class="circle-type">',r+=e(c[14].groupName),r+='</h2><span class="tag">',r+=e(c[14].groupCategoryName),r+='</span> <ul class="num"> <li><span class="count">',r+=e(c[14].groupMembers),r+='</span><span class="name">成员</span></li> <li><span class="count">',r+=e(c[14].topicNum),r+='</span><span class="name">话题</span></li> </ul></a></div> </div> </div> </div> <div class="circle-square-table clearfix">  <div class="circle-big big-red2 hover ',r+=e(c[15].classShow),r+='" data-node="divNum_16"><img src="',r+=e(c[15].groupIcon),r+='" class="head"> <p class="circle-title">',r+=e(c[15].groupName),r+='</p> <div class="hover-type-big hover-mask"><a href="/circle/',r+=e(c[15].groupId),r+='.html" target="_black"> <h2 class="circle-type">',r+=e(c[15].groupName),r+='</h2><span class="tag">',r+=e(c[15].groupCategoryName),r+='</span> <ul class="num clearfix"> <li><span class="count">',r+=e(c[15].groupMembers),r+='</span><span class="name">成员</span></li> <li><span class="count">',r+=e(c[15].topicNum),r+='</span><span class="name">话题</span></li> </ul></a></div> </div> <div class="small-wrap">  <div class="circle-small small-red1 hover ',r+=e(c[16].classShow),r+='" data-node="divNum_17"><img src="',r+=e(c[16].groupIcon),r+='" class="head"> <p class="circle-title">',r+=e(c[16].groupName),r+='</p> <div class="hover-type-small hover-mask"><a href="/circle/',r+=e(c[16].groupId),r+='.html" target="_black"> <h2 class="circle-type">',r+=e(c[16].groupName),r+='</h2><span class="tag">',r+=e(c[16].groupCategoryName),r+='</span> <ul class="num"> <li><span class="count">',r+=e(c[16].groupMembers),r+='</span><span class="name">成员</span></li> <li><span class="count">',r+=e(c[16].topicNum),r+='</span><span class="name">话题</span></li> </ul></a></div> </div>  <div class="circle-small small-blue hover ',r+=e(c[17].classShow),r+='" data-node="divNum_18"><img src="',r+=e(c[17].groupIcon),r+='" class="head"> <p class="circle-title">',r+=e(c[17].groupName),r+='</p> <div class="hover-type-small hover-mask"><a href="/circle/',r+=e(c[17].groupId),r+='.html" target="_black"> <h2 class="circle-type">',r+=e(c[17].groupName),r+='</h2><span class="tag">',r+=e(c[17].groupCategoryName),r+='</span> <ul class="num"> <li><span class="count">',r+=e(c[17].groupMembers),r+='</span><span class="name">成员</span></li> <li><span class="count">',r+=e(c[17].topicNum),r+='</span><span class="name">话题</span></li> </ul></a></div> </div> </div> <div class="small-wrap">  <div class="circle-small small-green2 hover ',r+=e(c[18].classShow),r+='" data-node="divNum_19"><img src="',r+=e(c[18].groupIcon),r+='" class="head"> <p class="circle-title">',r+=e(c[18].groupName),r+='</p> <div class="hover-type-small hover-mask"><a href="/circle/',r+=e(c[18].groupId),r+='.html" target="_black"> <h2 class="circle-type">',r+=e(c[18].groupName),r+='</h2><span class="tag">',r+=e(c[18].groupCategoryName),r+='</span> <ul class="num"> <li><span class="count">',r+=e(c[18].groupMembers),r+='</span><span class="name">成员</span></li> <li><span class="count">',r+=e(c[18].topicNum),r+='</span><span class="name">话题</span></li> </ul></a></div> </div>  <div class="circle-small small-yellow1 hover ',r+=e(c[19].classShow),r+='" data-node="divNum_20"><img src="',r+=e(c[19].groupIcon),r+='" class="head"> <p class="circle-title">',r+=e(c[19].groupName),r+='</p> <div class="hover-type-small hover-mask"><a href="/circle/',r+=e(c[19].groupId),r+='.html" target="_black"> <h2 class="circle-type">',r+=e(c[19].groupName),r+='</h2><span class="tag">',r+=e(c[19].groupCategoryName),r+='</span> <ul class="num"> <li><span class="count">',r+=e(c[19].groupMembers),r+='</span><span class="name">成员</span></li> <li><span class="count">',r+=e(c[19].topicNum),r+='</span><span class="name">话题</span></li> </ul></a></div> </div> </div> </div>',new String(r)})},91:function(a,s,l){(function($){var s=l(3),e=l(42),c=$("[data-node=createCircle]"),r=function(){var a=c.attr("href");window.location.href=a},o=function(){c.on("click",function(){if(!e())return s({onLogin:r}),!1})};a.exports={init:o}}).call(s,l(1))}});
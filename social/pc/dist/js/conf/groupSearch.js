webpackJsonp([14],{0:function(a,e,i){(function($,a){"use strict";var e=i(2),t=i(28),n=i(209),o=i(37);i(210)();var s=$("[data-node=groupWrap]"),c=s.data("keyword"),r=$("[data-action=loadMore]"),d=$("[data-node=loading]"),p=i(56);p.setPageData("searchGroup");var u=!1,l=2,g=!1,h=function(){r.hide(),d.show()},f=function(){r.find("span").html("没有更多数据"),r.off().show(),d.hide()},v=function(){$("[data-node=groupWrap]").on("click","[data-node=groupList]",function(e){$(e.target).closest("a",this).length||window.open(a.group_domain+"circle/"+$(this).attr("data-id")+".html")})},m=function(){if(!u)return g?void f():(u=!0,h(),e.get(t.get("searchGroup"),{data:{keyword:c,page:l,pagesize:20}}).done(function(a){if(200===a.code){l++;var e=a.data.groups||[];if(0==e.length)g=!0,f();else{e.keyword=c;var i=n({groups:e});d.hide(),s.append(i),e.length<20?f():r.show()}}}).fail(function(){o("数据请求失败 请稍后尝试")}).always(function(){u=!1}),!1)},w=function(){r.on("click",m),v()};w()}).call(e,i(1),i(4))},209:function(a,e,i){var t=i(26);a.exports=t("src/js/page/groupSearch/group",function(a,e){"use strict";var i=this,t=i.$helpers,n=i.$each,o=a.groups,s=(a.group,a.index,i.$escape),c="";return n(o,function(a,e){c+=" <div class=\"shop-list\" data-node='groupList' data-id='",c+=s(a.id),c+='\'> <div class="mg-negative"> <!--<a data-node="share" href="javascript:;" class="a-share search-circle-share" data-surl="topic/index?gid=',c+=s(a.groupId),c+='" data-stitle="',c+=s(a.name),c+='" data-spic="',c+=s(t.showPic(a.groupIcon)),c+='"> <em class="icon icon-share"></em>分享到</a> --> <div class="user-head"> <a target="_blank" href="/circle/',c+=s(a.id),c+='.html" bp-data=\'{"event_id": "G000P006", "s_word": "',c+=s(o.keyword),c+='", "group_id": "',c+=s(a.id),c+='", "s_type": "group"}\'><img src="',c+=s(t.showPic(a.icon,"circle-default.png")),c+='" title="',c+=s(a.category.name),c+='"></a> </div> <h3 class="user-name">',c+=s(a.name),c+='</h3> <div><span class="pc-btn pc-bj-fc8753 circle-type">',c+=s(a.category.name),c+='</span></div> <div class="user-top-info"> <ul class="clearfix"> <li>成员：<span>',c+=s(a.memberQuantity),c+="</span></li> <li>话题：<span>",c+=s(a.topicQuantity),c+="</span></li> </ul> </div> </div> </div> "}),new String(c)})},210:function(a,e,i){(function(e){"use strict";var t=i(26),n=function(a,i){return""===a?e.imgpath+"/images/public/"+i:a};a.exports=function(){t.helper("showPic",n)}}).call(e,i(4))}});
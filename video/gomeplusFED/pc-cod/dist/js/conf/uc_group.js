webpackJsonp([34],{0:function(e,n,i){var t=i(246),a=i(54);a.setPageData("uc_circle"),t.init()},156:function(e,n,i){(function(n){var t=i(26),a=function(e,i){return""===e?n.imgpath+"/images/public/"+i:e};e.exports=function(){t.helper("showPic",a)}}).call(n,i(4))},246:function(e,n,i){(function($,n){var t=i(2),a=i(28),c=i(36),o=i(35);i(156)();var d=i(247),r=i(248),s=i(249),l=function(){$content=$("[data-node=content]"),$createdCircle=$content.find("[data-node=createdCircle]"),$joinedCircle=$content.find("[data-node=joinedCircle]"),$createdTitle=$content.find("[data-node=createdTitle]"),$loading=$content.find("[data-node=loading]"),$loadMore=$content.find("[data-node=loadMore]"),$noMore=$content.find("[data-node=noMore]");var e=function(e){"joined"===e?$content.append(s({url_domain:n.group_domain})):"created"===e&&$content.prepend(r({url_domain:n.group_domain}))},i=function(i,t){0===i.length?($loading.hide(),e(t)):($loading.hide(),i.group_domain=n.group_domain,"created"===t?$createdCircle.append(d({contents:i})).show():"joined"===t&&$joinedCircle.append(d({contents:i})).show())},l=function(e){e.length>=10?c(o.createCircle.upperLimit):t.get(a.get("canCreate"),{async:!1}).done(function(e,i,t){e.success?1==e.check?window.open(n.group_domain+"/index/create"):c(o.createCircle.upperLimit):c("数据请求失败 请稍后尝试")}).fail(function(e,n,i){c("数据请求失败 请稍后尝试")})};t.get(a.get("getJoinedCircle")).done(function(e,t,a){if(e.success){var o=e.imaster,d=e.imember;i(o,"created"),i(d,"joined"),$("[data-node=btnCreate]").on("click",function(){l(o)}),$("[data-node=user-name]").on("click",function(e){window.open(n.group_domain+"circle/"+$(e.target).data("id")+".html")})}else c("数据请求失败 请稍后尝试"),$loading.hide(),$noMore.show()}).fail(function(e,n,i){c("数据请求失败 请稍后尝试")})};e.exports={init:l}}).call(n,i(1),i(4))},247:function(e,n,i){var t=i(26);e.exports=t("src/js/page/uc_group/main/content",function(e,n){"use strict";var i=this,t=i.$helpers,a=i.$each,c=e.contents,o=(e.content,e.index,i.$escape),d="";return a(c,function(e,n){d+=' <div class="circle-list" data-id="',d+=o(e.id),d+='"> <div class="mg-negative"> <div class="user-head"><a href="',d+=o(c.group_domain),d+="circle/",d+=o(e.id),d+='.html" target="_blank"><img src="',d+=o(t.showPic(e.icon,"circle-default.png")),d+='" alt=""></a></div> <h3 class="user-name" data-node="user-name" data-id ="',d+=o(e.id),d+='" >',d+=o(e.name),d+='</h3> <div class="user-top-info"> <ul class="clearfix"> <li> <strong>',d+=o(e.memberQuantity),d+="</strong> <p>成员</p> </li> <li> <strong>",d+=o(e.topicQuantity),d+="</strong> <p>话题</p> </li> </ul> </div> </div> </div> "}),new String(d)})},248:function(e,n,i){var t=i(26);e.exports=t("src/js/page/uc_group/main/no_created",'<div data-node="noCreated" class="circle-index-list clearfix"> <div class="usercircle-title"> <h2>我创建的圈子</h2><a href="javascript:;" data-node="btnCreate" class="right">创建圈子</a> </div> <div class="no-topic"> <div class="txt clearfix"><em class="icon">&#xe94b;</em> <p> <span>您还没创建圈子，赶快 <a href="javascript:;" data-node="btnCreate">创建圈子 </a>吧！</span></p> </div> </div> </div>')},249:function(e,n,i){var t=i(26);e.exports=t("src/js/page/uc_group/main/no_joined",function(e,n){"use strict";var i=this,t=(i.$helpers,i.$escape),a=e.url_domain,c="";return c+='<div data-node="noJoined" class="circle-index-list clearfix"> <div class="usercircle-title"> <h2>我加入的圈子</h2> </div> <div class="no-topic"> <div class="txt clearfix"><em class="icon">&#xe94b;</em> <p> <span>您还没有加入任何的圈子，赶快 <a href="',c+=t(a),c+='index" target="_blank">加入圈子 </a>吧！</span></p> </div> </div> </div>',new String(c)})}});
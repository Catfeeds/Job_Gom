!function(t,e){function a(){var t={"//js.dev.meixincdn.com:1314/CDN8053/":"pre","//js.meixincdn.com/m/pc/":"online"},e="undefined"!=typeof gomeplusCdn?gomeplusCdn:"//js.meixincdn.com/m/pc/";switch(this.wrapQueue=[],this.loadedSum=0,this.currentHostType=t[e],this.token=decodeURIComponent(n.getCookie("mx_pc_uid_token")),this.currentHostType){case"pre":this.apiLink="//api-pluspc.atguat.com.cn/widget/index",this.link=e+"dist/";break;default:this.apiLink="//api-pluspc.gome.com.cn/widget/index",this.link=e+"dist/"}}var n={loadCss:function(t){var e=t.url,a="function"==typeof t.callback?t.callback:function(){},o=t.id,i=document.createElement("link"),r="onload"in i,d=+navigator.userAgent.replace(/.*(?:AppleWebKit|AndroidWebKit)\/?(\d+).*/i,"$1")<536;if(i.rel="stylesheet",i.type="text/css",i.href=e,void 0!==o&&(i.id=o),document.getElementsByTagName("head")[0].appendChild(i),d||!r)return void setTimeout(function(){n.pollCss(i,a,0)},1);r?(i.onload=function(){n.onload(i,a)},i.onerror=function(){n.onload(i,a)}):i.onreadystatechange=function(){/loaded|complete/.test(i.readyState)&&n.onload(i,a)}},onload:function(t,e){t.onload=t.onerror=t.onreadystatechange=null,t=null,e()},pollCss:function(t,e,a){var o,i=t.sheet;if((a+=1)>protectNum)return o=!0,t=null,void e();if(isOldWebKit)i&&(o=!0);else if(i)try{i.cssRules&&(o=!0)}catch(t){"NS_ERROR_DOM_SECURITY_ERR"===t.name&&(o=!0)}setTimeout(function(){o?e():n.pollCss(t,e,a)},20)},transformStr3:function(t){var e=/_(\w)/g;return t.replace(e,function(t,e){return e.toUpperCase()})},getCookie:function(t){for(var e,a=document.cookie.split(";"),n={},o=a.length-1;o>=0;o--)e=a[o].split("="),n[e[0]]=e[1];return decodeURIComponent(n[t])}};a.prototype={constructor:a,loaded:function(e){var a=this;if(e.loadSum===e.loadedNum){var o=$('[data-template="'+e.templateName+'"]'),i=t.resourceNiche[n.transformStr3(e.templateName)];if("html"===e.type&&""!==e.html){o[0].innerHTML=e.html,e.wrap.trigger(e.templateName);o.find("img").error(function(){$(this).attr("src","//app.gomein.net.cn/images/grey.gif")})}a.loadedSum++,o.attr("data-loaded","1").attr("data-loading","0"),setTimeout(function(){o.css("height","auto"),3===e.loadSum&&i&&i()},200)}},isInScreen:function(e){var a=$(t).scrollTop(),n=$(t).height();return e.offset().top-a-50<n},getContent:function(e){var a,o,i,r,d,l,s,c="",u=this,p=2,m=0,f=e.attr("data-template");e.attr("data-push","1"),e.attr("data-loading","1"),$.ajax({url:u.apiLink,type:"GET",dataType:"jsonp",data:{tplname:f},success:function(h){200===h.code&&(s=h.data.type,a=n.transformStr3(h.data.tplName),o="widget/"+a+"/css/"+a+".css?version="+h.data.version,i=u.link.replace("js.","css.")+o,r=u.link+o.replace(/css/g,"js"),m++,"html"===h.data.type?c=h.data.data:(d=a+"Data",l=a+"Element",t[d]=h,t[l]=e),0!==h.data.isScript&&(p=3,$.getScript(r,function(){m++,u.loaded({loadSum:p,loadedNum:m,wrap:e,templateName:f,html:c,type:s})})),n.loadCss({url:i,callback:function(){m++,u.loaded({loadSum:p,loadedNum:m,wrap:e,templateName:f,html:c,type:s})}}))},error:function(t){}})},autoAppend:function(t){for(var e,a=t?$(t):$(".pluspc_template"),n=0,o=a.length;n<o;n++)e=a.eq(n),"1"!==e.attr("data-push")&&this.wrapQueue.push(e),"1"!==e.attr("data-loaded")&&"1"!==e.attr("data-loading")&&this.isInScreen(e)&&this.getContent(e)},render:function(t){this.autoAppend(t)},scroll:function(){var e=this;$(t).on("scroll",function(){if(e.loadedSum!==e.wrapQueue.length)for(var t=e.wrapQueue.length-1;t>=0;t--)$wrap=e.wrapQueue[t],e.isInScreen($wrap)&&"1"!==$wrap.attr("data-loaded")&&"1"!==$wrap.attr("data-loading")&&e.getContent($wrap)})},init:function(){this.autoAppend(),this.scroll()}},$(function(){t.resourceNiche=new a,resourceNiche.init()})}(window);
webpackJsonp([47],{"0":function(s,exports,t){(function($){"use strict";$(function(){t(347).init(),t(348).init(),t(349).init()})}).call(exports,t(2))},"44":function(s,exports,t){(function($){"use strict";var t,o,n,a=function(){t.off().on("click",function(){t.hide(),o.hide()}),o.off().on("click",function(){t.hide(),o.hide()})},i=function(s,i){var e={"duration":2e3,"callback":function(){}};$.extend(e,i||{}),clearTimeout(n),t=$('[data-action="publicMask"]'),o=$('[data-action="publicTips"]'),t.length>0?(t.show(),o.show().text(s)):($("body").append('<div data-action="publicMask" class="ordi-toast"></div><div class="ordi-toast-txt" data-action="publicTips">'+s+"</div>"),t=$('[data-action="publicMask"]'),o=$('[data-action="publicTips"]'),a()),o.css("margin",-o[0].offsetHeight/2+"px 0 0 "+-o.width()/2+"px"),n=setTimeout(function(){t.hide(),o.hide(),e.callback()},e.duration)};s.exports={"init":i,"events":a}}).call(exports,t(2))},"347":function(s,exports,t){(function($,o){"use strict";var n=t(21),a=t(44),i=t(24);s.exports={"init":function(){$(".J-goods-list").on("click",".J-good-sold",function(){var s=$(this);if(!s.hasClass("solding")){s.addClass("solding");var t=s.attr("data-status");"0"===t?s.text("上架中..."):s.text("下架中..."),n.get(i.get("soldInOut"),{"data":{"shopId":o.shopId,"itemId":s.attr("data-itemId"),"skuId":s.attr("data-skuId"),"identification":s.attr("data-identification"),"status":t}}).then(function(o){if(o&&200===o.code){var n="0"===t?"已上架":"上架",i="0"===t?"user-goods-down J-good-sold":"user-goods-up J-good-sold",e="0"===t?"1":"0";$('[data-itemId="'+s.attr("data-itemId")+'"]').text(n).attr("class",i).attr("data-status",e)}else a.init("抱歉，操作失败，请重试"),"0"===t?s.text("上架"):s.text("已上架");s.removeClass("solding")},function(){a.init("抱歉，操作失败，请重试"),s.removeClass("solding")})}})}}}).call(exports,t(2),t(3))},"348":function(s,exports,t){(function(o,$){"use strict";function n(s,n,a){for(var i="",e=0,d=s.length;e<d;e++){var c="https://item.gome.com.cn/"+s[e].id+"-"+s[e].skuID+".html?"+(s[e].trId?"stid="+s[e].trId:"")+"&mid="+o.shopId;i+='<li>\n                  \t<div class="clearfix user-goods-good">\n                  \t\t<a href="'+c+'" target="_blank">\n                  \t\t\t<img src="'+s[e].imageUrl+'">\n                  \t\t</a>\n                  \t</div>\n                  \t<div class="clearfix user-goods-goods">',1===s[e].flag?i+='<span class="user-goods-main">自营</span>':2===s[e].flag?i+='<span class="user-goods-rival">海外购</span>':3===s[e].flag&&(i+='<span class="user-goods-shop">门店</span>'),i+='<a href="'+c+'" target="_blank" title="'+s[e].name+'">'+s[e].name+'</a>\n                  \t</div>\n                  \t<div class="user-goods-priceBox clearfix">\n                  \t\t<span class="user-goods-price">￥'+s[e].price+' </span>\n                  \t</div>\n                  \t<div class="user-goods-info clearfix">\n                      \t<span class="user-goods-ret">\n                      \t\t<span>佣金</span>\n                      \t\t<span class="user-goods-rnum">最高￥'+(parseInt(s[e].commission)/100).toFixed(2)+'</span>\n                      \t</span>\n                    </div>\n                    <div class="up-btn">\n                      <a class="user-goods-'+(s[e].onShelf?"down":"up")+' J-good-sold" href="javascript:;" data-itemid="'+s[e].id+'" data-skuid="'+s[e].skuID+'" data-identification="'+s[e].identification+'" data-status="'+Number(s[e].onShelf)+'"> '+(s[e].onShelf?"已":"")+"上架</a>\n                    </div>\n                </li>"}$(".J-goods-list").append(i),t(349).init(),a.call()}var a=t(21),i=t(24),e=t(44),d=2,c=null;s.exports={"init":function(){$(".J-goods-getMore").on("click",function(){var s=$(this);s.find(".user-goods-moreLoding").length||s.hasClass("user-goods-normal")||(s.addClass("more-loading"),s.html('<span class="user-goods-moreLoding">加载中...</span>'),c||0===o.type?(console.log("2"),n(c.items.splice(0,18),o.type,function(){var t=0==c.items.length?"没有更多商品了":'<span class="user-goods-moreLogo"><span class="user-goods-moreIcon">点击加载更多商品</span></span>',o=0==c.items.length?"user-goods-normal":"";s.html(t).addClass(o)})):a.get(i.get("hotGoods")+o.type+"&pageNum="+d,{}).then(function(t){t&&("0"!==o.type?n(t.items,o.type,function(){var o=0==t.items.length?"没有更多商品了":'<span class="user-goods-moreLogo"><span class="user-goods-moreIcon">点击加载更多商品</span></span>',n=0==t.items.length?"user-goods-normal":"";s.html(o).addClass(n),d++}):(c=t,c.items.splice(0,18),n(c.items.splice(0,18),o.type,function(){var t='<span class="user-goods-moreLogo"><span class="user-goods-moreIcon">点击加载更多商品</span></span>';s.html(t)})))},function(t){e.init("数据获取失败，请重试"),s.html('<span class="user-goods-moreLogo"><span class="user-goods-moreIcon">点击加载更多商品</span></span>')}))})}}}).call(exports,t(3),t(2))},"349":function(s,exports,t){(function($,t){"use strict";s.exports={"init":function(){$(".J-goods-list img").on("load",function(){$(this).attr("src").indexOf("opacity4")===-1&&$(this).css("background","none")}).on("error",function(){$(this).attr("src",t.imgpath+"/images/public/opacity4.png")})}}}).call(exports,t(2),t(3))}});
//# sourceMappingURL=userGoods.js.map
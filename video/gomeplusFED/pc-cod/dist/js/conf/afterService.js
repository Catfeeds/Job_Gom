webpackJsonp([1],{0:function(t,a,s){var e=s(56);e.init();var d=s(54);d.setPageData("uc_afterService")},53:function(t,a,s){(function($){var a=s(22),e=function(){},d=function(t,s){var d={fixed:!0,modal:!0,content:'<p class="del-pop-p">'+t+"</p>",className:"pop-box",okCls:"pc-btn pc-btnh35 circle-pop-btn",ok:e,cancel:e,btnWrapCls:"two-buttons"};$.extend(!0,d,s);var o=a(d);return o.show(),o};t.exports=d}).call(a,s(1))},56:function(t,a,s){(function($){var a=s(2),e=s(28),d=(s(57),s(58)),o=s(60),i=s(53),n=function(){var t=$("[data-node=afterServiceList]"),a=$("[data-node=loadList]"),s=$("[data-node=loading]"),e=$("[data-node=noList]");$(".pop-box-wrap");s.css("display","none"),e.css("display","none"),a.css("display","none"),o.getDateList(1,15),a.on("click",function(){var t=$(this).attr("data-page"),a=parseInt(t)+1;s.css("display","block"),o.getDateList(a,15),$(this).attr("data-page",a)}),t.on("click","[data-node=typedesc]",function(){var t=$(this).attr("data-id"),a=$(this).attr("data-orderid");$(this).hasClass("deliverGoods")?d(t):$(this).hasClass("checkLogistics")?($(this).attr("target","_black"),$(this).attr("href","/CustomerInfo/getOrderLogistics?orderId="+a+"&id="+t)):$(this).hasClass("shureGoods")?l(t):$(this).hasClass("checkLogisticsTwo")&&($(this).attr("target","_black"),$(this).attr("href","/CustomerInfo/getOrderLogistics?orderId="+a+"&id="+t))})},l=function(t){var s=t;i("确认收货",{width:600,height:90,fixed:!0,modal:!0,title:"确认收货",content:"<div class='del-pop-p' data-idShure="+s+" data-node='shureP'><div data-node='span_Msg'>确认收货？</div><div data-node='togoleDiv' class='hide' style='text-align:center;font-size:12px;color:red;'></div></div>",className:"pop-box pop-pad-btm65",okCls:"pc-btn pc-btnh40 pc-btnw120",cancelCls:"queren-btn pc-btnh40 pc-btnw120",ok:function(t){var s=$("[data-node=afterServiceList]");$("[data-node=togoleDiv]").html(""),$("[data-node=togoleDiv]").removeClass("show").addClass("hide");var d=$("[data-node=shureP]").attr("data-idShure");return a.get(e.get("buyCheckGoods")+"?id="+d).then(function(t){t.success?(s.children("tbody").empty(),o.getDateList(1,15),$("[data-node=loadList]").attr("data-page",1),$("button[i=close]").click()):($("[data-node=togoleDiv]").html("* 请求失败，请重新点击"),$("[data-node=togoleDiv]").removeClass("hide").addClass("show"))}),!1},btnWrapCls:"two-buttons"})};t.exports={init:n}}).call(a,s(1))},57:function(t,a,s){var e=s(26);t.exports=e("src/js/page/afterService/tableOrderList",function(t,a){"use strict";var s=this,e=(s.$helpers,s.$escape),d=t.id,o=s.$string,i=t.shop_name,n=t.shop_user,l=t.paymentAmount,c=t.totalPrice,r=t.typedesc,p=t.createTime,h=t.statusDesc,u=t.cilckStyle,g=t.orderid,m=t.showStatus,v=t.isThree,f=t.cilckStyleTow,y=t.showStatusTow,b="";return b+=' <tr> <td class="order-number" data-node="id">',b+=e(d),b+='</td> <td data-node="name">',b+=o(i),b+='</td> <td data-node="maijia">',b+=o(n),b+='</td> <td class="trade-money" data-node ="paymentAmount">￥',b+=e(l),b+='</td> <td class="refund-money" data-node="totalPrice">',c&&(b+="￥"),b+=e(c),b+='</td> <td class="type" data-node="type">',b+=e(r),b+='</td> <td class="time"><span class="date">',b+=e(p),b+='</span></td> <td class="refund" data-node="statusDesc">',b+=e(h),b+='</td> <td><a href="/CustomerInfo/showCustomerInfo?id=',b+=e(d),b+='" class="check-detail" target="_blank" data-id="',b+=e(d),b+='">查看详情</a><a href="javascript:;" class="lh23 ',b+=e(u),b+='" data-orderid=',b+=e(g),b+=' data-node="typedesc" data-id="',b+=e(d),b+='" >',b+=e(m),b+="</a> ",v&&(b+=' <a href="javascript:;" class="lh23 ',b+=e(f),b+='" data-orderid=',b+=e(g),b+=' data-node="typedesc" data-id="',b+=e(d),b+='" >',b+=e(y),b+=" "),b+="</td> </tr>",new String(b)})},58:function(t,a,s){(function($){var a=s(59),e=(s(22),s(53)),d=s(28),o=s(2),i=(s(57),s(60)),n=($("[data-node=addMsgNull]"),function(t){r();var a=t;$("[data-node=logisticNo]").on("keyup",function(){var t=$("[data-node=orderNumNull]"),a=$(this).val(),s=$(this).val().length,e=new RegExp("^[A-Za-z0-9]+$");return e.test(a)?(s<1&&t.css("display","none"),s>20?($(this).attr("autocomplete","off"),t.css("display","block"),t.html("运单号不能超过20个字符")):t.css("display","none"),/\s/.test(a)?(t.css("display","block"),t.html("请输入正确的订单号"),!1):void 0):(t.css("display","block"),t.html("运单号只能是数字或英文"),!1)});var s={$showLogistics:$("[data-node=showLogistics]"),$ul:$("[data-node=addMsgUL]"),$input:$("[data-node=insertBox]")};s.$showLogistics.on("click",function(t){t.stopPropagation(),$("[data-node=addMsgNull]").css("display","none"),$("[data-node=addMsgNull]").html(""),s.$ul.hasClass("hasList")||l(s.$ul),s.$ul.hasClass("show")?s.$ul.addClass("hide").removeClass("show"):s.$ul.addClass("show").removeClass("hide")}),s.$ul.on("click","li",function(){var t=$(this).children("a").attr("id"),e=$(this).children("a").html();s.$input.html(e),s.$input.attr("id",t),s.$input.attr("data-orderId",a),s.$ul.addClass("hide").removeClass("show")})}),l=function(t){t.empty(),o.post(d.get("logisticsList")).then(function(a){if(a.success){for(var s=a.data,e="",d=0;d<s.length;d++){var o='<li><a href="javascript:;" id="'+s[d].id+'"">'+s[d].name+"</a></li>";e+=o}t.append(e),t.addClass("hasList show")}})},c=function(){var t=$("[data-node=orderNumNull]"),a=$("[data-node=addMsgNull]"),s=$("[data-node=insertBox]"),e=s.attr("id"),n=s.attr("data-orderid"),l=$("[data-node=logisticNo]").val();if(t.css("display","none"),a.css("display","none"),!n)return a.css("display","block"),a.html("快递公司为空，请填写"),!1;if(!l)return t.css("display","block"),t.html("运单号不能为空，请填写"),!1;var c=new RegExp("^[A-Za-z0-9]+$");if(!c.test(l))return t.css("display","block"),t.html("运单号只能是数字或英文"),!1;if(/\s/.test(l))return t.css("display","block"),t.html("请输入正确的订单号"),!1;if(l.length>20)return t.css("display","block"),t.html("运单号不能超过20个字符"),!1;var r={logisticVenderId:parseInt(e),orderid:parseInt(n),logisticNo:l},p=$("[data-node=afterServiceList]");return o.post(d.get("sendGoods"),{data:r}).then(function(a){a.success?(t.css("display","none"),t.html(""),p.children("tbody").empty(),i.getDateList(1,15),$("[data-node=loadList]").attr("data-page",1),$("[i=close]").click()):(t.css("display","block"),t.html(a.message))}),!1},r=function(){e("",{width:600,fixed:!0,modal:!0,title:"一键发货",content:a,className:"pop-box pop-pad-btm65",okCls:"pc-btn pc-btnh40 pc-btnw120",cancelCls:"queren-btn pc-btnh40 pc-btnw120",ok:c,btnWrapCls:"two-buttons"})};t.exports=n}).call(a,s(1))},59:function(t,a,s){var e=s(26);t.exports=e("src/js/page/afterService/deliverGoods",'<ul class="shipping-input"> <li> <label>选择快递公司：</label> <div class="express-select-box"> <div class="express-select active" data-node="showLogistics" > <div class="selected" data-node="insertBox">请选择</div><em class="icon icon-down icon-up"></em> </div> <ul class="select-list" data-node="addMsgUL" style="max-height:140px;overflow-y:scroll"> </ul> <p class="error-txt" data-node="addMsgNull"></p> </div> </li> <li> <label>选择快递单号：</label> <input type="text" placeholder="请输入20字以内的快递单号" class="express-number" data-node="logisticNo"> <p class="error-txt" data-node="orderNumNull"></p> </li> </ul>')},60:function(t,a,s){(function($){var a=s(2),e=s(28),d=s(57),o=function(t,s){var o=$("[data-node=afterServiceList]"),i=$("[data-node=loadList]"),n=$("[data-node=loading]"),l=$("[data-node=noList]");$(".pop-box-wrap");i.css("display","none"),params={pageNum:t,pageSize:s},n.css("display","block"),a.post(e.get("afterServiceList"),{data:params}).then(function(a){if(a.success){var s=a.data;if(s.length>0)for(var e=0;e<s.length;e++){var c=s[e].type,r=s[e].status,p="",h="",u="",g="",m=!1;4==c?p="":2==c?r==-103?(p="一键发货",h="deliverGoods"):r==-107||r==-115||r==-5||r==-10?(p="查看物流",h="checkLogistics"):r==-123&&(p="确认收货",h="shureGoods"):3==c&&(r==-103?(p="一键发货",h="deliverGoods"):r==-107||r==-124||r==-127||r==-131?(p="查看物流",h="checkLogistics"):r==-123&&(m=!0,u="查看物流",g="checkLogisticsTwo",p="确认收货",h="shureGoods"));for(var v={isThree:m,showStatusTow:u,cilckStyleTow:g,id:s[e].id,orderid:s[e].orderid,paymentAmount:s[e].paymentAmount,shop_name:s[e].shop_name,status:s[e].status,statusDesc:s[e].statusDesc,totalPrice:s[e].totalPrice,type:s[e].type,typedesc:s[e].typedesc,showStatus:p,cilckStyle:h,shop_user:s[e].mail_name,createTime:s[e].time},f="",y=0;y<v.shop_name.length;y++)f+="<p class='product-name'>"+v.shop_name[y].name+"</p>";v.shop_name=f;var b=d(v);o.children("tbody").append(b),n.css("display","none"),s.length<15&&1!=t?i.css("display","none"):i.css("display","block"),1===t&&s.length<1?l.css("display","block"):1===t&&s.length<15&&i.css("display","none")}else n.css("display","none"),l.css("display","block")}})};t.exports={getDateList:o}}).call(a,s(1))}});
<!--已经改完--> 
<?php
    $csspath = 'checklogistics.css';
    $jspath = '/js/conf/uc_logistics.js';
?>
<include file="Home@Front/Public:header" />   
	<div class="wrap-box">
      <div class="crumbs-box"><a href="javascript:;">我的订单</a><em>></em><span class="crnmb-activ">查看物流</span></div>
      <div class="bg-white">
		<if condition="$statu eq 3">
        <div class="content-top clearfix">
          <h3>你的包裹已签收</h3><a href="javascript:;" class="w98-h30 order-btn-blank">物流投诉</a>
        </div>
		</if>
        <div class="logis-progress">
          <table>
			<notempty name="list.message">
			<volist name="list.message" id="item">
            <tr>
              <td class="clearfix"><em class="iconn-67 active">&#xea58;</em>
                <div class="time">
                  <p class="date"><{$item.date}></p>
                  <p class="week"><{$item.week}></p>
                  <p class="hour"><span><{$item.hour}></span></p>
                </div>
                <p class="state-illustrate"><span><{$item.message}> <if condition="$statu eq 3"><span class="checked">已签收 </span></if></span></p>
              </td>
            </tr>
			</volist>
          </table>
        </div>
      </div>
      <div class="detail-txt">
		 <ul>
          <li class="fl clearfix">
            <p>货运单号：<span class="bold"><{$list.no}> </span></p>
            <p>物流公司：<span class="bold"><{$list.logisticsVendor.name}></span></p>
            <!--<p>客服电话：<span>010-9899878</span></p>-->
          </li>
		<!--
          <li class="fl clearfix">
            <p>卖家昵称：<span></span></p>
            <p><a href="javascript:;" class="connect" data-action="ContactMerchant">联系商家</a></p>
          </li>
          <li>
            <p>发货地址：<span>   方敬知  15311523119  </span></p>
          </li>
          <li>
            <p>收货地址：<span></span></p>
          </li>
		-->
        </ul>
      </div>
    </div>
<include file="Home@Front/Public:footer" />	

 <?php
    $csspath = 'checklogistics.css';
    $jspath = '/js/conf/uc_logistics.js';
?>
<include file="Home@Front/Public:header" />   
	<div class="wrap-box">
      <div class="crumbs-box"><a href="javascript:;">我的订单</a><em>></em><span class="crnmb-activ">查看物流</span></div>
      <div class="bg-white">
		<if condition="$list.status eq 'RECEIVED' ">
        <div class="content-top clearfix">
          <h3>你的包裹已签收</h3>
        </div>
		</if>
        <div class="logis-progress">
          <table>
			<notempty name="list.messages">
			<volist name="list.messages" id="item">
            <tr>
              <td class="clearfix"><em class="iconn-67 active"></em>
                <div class="time">
                  <p class="date"><{$item.date}></p>
                  <p class="week"><{$item.week}></p>
                  <p class="hour"><span><{$item.hour}></span></p>
                </div>
                <p class="state-illustrate"><span><{$item.message}> </span></p>
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
            
          </li>
          <li class="fl clearfix">
            <p>卖家昵称：<span><{$detailData.shop.name}></span></p>
            <if condition="$detailData.orderType neq 6 && $detailData.orderType neq 7">
            <p><a  href="<?=imUrl('shop',$detailData['shop']['id'])?>" target="_blank" data-action="entryBtn" class="connect" ><p>联系商家</p></a></p>
            </if>
          </li>
          <li>
            <p>收货地址：<span><{$detailData.consignee.address|htmlspecialchars}>   <{$detailData.consignee.name}>  <{$detailData.consignee.mobile}></span></p>
          </li>
        </ul>
      </div>
    </div>
<include file="Home@Front/Public:footer" />	

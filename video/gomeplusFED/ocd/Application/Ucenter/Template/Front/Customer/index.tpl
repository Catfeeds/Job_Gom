<?php
    $csspath = 'shop/service.css';
    $jspath  = '/js/conf/afterService.js';
?>
<include file="Home@Front/Public:header" />
    <div class="wrap-box mart20 clearfix">
	<include file="Front/Public/left" />
      <div class="order-right">
        <div class="order-right-top">
          <h2 class="service-title">售后服务</h2>
          <ul class="service-search-box clearfix">
            <li>
              <label>订单编码：</label>
              <input type="text" placeholder="请输入正确订单编码">
            </li>
            <li>
              <label>申请时间：</label><a href="javascript:;" class="date"><span>2016-07-20</span></a> - <a href="javascript:;" class="date"><span class="default">日期</span></a>
            </li>
            <li>
              <label>类型：</label><a href="javascript:;" class="trade-type-select"><span>退款</span><em class="icon icon-down icon-up"></em></a>
            </li>
            <li class="mgr0">
              <label>状态：</label><a href="javascript:;" class="trade-type-select trade-state-select"><span>请选择</span><em class="icon icon-down"></em></a>
            </li>
          </ul><a href="javascript:;" class="search-btn">搜索</a>
        </div>
        <div class="order-tabs clearfix">
		  <a href="javascript:;" class="active">全部</a>
		  <!--
		  <a href="javascript:;">申请的退款</a>
		  <a href="javascript:;">申请的退换货</a>
		  -->
		 </div>
        <table class="ship-addr-table"  data-node="afterServiceList">
		<thead>
          <tr>
            <th>订单</th>
            <th>商品名称</th>
            <th>卖家</th>
            <th>交易金额</th>
            <th>退款金额</th>
            <th>类型</th>
            <th>申请时间</th>
            <th>状态</th>
            <th>订单操作</th>
          </tr>
		 </thead>
		 <tbody></tbody>
        </table>
		<div class="more-comments" data-node="loadList" data-page="1">
			<a href="javascript:;" class="clearfix"><span><img src="<{$pcimgpath}>/images/circle/small-logo.png">点击加载更多<em class="icon icon-right">&#xe98c;</em></span></a>
		</div>
		<div class="more-comments" data-node="loading" >
			<a href="javascript:;" class="disabled clearfix"><span><img src="<{$pcimgpath}>/images/public/loading.gif">正在加载...</span></a></div>
		<div class="more-comments" data-node="noList" >
		<a href="javascript:;" class="disabled clearfix"><span>没有可加载内容</span></a></div>
      </div>
    </div>
	<p class="ordi-toast-txt hide" data-bigToast="toast"></p>
  </body>
</html>
<script src="<{$pcjspath}>/js/conf/vendor.js?version=<?php echo C('JS_VERSION'); ?>"></script>
<script src="<{$pcjspath}><{$jspath}>?version=<?php echo C('JS_VERSION'); ?>" ></script>




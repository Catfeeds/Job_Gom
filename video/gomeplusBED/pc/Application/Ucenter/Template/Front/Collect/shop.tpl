<!--已经改完-->
<?php
    $csspath = 'usercenter.css';
    $jspath = '/js/conf/uc_collect.js';
	
?>
<include file="Home@Front/Public:header" />
<script>
window._page_name_ = '个人中心-店铺收藏';
window._page_id_ = 'F007';
</script>
<div class="wrap-box mart20 clearfix">
<include file="Front/Public/left" />      
	<div class="user-right">
		<div class="usershop-title">			
			<div class="left-tab" data-node="tabList"><a href="<{$i_domain}>collect/goods" data-type="goods">商品</a><a href="<{$i_domain}>collect/shop" class="active" data-type="shop">店铺</a><a href="<{$i_domain}>collect/topic" data-type="topic">话题</a></div>
			<div class="right-edit hide" data-node="showBatch"><a href="javascript:;" data-action="batch">批量管理</a></div>
			<div class="right-edit hide" data-node="hideBatch">
				<label>
					<input type="checkbox" data-action="selectAll">全选
				</label><a href="javascript:;" data-action="delAll"><em class="iconn-72"></em>删除</a><a href="javascript:;" data-action="cancelBatch">取消管理</a>
			</div>
        </div>
        <div class="shop-list store-list" data-node="collectList">
			<ul class="clearfix" data-node="dataList"></ul>
		</div>
		<div class="more-comments hide" data-node="loadedMore"><a href="##" class="clearfix" data-action="loadMore"><span><img src="<{$pcimgpath}>/images/circle/small-logo.png?v=<?php echo C('JS_VERSION'); ?>">点击加载更多<em class="iconn-9"></em></span></a></div>
        <div class="more-comments" data-node="loaded"><a href="##" class="disabled clearfix" data-node="loading"><span><img src="<{$pcimgpath}>/images/public/loading.gif">正在加载...</span></a></div>
        <div class="more-comments hide" data-node="noContent"><a href="##" class="disabled clearfix" data-action="noData"><span>没有可加载内容</span></a></div>
        <div class="more-comments hide" data-node="dataFailed"><a href="##" class="clearfix" data-action="loadMore"><span>数据获取失败，请重试！</span></a></div>
        <div class="no-topic no-data hide" data-node="dataFail">
          <div class="txt clearfix">
            <p> <span>数据获取失败，请 <a href="javascript:;" data-action="loadMore">重试 </a>！</span></p>
          </div>
        </div>
	</div>
</div>	
<include file="Home@Front/Public:footer" />	

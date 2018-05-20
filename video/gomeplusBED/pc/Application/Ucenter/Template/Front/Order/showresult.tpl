<?php
    $csspath = 'commentsuccess.css';
    $jspath = '/js/conf/orderDisSuccess.js';
?>
<include file="Home@Front/Public:header" />
    <div class="wrap-box comment-suc">
      <div class="title"><em class="icon icon-suc">&#xea52;</em>
        <h2>发表评论成功！</h2>
      </div>
      <p>以下商品未评，去看看吧~</p><a href="<{$i_domain}>order/index?status=4">返回待评论列表 ></a>
    </div>
    <div class="wrap-box">
	<if condition="!empty($data['goods_info'])">
      <h3 class="goods-title"><span>待评论</span></h3>
	</if>
      <div class="shop-list">
        <ul class="clearfix" data-node="resultList">
          <foreach name="data.goods_info" item="vo" key = "key">
            <li><a href="/order/showCommentInfo?orderid=<{$vo.orderId}>"><img src="<{$vo.productImage}>"><div class="comment-btn">立即评论</div></a></li>
          </foreach>
        </ul>
      </div>
      <h3 class="goods-title"><span>为你推荐</span></h3>
      <div class="shop-list">
        <ul class="clearfix">
		 <foreach name="data.commend" item="vo" key = "key">
          <li><a href="<{$vo['id']|productDetailUrlGen=$vo['shopid'],###}>"><img src="<{$vo.image|getResizeImg=###,230,230}>">
              <div class="text">￥<span><{$vo.price}></span>
                <p><{$vo.name}></p>
              </div></a></li>
	    </foreach>
        </ul>
      </div>
    </div>
<include file="Home@Front/Public:footer" />

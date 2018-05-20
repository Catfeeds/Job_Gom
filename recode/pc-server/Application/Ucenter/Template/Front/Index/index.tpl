<?php
    $csspath = 'usercenter.css';
    $jspath  = '/js/conf/uc_index.js';
?>

<include file="Ucenter@Front/Public:header" />
<div class="wrap-box mart20 clearfix">
	<include file="Front/Public/left" />
	<div class="user-right">
		<div modelid="<?php echo $modelPage['grzhxx'];?>" class="user-menu user-gome-menu clearfix">
			<div class="user-index-head"><eq name="expertArr.isExpert" value="1"><em class="icon-v"></em></eq>
				<div class="user-head-img">
					<a href="<{$i_domain_gome}>member/profile"><img onerror="imgError(this, 'h')" src="<{$accountArr['imagePath']|default=""}>"><span class="change-img">更换头像</span></a>
				</div>
				<div class="fr">
					<h2><span class="user-name"><{$userinfos['nickName']}></span><em class="level">G<{$accountArr['profileGrade']|default="1"}></em></h2>
					<div class="name-b">
						<p>国美币<span class="red"><{$accountArr['amountAvailable']|default="0.00"}></span></p>
						<p>美　豆<span class="red"><{$accountArr['gomedo']|default="0"}></span></p>
						<p>返　利<span class="red"><{$accountArr['totalRebate']|default="0.00"}></span></p>
						<p>优惠券<span class="red"><{$couponsArr['totalCouponCount']|default="0"}></span></p>
					</div>
				</div>
			</div>
			<div class="user-index-order">
				<a href="<{$i_domain_gome}>member/myOrder?waitPay" target="_blank"><em class="iconn-68"></em><p>待付款</p></a>
				<a href="<{$i_domain_gome}>member/myOrder?waitConfirm" target="_blank"><em class="iconn-69"></em><p>待收货</p></a>
				<a href="<{$i_domain_gome}>member/myGoodsAppraise?orderId&shippingGroupId" target="_blank"><em class="iconn-55"></em><p>待评价</p></a>
				<a href="<{$i_domain_gome}>member/myReturnGoodList" target="_blank"><em class="iconn-70"></em><p>退款／售后</p></a>
			</div>
		</div>
		<eq name="expertArr.isExpert" value="0">
			<a modelid="<?php echo $modelPage['grdrzm'];?>" href="<{$i_domain}>expert" class="dr-entrance" target="_blank">
			</a>
		</eq>
		<div modelid="<?php echo $modelPage['grwdqz'];?>" class="my-circles">
			<div class="right-text-title">
				<h2>我的圈子</h2>
				<div class="text-title-r">
					<a href="<{$group_domain}>index/create" target="_blank" class="create-btn"><em class="iconn-41"></em>创建圈子</a>
					<span class="line"></span>
					<a href="<{$i_domain}>group" target="_blank" class="checkmore">查看更多 <em class="iconn-9"></em></a>
				</div>
			</div>
			<notempty name="circleArr">
			<ul class="mycircle-list">
				<foreach name="circleArr" item="circleItem">
				<li><a href="<{$circleItem.id|groupDetailUrlGen}>" target="_blank" class="img"><img onerror="imgError(this, 'h')" src="<{$circleItem.icon|getResizeImg=###,75,75}>"></a><a href="<{$circleItem.id|groupDetailUrlGen}>" target="_blank"><span class="title"><{$circleItem.name}></span></a></li>
				</foreach>
			</ul>
			<else/>
			<div class="no-topic">
				<div class="txt clearfix"><em class="iconn-52"></em>
				<p> <span>您还没有加入任何的圈子，赶快<a href="<{$group_domain}>index" target="_blank"> 加入圈子 </a>吧！</span></p>
				</div>
			</div>
			</notempty>
		</div>
		
		<div class="my-circles content-topic">
			<div class="right-text-title">
				<h2>我发布的话题</h2>
				<div class="text-title-r">
					<a href="<{$group_domain}>topic/publiser" target="_blank" class="create-btn"><em class="iconn-41"></em>发布话题</a>
					<span class="line"></span>
					<a href="<{$i_domain}>topic" target="_blank" class="checkmore">查看更多 <em class="iconn-9"></em></a>
				</div>
			</div>
			<notempty name="topicArr">
			<ul class="topic-list">
				<?php $m=1;?>
				<foreach name="topicArr" item="topicItem">
				<li modelid="<?php echo $modelPage['grwdht'].str_pad($m,4,'0',STR_PAD_LEFT); ?>">
					<a href="<{$topicItem.id|topicDetailUrlGen}>" target="_blank"><{$topicItem.name}></a>
					<notempty name="topicItem.textShow">
					<p>
						<a href="<{$topicItem.id|topicDetailUrlGen}>" target="_blank"><{$topicItem.textShow}></a>
					</p>
					</notempty>
					<notempty name="topicItem.imgShow">
					<dl class="clearfix">
						<foreach name="topicItem.imgShow" item="imgItem">
						<dd>
							<a href="<{$topicItem.id|topicDetailUrlGen}>" target="_blank"><img onerror="imgError(this)" src="<{$imgItem.url}>"></a>
							<if condition="$imgItem['type'] eq 'item'">
							<em class="icon icon-goods"></em>
							<elseif condition="$imgItem['type'] eq 'video'"/>
							<em class="icon icon-video"></em>
							</if>
						</dd>
						</foreach>
					</dl>
					</notempty>
					<div class="clearfix">
						<div class="fl">
							<span class="m0"><{$topicItem.createTime}></span>
							<span>来自圈子：</span><a href="<{$topicItem.group.id|groupDetailUrlGen}>" target="_blank"><{$topicItem.group.name}></a>
						</div>
						<div class="fr">
							<span><em class="iconn-10"></em><{$topicItem.like.userQuantity}></span>
							<span><em class="iconn-11"></em><{$topicItem['replyQuantity'] + $topicItem['subReplyQuantity']}></span>
							<span><em class="iconn-57"></em><{$topicItem.topicCollectionQuantity}></span>
						</div>
					</div>
				</li>
				<?php $m++;?>
				</foreach>
			</ul>
			<else/>
			<div class="no-topic">
				<div class="txt clearfix"><em class="iconn-63"></em>
				<p> <span>你还没相关话题哦,赶快去<a href="<{$group_domain}>topic/publiser" target="_blank"> 发布话题 </a>吧</span></p>
				</div>
			</div>
			</notempty>
		</div>
		
		<div class="my-circles content-topic">
			<div class="right-text-title">
				<h2>我的订单</h2>
				<div class="text-title-r">
					<a href="<{$i_domain_gome}>member/myOrder" target="_blank" class="checkmore">查看更多 <em class="iconn-9"></em></a>
				</div>
			</div>
			<notempty name="orderArr">
			<div class="order-lately">
				<div class="order-nav">
					<span class="nav-label">最近的订单</span>
					<a href="<{$i_domain_gome}>member/myOrder?waitPay" target="_blank">待付款<span <gt name="orderArr.unPayedCount" value="0">class="red"</gt> ><{$orderArr.unPayedCount}></span></a><em class="line"></em>
					<a href="<{$i_domain_gome}>member/myGoodsAppraise?orderId&shippingGroupId" target="_blank">待评价<span <gt name="orderArr.unAppraiedCount" value="0">class="red"</gt> ><{$orderArr.unAppraiedCount}></span></a><em class="line"></em>
					<a href="<{$i_domain_gome}>member/myOrder?waitConfirm" target="_blank">待确认收货<span <gt name="orderArr.unReceivedCount" value="0">class="red"</gt> ><{$orderArr.unReceivedCount}></span></a>
				</div>
				<ul class="order-state">
					<?php $n=1;?>
					<foreach name="orderArr.profileProgressBarInfoList" item="orderItem">
					<li class="order-item" modelid="<?php echo $modelPage['grwddd'].str_pad($n,4,'0',STR_PAD_LEFT); ?>" >
						<a href="<{$i_domain_gome}>/member/shippingGroupDetailInfo/<{$orderItem.orderId}>/<{$orderItem.shippingGroupId}>" target="_blank">
							<img onerror="imgError(this)" src="<{$orderItem.skuImageUrl|default=""}>" title="<{$orderItem.skuName}>">
						</a>
						<div class="state-content">
							<div class="cont-l">
								<eq name="orderItem.orderSplite" value="N">
								<p>订单编号：<span class="gray"><{$orderItem.orderId}></span></p>
								<else/>
								<p>配送单号：<span class="gray"><{$orderItem.shippingGroupId}></span></p>
								</eq>								
								<p>共<span><{$orderItem.skuCount}></span>件商品</p>
								<p class="total gray">总金额：<span class="red">￥<{$orderItem.totalAmount}></span></p>
							</div>
							<ul class="process-box">
								<notempty name="orderItem.profileOrderBarNoteList.0">
								<!--订单已提交-->
								<if condition="$orderItem['profileOrderBarNoteList'][0]['markNode'] eq 1">
								<li class="active"><em class="step"></em>
									<span class="state-txt"><{$orderItem['profileOrderBarNoteList'][0]['nodeName']}></span>
								</li>
								<elseif condition="$orderItem['profileOrderBarNoteList'][0]['markNode'] eq 2"/>
								<li><em class="step"></em>
									<span class="state-txt gray-txt"><{$orderItem['profileOrderBarNoteList'][0]['nodeName']}></span>
								</li>
								<else/>
								<li class="gray"><em class="step"></em>
									<span class="state-txt gray-txt"><{$orderItem['profileOrderBarNoteList'][0]['nodeName']}></span>
								</li>
								</if>
								</notempty>
								
								<notempty name="orderItem.profileOrderBarNoteList.1">
								<!--付款成功-->
								<if condition="$orderItem['profileOrderBarNoteList'][1]['markNode'] eq 1">
								<li class="active"><em class="step"></em>
									<span class="green-bar"></span>
									<span class="state-txt"><{$orderItem['profileOrderBarNoteList'][1]['nodeName']}></span>
								</li>
								<elseif condition="$orderItem['profileOrderBarNoteList'][1]['markNode'] eq 2"/>
								<li><em class="step"></em>
									<span class="green-bar"></span>
									<eq name="orderItem.profileOrderBarNoteList.1.isButton" value="N">
									<span class="state-txt gray-txt"><{$orderItem['profileOrderBarNoteList'][1]['nodeName']}></span>
									<else/>
									<a href="<{$orderItem['paymentLink']}>" target="_blank" class="comment-btn"><{$orderItem['profileOrderBarNoteList'][1]['nodeName']}></a>
									</eq>
								</li>
								<else/>
								<li class="gray"><em class="step"></em>
									<span class="green-bar gray-bar"></span>
									<span class="state-txt gray-txt"><{$orderItem['profileOrderBarNoteList'][1]['nodeName']}></span>
								</li>
								</if>
								</notempty>
								
								<notempty name="orderItem.profileOrderBarNoteList.2">
								<!--商品已出库-->
								<if condition="$orderItem['profileOrderBarNoteList'][2]['markNode'] eq 1">
								<li class="active"><em class="step"></em>
									<span class="green-bar"></span>
									<span class="state-txt"><{$orderItem['profileOrderBarNoteList'][2]['nodeName']}></span>
								</li>
								<elseif condition="$orderItem['profileOrderBarNoteList'][2]['markNode'] eq 2"/>
								<li><em class="step"></em>
									<span class="green-bar"></span>
									<span class="state-txt gray-txt"><{$orderItem['profileOrderBarNoteList'][2]['nodeName']}></span>
								</li>
								<else/>
								<li class="gray"><em class="step"></em>
									<span class="green-bar gray-bar"></span>
									<span class="state-txt gray-txt"><{$orderItem['profileOrderBarNoteList'][2]['nodeName']}></span>
								</li>
								</if>
								</notempty>
								
								<notempty name="orderItem.profileOrderBarNoteList.3">
								<!--已确认收货-->
								<if condition="$orderItem['profileOrderBarNoteList'][3]['markNode'] eq 1">
								<li class="active"><em class="step"></em>
									<span class="green-bar"></span>
									<span class="state-txt"><{$orderItem['profileOrderBarNoteList'][3]['nodeName']}></span>
								</li>
								<elseif condition="$orderItem['profileOrderBarNoteList'][3]['markNode'] eq 2"/>
								<li><em class="step"></em>
									<span class="green-bar"></span>
									<eq name="orderItem.profileOrderBarNoteList.3.isButton" value="N">
									<span class="state-txt gray-txt"><{$orderItem['profileOrderBarNoteList'][3]['nodeName']}></span>
									<else/>
									<a href="##" class="comment-btn" data-orderId="<{$orderItem.orderId}>" data-shippingGroupId="<{$orderItem.shippingGroupId}>" data-action="receiveGoods"><{$orderItem['profileOrderBarNoteList'][3]['nodeName']}></a>
									</eq>
								</li>
								<else/>
								<li class="gray"><em class="step"></em>
									<span class="green-bar gray-bar"></span>
									<span class="state-txt gray-txt"><{$orderItem['profileOrderBarNoteList'][3]['nodeName']}></span>
								</li>
								</if>
								</notempty>
								
								<notempty name="orderItem.profileOrderBarNoteList.4">
								<!--已评价-->
								<if condition="$orderItem['profileOrderBarNoteList'][4]['markNode'] eq 1">
								<li class="active"><em class="step"></em>
									<span class="green-bar"></span>
									<span class="state-txt"><{$orderItem['profileOrderBarNoteList'][4]['nodeName']}></span>
								</li>
								<elseif condition="$orderItem['profileOrderBarNoteList'][4]['markNode'] eq 2"/>
								<li><em class="step"></em>
									<span class="green-bar"></span>
									<eq name="orderItem.profileOrderBarNoteList.4.isButton" value="N">
									<span class="state-txt gray-txt"><{$orderItem['profileOrderBarNoteList'][4]['nodeName']}></span>
									<else/>
									<a href="<{$i_domain_gome}>member/myGoodsAppraise?shippingGroupId=<{$orderItem.shippingGroupId}>&orderId=<{$orderItem.orderId}>" target="_blank" class="comment-btn"><{$orderItem['profileOrderBarNoteList'][4]['nodeName']}></a>
									</eq>
								</li>
								<else/>
								<li class="gray"><em class="step"></em>
									<span class="green-bar gray-bar"></span>
									<span class="state-txt gray-txt"><{$orderItem['profileOrderBarNoteList'][4]['nodeName']}></span>
								</li>
								</if>
								</notempty>
							</ul>
						</div>
					</li>
					<?php $n++;?>
					</foreach>
				</ul>
			</div>
			<else/>
			<div class="no-topic">
				<div class="txt clearfix"><em class="iconn-63"></em>
					<p> <span>亲，您还没有相关订单，赶快去<a target="_blank" href="<{$main_domain_gome}>">商城逛逛</a>吧</span></p>
				</div>
			</div>
			</notempty>
		</div>
		<div class="user-shop" data-node="userShop">
			<div class="right-text-title">
				<h2>推荐商品</h2><a href="javascript:void(0);" data-action="changeGoods" data-page="0">换一组</a>
			</div>
			<div class="shop-list" data-node="recommendGoodList" >
				<ul class="clearfix" data-node="dataList"></ul>
			</div>
		</div>
	</div>
</div>
<include file="Home@Front/Public:footer" />

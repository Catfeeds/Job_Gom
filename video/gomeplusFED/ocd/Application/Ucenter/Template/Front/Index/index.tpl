<?php
    $csspath = 'usercenter/usercenter.css';
    $jspath  = '/js/conf/uc_index.js';
?>
<include file="Home@Front/Public:header" />
    <div class="wrap-box mart20 clearfix">
	 <include file="Front/Public/left" />
      <div class="user-right">
        <div class="user-menu clearfix">
          <div class="user-index-head">
            <if condition = "$userinfos['isExpert']"><em class="icon-v"></em></if>
            <div class="user-head-img">
                <a href="/personal?type=2"><img src="<{$data.userinfo.imagePath|getResizeImg=###,80,80}>"><span class="change-img">更换头像</span></a>  
            </div>			
			<if condition="$userinfos['isExpert']">
			<a href="<{$i_domain}>expert" class="pc-btn dr-previlage-btn" target="_blank">
			达人特权
			</a>
			</if>			
            <h2><span class="user-name"><{$data.userinfo.nickName}></span></h2>
            <p class="fl">关注：<{$data.userinfo.friendNum}> </p>
            <p class="fr">粉丝：<{$data.userinfo.fansNum}></p>         
          </div>
          <div class="user-index-fan">
            <p>返利　<span><{$data.coupinfo}></span></p>
            <p>优惠券<a href="/coupon"><{$data.promationtotal}></a></p>
          </div>
          <div class="user-index-order">
			  <if condition="!empty($data['orderstatus']['pendPayment'])">
			  <a href="/order/index?status=1" ><em class="icon">&#xe9db;</em><p>待付款 <span><{$data['orderstatus']['pendPayment']}></span></p></a>
			  <else />
			  <a href="/order/index?status=1" ><em class="icon">&#xe9db;</em><p>待付款 <span></span></p></a>
			  </if>

			  <if condition="!empty($data['orderstatus']['pendDelivery'])">
				<a href="/order/index?status=2" ><em class="icon">&#xe9ab;</em><p>待发货 <span><{$data['orderstatus']['pendDelivery']}></span></p></a>
			  <else />
				<a href="/order/index?status=2" ><em class="icon">&#xe9ab;</em><p>待发货 <span></span></p></a>
			  </if>

			  <if condition="!empty($data['orderstatus']['pendReceive'])">
				<a href="/order/index?status=3" ><em class="icon">&#xe9ad;</em><p>待收货 <span><{$data['orderstatus']['pendReceive']}></span></p></a>
			  <else />
				<a href="/order/index?status=3" ><em class="icon">&#xe9ad;</em><p>待收货 <span></span></p></a>
			  </if>

			  <if condition="!empty($data['orderstatus']['pendComment'])">
				<a href="/order/index?status=4" ><em class="icon">&#xe964;</em><p>待评价<span><{$data['orderstatus']['pendComment']}></span></p></a>
			  <else />
				<a href="/order/index?status=4" ><em class="icon">&#xe964;</em><p>待评价<span></span></p></a>
			  </if>
			<a href="/customerInfo/index" ><em class="icon">&#xe90f;</em>
              <p>退款／售后</p></a></div>
        </div>
		<if condition="!$userinfos['isExpert']">
			<a href="<{$i_domain}>expert" class="dr-entrance" target="_blank"></a>
		</if>
        <div class="user-order">
          <div class="right-text-title">
            <h2>我的订单</h2><a href="/order/index" target="_blank">查看更多 》</a>
          </div>
          <div class="user-order-index">
		  <notempty name="data['orderinfo']">
		  <foreach name="data.orderinfo" Item="Item" key ="key">
            <table>
              <tr>
			  <if condition="$Item.order_id gt 0 ">
                <th colspan="5">订单编号：<span><{$Item.order_id}></span>
				成交时间：<span><{$Item.time}></span>
				</th>
			  <else />
                <th colspan="5">订单编号：<span><{$Item.mergerid}></span>
				成交时间：<span><{$Item.time}></span>
				</th>
		      </if>
              </tr>
              <tr>
                <td width="330" class="img">
					<foreach name="Item.info" Item="vo" key = "k">
						<a href="<{$vo['id']|productDetailUrlGen=$vo['shopId'],###}>"><img src="<{$vo.image|getResizeImg=###,80,80}>"></a>
					</foreach>
				<if condition = "$Item['show']  gt 1 ">
					<span>···</span>
				</if>
				</td>
                <td><{$Item.name}></td>
                <td width="180">￥<{$Item.money}></td>
                <td width="150"><span class="active"><{$Item.order_desc}></span></td>
                <td width="120" data-id="<{$Item.order_id}>">
				<a target="_blank" href="/order/detail?id=
				<if condition="($Item['status'] eq 0 ) or ($Item['status'] eq -6 )">
					<{$Item.mergerid}>&type=1
				<else />
					<{$Item.order_id}>
				</if>">查看订单</a></td>
              </tr>
            </table>
		</foreach>
		<else />
            <div class="no-topic">
              <div class="txt clearfix"><em class="icon">&#xe96c;</em>
                <p> <span>亲，您还没有相关订单，赶快去<a target="_blank" href="<?php echo $mall_domain.'search' ?>">逛逛</a>吧</span></p>
              </div>
            </div>
		</notempty>
          </div>
        </div>

        <div class="user-mytopic">
          <div class="right-text-title">
            <h2>我发布的话题</h2><a href="/topic/index" target="_blank">查看更多 》</a>
          </div>
		<notempty name="data.topiclist">
          <ul class="clearfix mytopic-list">
		  <foreach name="data.topiclist" item = "vo" key = "k">
            <li><a href="<{$vo['topid']|topicDetailUrlGen}>" class="title" target="_blank"><{$vo.title}></a>
			<span><{$vo.time}></span>
				<p>发表自圈子: <a target="_blank" href="<{$vo['groupid']|groupDetailUrlGen}>"><{$vo.groupName}></a></p>
			</li>
		</foreach>
          </ul>
		<else />
          <div class="no-topic">
            <div class="txt clearfix"><em class="icon">&#xe964;</em>
              <p> <span>你还没相关话题哦,赶快去<a target="_blank" href="<{$group_domain}>topic/publiser">发布话题 </a>吧</span></p>
            </div>
          </div>
	    </notempty>
        </div>
        <div class="user-shop">
          <div class="right-text-title">
            <h2>推荐商品</h2><a href="javascript:void(0);" data-action="changeGoods">换一组</a>
          </div>
          <div class="shop-list" data-node="recommendGoodList" >
            <ul class="clearfix" page="1" data-node="dataList">

			<foreach name="data.pcpersonal" item ="vo" key ="k">
              <li>
                <div class="mg-negative"><a href="<{$mall_domain}>product/<{$vo.shopId}>-<{$vo.id}>.html" target="_blank" ><img src="<{$vo.mainImage|getResizeImg=###,230,230}>"></a>
                  <div class="btn-box"><a href="<{$mall_domain}>product/<{$vo.shopId}>-<{$vo.id}>.html" class="pc-btn pc-btnh40" target="_blank" >立即购买</a><a href="<{$mall_domain}>product/<{$vo.shopId}>-<{$vo.id}>.html" class="pc-btn pc-btnh40 pc-bj-fc8753" target="_blank" >加入购物车</a></div>
                  <div class="text"><a href="<{$mall_domain}>product/<{$vo.shopId}>-<{$vo.id}>.html" target="_blank">￥<span><{$vo.salePrice}></span>
                      <p><{$vo.name}></p></a></div>
                </div>
              </li>
			</foreach>
            </ul>
          </div>
        </div>
      </div>
    </div>
<include file="Home@Front/Public:footer" />

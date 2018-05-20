<?php
    $csspath = 'index/index.css';
    $jspath = '/js/conf/index.js';
?>
<include file="Public:header" />
    <div class="banner" >
      <ul data-node="banner">
		<foreach name="list.banner" item="item_banner" key="key">
		<!--话题-->
		<if condition="$item_banner.type eq 1">
		<li><a target="_blank" href="<{$item_banner['tid'],C('sourceCode')['operative_home_index_focus']|topicDetailUrlGen}>" title="<{$item_banner.name}>" style="background:url(<{$item_banner.origin_img_url}>) 50% 0 no-repeat;" bp-data='{"event_id":"G000P000", "url": "<{$item_banner.tid|topicDetailUrlGen}>", "banner_eq": "<{$key}>", "banner_type": "topic", "banner_value": "<{$item_banner.tid}>"}'></a></li>
		<!--圈子-->
		<elseif condition="$item_banner.type eq 2"/>
		<li><a target="_blank" href="<{$item_banner['tid'],C('sourceCode')['operative_home_index_focus']|groupDetailUrlGen}>" title="<{$item_banner.name}>" style="background:url(<{$item_banner.origin_img_url}>) 50% 0 no-repeat;" bp-data='{"event_id":"G000P000", "url": "<{$item_banner.tid|topicDetailUrlGen}>", "banner_eq": <{$key}>, "banner_type": "topic", "banner_value": "<{$item_banner.tid}>"}'></a></li>
		<!--商品-->
		<elseif condition="$item_banner.type eq 3"/>


		<li><a target="_blank" href="<{$item_banner['tid'],C('sourceCode')['operative_home_index_focus']|productDetailUrlGen=$item_banner['shop_id'],###}>" title="<{$item_banner.name}>" style="background:url(<{$item_banner.origin_img_url}>) 50% 0 no-repeat;" bp-data='{"event_id":"G000P000", "url": "<{$item_banner.tid|topicDetailUrlGen}>", "banner_eq": <{$key}>, "banner_type": "topic", "banner_value": "<{$item_banner.tid}>"}'></a></li>
		<!--店铺--> 
		<elseif condition="$item_banner.type eq 4" />


		<li><a target="_blank" href="<{$item_banner['tid'],C('sourceCode')['operative_home_index_focus']|shopDetailUrlGen}>" title="<{$item_banner.name}>" style="background:url(<{$item_banner.origin_img_url}>) 50% 0 no-repeat;" bp-data='{"event_id":"G000P000", "url": "<{$item_banner.tid|topicDetailUrlGen}>", "banner_eq": <{$key}>, "banner_type": "topic", "banner_value": "<{$item_banner.tid}>"}'></a></li>
		</if>
		</foreach>
      </ul>
    </div>



    <div class="wrap-box">
      <div class="index-popular">
        <div class="index-title clearfix" >
          <h2 class="mx-recommend">美信推荐<span>Popular recommendation</span></h2>
        </div>
        <div class="index-popular-list"  data-action="shareBlock">
          <ul class="clearfix">
			<volist name="list.commend" id="item_recom" key="k">
            <li data-node="shareItem" data-id="<{$item_recom.tid}>" data-type="1" data-praise="false" data-count="<{$item_recom.voteNum}>">
              <div class="mg-negative">
	              <div class="img"><a target="_blank" href="<{$item_recom['tid'],C('sourceCode')['social_home_index_recommend']|topicDetailUrlGen}>" bp-data='{"event_id":"G000P001", "topic_id": "<{$item_recom['tid']}>", "group_id": "<{$item_recom['group_id']}>", "section": "<{$k}>"}'><img src="<{$item_recom.origin_img_url}>"alt="<{$item_recom.name}>"></a></div>
	              <div class="img-box">
	              	  <volist name="item_recom.goods_ids" id="item_recom_list" key="list_key" offset="0" length='3'>
					  <if condition="$item_recom_list.type eq 'video' ">
		              	  <a target="_blank" href="<{$item_recom['tid'],C('sourceCode')['social_home_index_recommend']|topicDetailUrlGen}>#topicvideo" bp-data='{"event_id":"G000P001", "topic_id": "<{$item_recom['tid']}>", "group_id": "<{$item_recom['group_id']}>", "section": "<{$k}>", "position": "video<{$list_key}>"}'>
						  <img src="<{$item_recom_list.coverImage|getResizeImg=###,120,85}>" alt="<{$item_recom_list.name}>">
						  <p class="hover"><em class="icon-play"></em></p>
						  </a>
					  <else />
						  <a target="_blank" href="<{$item_recom_list['productId'],C('sourceCode')['social_home_index_recommend']|productDetailUrlGen=$item_recom_list['shopId'],###}>" bp-data='{"event_id":"G000P001",  "product_id":"<{$item_recom_list['productId']}>", "shop_id": "<{$item_recom_list['shopId']}>", "section": "<{$k}>", "position": "product<{$list_key}>"}'>
						  <img src="<{$item_recom_list.mainImage|getResizeImg=###,120,85}>" alt="<{$item_recom_list.name}>">
						  <p class="hover">￥<span><{$item_recom_list.price}></span></p>
						  </a>
					  </if>
	                  </volist>
	              </div>
	              <div class="text"><span class="tag"><{$item_recom.category_name}></span><a target="_blank" href="<{$item_recom['tid'],C('sourceCode')['social_home_index_recommend']|topicDetailUrlGen}>" class="list-title" data-node="shareUrl" title="<{$item_recom.name}>" bp-data='{"event_id":"G000P001", "topic_id": "<{$item_recom['tid']}>", "group_id": "<{$item_recom['group_id']}>", "section": "<{$k}>"}'><{$item_recom.short_name}></a>
	                <p class="gray"><{$item_recom.description}></p>
	                <div class="text-icon">
	                	<a  href="javascript:;" class="icon-collect"><em class="icon icon-collection"></em><{$item_recom.voteNum}></a>
	                	<a href="javascript:;" class="a-share"><em class="icon icon-share"></em><span><{$item_recom.replyQuantity}></span></a>
	                </div>
	              </div>
              </div>
            </li>
            </volist>
          </ul>
        </div>
      </div>
      <div class="index-circle">
        <div class="index-title clearfix">
          <h2 class="circle-topic">圈子话题<span>Circle topic</span></h2><a target="_blank" href="<{$group_domain}>topic/publiser" bp-data='{"event_id": "B000P006"}'>发布话题</a>
        </div>
        <div class="index-circle-list" data-action="shareBlock">
          <ul class="clearfix">
            <notempty>
          	<foreach name="list.topics" item="topic" key="key">
            <li data-id="<{$topic.tid}>" data-node="shareItem">
	            <div class="mg-negative">
	            	  <div class="topic-tag"><a target="_blank" href="<{$topic.group_id|groupDetailUrlGen}>"><em class="icon-lysy"><img src="<notempty name="topic.group_icon"><{$topic.group_icon|getResizeImg=###,80,80}><else /><{$pccsspath}>/images/public/down-logo.png</notempty>"></em><{$topic.group_name}></a></div>
		              <div class="img"><a target="_blank" href="<{$topic.tid|topicDetailUrlGen}>" bp-data='{"event_id":"G000P002", "url": "<{$topic.tid|topicDetailUrlGen}>", "topic_id": "<{$topic.tid}>", "group_id": "<{$topic.group_id}>", "position": "<{$key+1}>"}'><img src="<{$topic.origin_img_url}>" alt="<{$topic.name}>"></a></div>
		              <div class="text"><a target="_blank" href="<{$topic.tid|topicDetailUrlGen}>" data-node="shareUrl" class="list-title"><{$topic.name}></a>
		                <div class="text-icon">
		                	<a  href="javascript:;" class="icon-collect"><em class="icon icon-collection"></em><{$topic.voteNum}></a>
		                	<a href="javascript:;" class="a-share"><em class="icon icon-share"></em><span><{$topic.replyQuantity}></span></a>
		                </div>
		              </div>
	             </div>
            </li>
           </foreach>
           </notempty>
          </ul>
        </div>
      </div>
      <div class="index-shop">
        <div class="index-title clearfix">
          <h2 class="gg-goods ">逛逛商品<span>Go shopping</span></h2><a target="_blank" href="<{$mall_domain}>search/index" bp-data='{"event_id": "B000P007"}'>更多商品</a>
        </div>
        <div class="index-shop-list">
		  <table>
            <tr>
              <td>
              	<div class="img-position">
              		<a target="_blank" href="<{$list['goods']['0']['tid'],C('sourceCode')['operative_home_index_guangguang']|productDetailUrlGen=$list['goods']['0']['shop_id'],###}>" bp-data='{"event_id": "G000P003", "shop_id": "<{$list.goods.0.shop_id}>", "product_id": "<{$list.goods.0.tid}>", "url": "<{$mall_domain}>product/<{$list.goods.0.shop_id}>-<{$list.goods.0.tid}>.html", "position": 1}'>
              			<div class="pa pa1">
              				<p><{$list.goods.0.name}></p>￥<span><{$list.goods.0.price}></span>
              			</div>
              			<img src="<{$list.goods.0.origin_img_url}>" width="240" height="210" alt="<{$list.goods.0.name}>">
              		</a>
              	</div>
              </td>
              <td rowspan="2">
              	<div class="img-position">
              		<a target="_blank" href="<{$list['goods']['2']['tid'],C('sourceCode')['operative_home_index_guangguang']|productDetailUrlGen=$list['goods']['2']['shop_id'],###}>" bp-data='{"event_id": "G000P003", "shop_id": "<{$list.goods.2.shop_id}>", "product_id": "<{$list.goods.2.tid}>", "url": "<{$mall_domain}>product/<{$list.goods.2.shop_id}>-<{$list.goods.2.tid}>.html", "position": 3}'>
              			<div class="pa pa2"><p><{$list.goods.2.name}></p>￥<span><{$list.goods.2.price}></span></div>
              			<img src="<{$list.goods.2.origin_img_url}>" width="240" height="420" alt="<{$list.goods.2.name}>">
              		</a>
              	</div>
              </td>
              <td>
              	<div class="img-position">
              		<a target="_blank" href="<{$list['goods']['4']['tid'],C('sourceCode')['operative_home_index_guangguang']|productDetailUrlGen=$list['goods']['4']['shop_id'],###}>" bp-data='{"event_id": "G000P003", "shop_id": "<{$list.goods.4.shop_id}>", "product_id": "<{$list.goods.4.tid}>", "url": "<{$mall_domain}>product/<{$list.goods.4.shop_id}>-<{$list.goods.4.tid}>.html", "position": 5}'>
              			<div class="pa pa3"><p><{$list.goods.4.name}></p>￥<span><{$list.goods.4.price}></span></div>
              			<img src="<{$list.goods.4.origin_img_url}>" width="240" height="210" alt="<{$list.goods.4.name}>">
              		</a>
              	</div>
              </td>
              <td colspan="2">
              	<div class="img-position">
              		<a target="_blank" href="<{$list['goods']['7']['tid'],C('sourceCode')['operative_home_index_guangguang']|productDetailUrlGen=$list['goods']['7']['shop_id'],###}>" bp-data='{"event_id": "G000P003", "shop_id": "<{$list.goods.7.shop_id}>", "product_id": "<{$list.goods.7.tid}>", "url": "<{$mall_domain}>product/<{$list.goods.7.shop_id}>-<{$list.goods.7.tid}>.html", "position": 8}'>
              			<div class="pa pa4"><p><{$list.goods.7.name}></p>￥<span><{$list.goods.7.price}></span></div>
              			<img src="<{$list.goods.7.origin_img_url}>" width="479" height="210" alt="<{$list.goods.7.name}>">
              		</a>
              	</div>
              </td>
            </tr>

            <tr>
              <td><div class="img-position"><a target="_blank" href="<{$list['goods']['1']['tid'],C('sourceCode')['operative_home_index_guangguang']|productDetailUrlGen=$list['goods']['1']['shop_id'],###}>" bp-data='{"event_id": "G000P003", "shop_id": "<{$list.goods.1.shop_id}>", "product_id": "<{$list.goods.1.tid}>", "url": "<{$mall_domain}>product/<{$list.goods.1.shop_id}>-<{$list.goods.1.tid}>.html", "position": 2}'><div class="pa pa5"><p><{$list.goods.1.name}></p>￥<span><{$list.goods.1.price}></span></div><img src="<{$list.goods.1.origin_img_url}>" width="240" height="210" alt="<{$list.goods.1.name}>"></a></div></td>

              <td><div class="img-position"><a target="_blank" href="<{$list['goods']['5']['tid'],C('sourceCode')['operative_home_index_guangguang']|productDetailUrlGen=$list['goods']['5']['shop_id'],###}>" bp-data='{"event_id": "G000P003", "shop_id": "<{$list.goods.5.shop_id}>", "product_id": "<{$list.goods.5.tid}>", "url": "<{$mall_domain}>product/<{$list.goods.5.shop_id}>-<{$list.goods.5.tid}>.html", "position": 6}'><div class="pa pa6"><p><{$list.goods.5.name}></p>￥<span><{$list.goods.5.price}></span></div><img src="<{$list.goods.5.origin_img_url}>" width="240" height="210" alt="<{$list.goods.5.name}>"></a></div></td>

              <td rowspan="2"><div class="img-position"><a target="_blank" href="<{$list['goods']['8']['tid'],C('sourceCode')['operative_home_index_guangguang']|productDetailUrlGen=$list['goods']['8']['shop_id'],###}>" bp-data='{"event_id": "G000P003", "shop_id": "<{$list.goods.8.shop_id}>", "product_id": "<{$list.goods.8.tid}>", "url": "<{$mall_domain}>product/<{$list.goods.8.shop_id}>-<{$list.goods.8.tid}>.html", "position": 9}'><div class="pa pa7"><p><{$list.goods.8.name}></p>￥<span><{$list.goods.8.price}></span></div><img src="<{$list.goods.8.origin_img_url}>" width="240" height="420" alt="<{$list.goods.8.name}>"></a></div></td>

              <td><div class="img-position"><a target="_blank" href="<{$list['goods']['9']['tid'],C('sourceCode')['operative_home_index_guangguang']|productDetailUrlGen=$list['goods']['9']['shop_id'],###}>" bp-data='{"event_id": "G000P003", "shop_id": "<{$list.goods.9.shop_id}>", "product_id": "<{$list.goods.9.tid}>", "url": "<{$mall_domain}>product/<{$list.goods.9.shop_id}>-<{$list.goods.9.tid}>.html", "position": 10}'><div class="pa pa8"><p><{$list.goods.9.name}></p>￥<span><{$list.goods.9.price}></span></div><img src="<{$list.goods.9.origin_img_url}>" width="240" height="210" alt="<{$list.goods.9.name}>"></a></div></td>
            </tr>
            <tr>
              <td colspan="2">
                <div class="img-position">
					<a target="_blank" href="<{$list['goods']['3']['tid'],C('sourceCode')['operative_home_index_guangguang']|productDetailUrlGen=$list['goods']['3']['shop_id'],###}>" bp-data='{"event_id": "G000P003", "shop_id": "<{$list.goods.3.shop_id}>", "product_id": "<{$list.goods.3.tid}>", "url": "<{$mall_domain}>product/<{$list.goods.3.shop_id}>-<{$list.goods.3.tid}>.html", "position": 4}'>
                    <div class="pa pa9">
                      <p><{$list.goods.3.name}></p>￥<span><{$list.goods.3.price}></span>
                    </div><img src="<{$list.goods.3.origin_img_url}>" width="480" height="210" alt="<{$list.goods.3.name}>"></a></div>
              </td>
              <td>
                <div class="img-position"><a target="_blank" href="<{$list['goods']['6']['tid'],C('sourceCode')['operative_home_index_guangguang']|productDetailUrlGen=$list['goods']['6']['shop_id'],###}>" bp-data='{"event_id": "G000P003", "shop_id": "<{$list.goods.6.shop_id}>", "product_id": "<{$list.goods.6.tid}>", "url": "<{$mall_domain}>product/<{$list.goods.6.shop_id}>-<{$list.goods.6.tid}>.html", "position": 7}'>
                    <div class="pa pa10">
                      <p><{$list.goods.6.name}></p>￥<span><{$list.goods.6.price}></span>
                </div><img src="<{$list.goods.6.origin_img_url}>" width="239" height="210" alt="<{$list.goods.6.name}>"></a></div>
              </td>
              <td>
                <div class="img-position"><a target="_blank" href="<{$list['goods']['10']['tid'],C('sourceCode')['operative_home_index_guangguang']|productDetailUrlGen=$list['goods']['10']['shop_id'],###}>" bp-data='{"event_id": "G000P003", "shop_id": "<{$list.goods.10.shop_id}>", "product_id": "<{$list.goods.10.tid}>", "url": "<{$mall_domain}>product/<{$list.goods.10.shop_id}>-<{$list.goods.10.tid}>.html", "position": 11}'>
                    <div class="pa pa11">
                      <p><{$list.goods.10.name}></p>￥<span><{$list.goods.10.price}></span>
                </div><img src="<{$list.goods.10.origin_img_url}>" width="239" height="210" alt="<{$list.goods.10.name}>"></a></div>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="index-interest" data-node="interest">
        <div class="index-title clearfix">
          <h2 class="interest-circle">兴趣圈子<span>Interest circle</span></h2><a href="<{$group_domain}>index" target="_blank" bp-data='{"event_id": "B000P008"}'>更多圈子</a>
        </div>
        <div class="index-interest-list" data-action="shareBlock">
          <ul class="clearfix">
            <foreach name="list.groups" item="group" key="group_key">
            <li <if condition="$group_key lt 1">class="first"</if> data-node="shareItem" >
	            <div class="mg-negative">
	              <div class="img"><a target="_blank" href="<{$group.tid|groupDetailUrlGen}>" bp-data='{"event_id": "G000P004", "group_id": "<{$group.tid}>"}'><img src="<{$group.origin_img_url}>" alt="<{$group.name}>"></a></div>
	              <div class="text"><span class="tag"><{$group.category_name}></span><a target="_blank" href="<{$group.tid|groupDetailUrlGen}>" data-node="shareUrl" title="<{$group.name}>"><{$group.short_name}></a>
	                <div class="text-icon">
	                	<span class="fl"><em>成员：</em><{$group.memberQuantity}></span><span class="fl"><em>话题：</em><{$group.topicQuantity}></span>
	                </div>
	              </div>
	            </div>
            </li>
            </foreach>
          </ul>
        </div>
      </div>
      <div class="index-link">
        <div class="index-title clearfix">
          <h2 class="friend-link">友情链接<span>Friendship link</span></h2>
        </div>
        <div class="index-link-list clearfix">
        <notempty>
        	<volist name="list.friendLinks" id="link" >
        		<a target="_blank" href="<{$link.link}>"><{$link.keyword}></a>
        		<if condition="$i neq $linkSum">
        		<span>|</span>
        		</if>
        	</volist>
        </notempty>
        </div>
      </div>
    </div>

    <include file="Public:footer" />
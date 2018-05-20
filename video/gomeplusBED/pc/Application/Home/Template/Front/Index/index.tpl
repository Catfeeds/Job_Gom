<?php
    $csspath = 'index.css';
    $jspath = '/js/conf/index.js';
?>
<include file="Public:header"/>
<script type="text/javascript">
    $GLOBAL_CONFIG['topAd'] =
    <{$focus_ad_ids|json_encode}>
    ;
    $GLOBAL_CONFIG['ggAd'] =
    <{$guang_ad_ids|json_encode}>;

    $GLOBAL_CONFIG['hmxtj'] = '<{$modelPage['hmxtj']}>';
    $GLOBAL_CONFIG['hqzht'] = '<{$modelPage['hqzht']}>';
    $GLOBAL_CONFIG['hggsp'] = '<{$modelPage['hggsp']}>';
    $GLOBAL_CONFIG['hxqqz'] = '<{$modelPage['hxqqz']}>';
    $GLOBAL_CONFIG['hbdxm'] = '<{$modelPage['hbdxm']}>';
</script>
<script src="<{$adflight_url}>" ></script>
<script src="<{$admain_url}>" ></script>
<div class="banner" modelid="<?php echo $modelPage['hbanner']?>">
    <ul data-node="banner">
        <foreach name="indexList.banners" item="item_banner" key="key">
            <!--店铺-->
            <if condition="$item_banner.type eq 1">
                <li><a target="_blank"
                       href="<{$item_banner['tid']|shopDetailUrlGen}>"
                       title="<{$item_banner.name|htmlspecialchars}>"
                       style="background:url(<{$item_banner.origin_img_url}>) 50% 0 no-repeat;"
                       bp-data='{"event_id":"G000P000", "url": "<{$item_banner.tid|topicDetailUrlGen}>", "banner_eq": <{$key}>, "banner_type": "topic", "banner_value": "<{$item_banner.tid}>"}'></a>
                </li>

                <!--pc Url-->
                <elseif condition="$item_banner.type eq 2"/>
                <li><a target="_blank" href="<{$item_banner.pc_url}>" title="<{$item_banner.name|htmlspecialchars}>"
                       style="background:url(<{$item_banner.origin_img_url}>) 50% 0 no-repeat;"
                       bp-data='{"event_id":"G000P000", "url": "<{$item_banner.pc_url}>", "banner_eq": <{$key}>, "banner_type": "href", "banner_value": "<{$item_banner.tid}>"}'></a>
                </li>

                <!--话题-->
                <elseif condition="$item_banner.type eq 7"/>
                <li><a target="_blank"
                       href="<{$item_banner['tid']|topicDetailUrlGen}>"
                       title="<{$item_banner.name|htmlspecialchars}>"
                       style="background:url(<{$item_banner.origin_img_url}>) 50% 0 no-repeat;"
                       bp-data='{"event_id":"G000P000", "url": "<{$item_banner.tid|topicDetailUrlGen}>", "banner_eq": "<{$key}>", "banner_type": "topic", "banner_value": "<{$item_banner.tid}>"}'></a>
                </li>

                <!--圈子-->
                <elseif condition="$item_banner.type eq 8"/>
                <li><a target="_blank"
                       href="<{$item_banner['tid'],C('sourceCode')['operative_home_index_focus']|groupDetailUrlGen}>"
                       title="<{$item_banner.name|htmlspecialchars}>"
                       style="background:url(<{$item_banner.origin_img_url}>) 50% 0 no-repeat;"
                       bp-data='{"event_id":"G000P000", "url": "<{$item_banner.tid|topicDetailUrlGen}>", "banner_eq": <{$key}>, "banner_type": "topic", "banner_value": "<{$item_banner.tid}>"}'></a>
                </li>

                <!--商品-->
                <else/>
                <li><a target="_blank"
                       href="<{$item_banner['tid'],C('sourceCode')['operative_home_index_focus']|productDetailUrlGen=$item_banner['shop_id'],###}>"
                       title="<{$item_banner.name|htmlspecialchars}>"
                       style="background:url(<{$item_banner.origin_img_url}>) 50% 0 no-repeat;"
                       bp-data='{"event_id":"G000P000", "url": "<{$item_banner.tid|topicDetailUrlGen}>", "banner_eq": <{$key}>, "banner_type": "topic", "banner_value": "<{$item_banner.tid}>"}'></a>
                </li>
            </if>
        </foreach>
    </ul>
</div>
<div class="wrap-box" data-node="Wrap-Box">
    <div class="index-popular" data-node="recommendBox">
        <div class="index-title clearfix">
            <h2 class="hot-topic">热门话题<span>Hot Topic</span></h2>
        </div>
        <div class="hot-topic-list" modelid="<?php echo $modelPage['hrmht']?>">
            <foreach name="indexList.hotTopic" item="item_hot" key="key">
                <div class="hot-topic-item">
                    <notempty name="item_hot.dataTitle">
                        <div class="hot-topic-mask" >
                            <a href="<{$item_hot.id|topicDetailUrlGen}>" target="_blank" title="<{$item_hot.dataTitle|htmlspecialchars}>">
                                <div class="hot-topic-bg"></div>
                                <div class="hot-topic-masktxt"><span><p><{$item_hot.dataTitle|htmlspecialchars}></p><em class="icon-hottopic"></em></span></div>
                            </a>
                        </div>
                    </notempty>
                    <div class="topic-tag">
                        <a href="<{$item_hot.userInfoUrl}>" target="_blank"><em class="icon-lysy"><img src="<{$item_hot.facePicUrl}>" onerror="imgError(this, 'm')"></em><span><{$item_hot.nickname}></span></a>
                    </div>
                    <a href="<{$item_hot.id|topicDetailUrlGen}>" target="_blank"><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<{$item_hot.dataPic}>"></a>
                </div>
            </foreach>
        </div>
        <div class="index-title clearfix">
            <h2 class="joinus">加入圈子<span>Join Us</span></h2>
        </div>
        <ul class="joinus">
            <?php $m=1;?>
            <?php foreach($indexList['groupsJ'] as $item_join){ ?>
            <?php if( !empty($myGroupData) &&  in_array($item_join['group_id'],$myGroupData)  ){ ?>
            <li modelid="<?php echo $modelPage['hjrqz'].str_pad($m,4,'0',STR_PAD_LEFT); ?>" class="circle-list"
                data-node="gotoGroup"><a href="<{$item_join['group_id']|groupDetailUrlGen}>" target="_blank" title="<?=htmlspecialchars($item_join['cmsName'])?>"><img
                            src="<{$pcimgpath}>/images/public/img-error.png" data-original="<?=$item_join['cmsIcon']?>"><span
                            class="title"
                            title="mb_substr($item_join['cmsName'],0,10)"><?=mb_substr($item_join['cmsName'],0,10)?></span></a><a
                        href="javascript:void(0)" data-groupId="<?=$item_join['group_id']?>"
                        data-url="<{$item_join['group_id']|groupDetailUrlGen}>" class="join-btn join-suc"><em
                            class="iconn-41-2 hide"></em><span>已加入</span><em class="iconn-62"></em> </a></li>
            <?php }else{ ?>
            <li modelid="<?php echo $modelPage['hjrqz'].str_pad($m,4,'0',STR_PAD_LEFT); ?>" class="circle-list"
                data-node="joinGroup"><a href="<{$item_join['group_id']|groupDetailUrlGen}>" target="_blank" title="<?=htmlspecialchars($item_join['cmsName'])?>"><img
                            src="<{$pcimgpath}>/images/public/img-error.png" data-original="<?=$item_join['cmsIcon']?>"><span
                            class="title"
                            title="<?=mb_substr($item_join['cmsName'],0,10)?>"><?=mb_substr($item_join['cmsName'],0,10)?></span></a><a
                        href="javascript:void(0)" data-groupId="<?=$item_join['group_id']?>"
                        data-url="<{$item_join['group_id']|groupDetailUrlGen}>" class="join-btn"><em class="iconn-62 hide"></em>
                    <span>加入圈子</span> <em class="iconn-41-2"></em></a></li>
            <?php }?>
            <?php $m++;?>
            <?php }?>
        </ul>
        <div class="index-title clearfix" >
            <h2 class="mx-recommend">品质生活<span>Quality life</span></h2>
        </div>
        <div class="index-popular-list"  data-action="shareBlock">
            <ul class="clearfix">
                <?php $n=1;?>
                <volist name="commendList.commend" id="item_recom" key="k">
                    <li modelid="<?php echo $modelPage['hmxtj'].str_pad($n,4,'0',STR_PAD_LEFT); ?>" data-node="shareItem" data-id="<{$item_recom.tid}>" data-type="1" data-praise="false" data-count="<{$item_recom.voteNum}>">
                        <div class="mg-negative">
                            <div class="img"><a target="_blank" title="<{$item_recom.name|htmlspecialchars }>" href="<{$item_recom['tid']|topicDetailUrlGen}>" bp-data='{"event_id":"G000P001", "topic_id": "<{$item_recom['tid']}>", "group_id": "<{$item_recom['group_id']}>", "section": "<{$k}>"}'><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<{$item_recom.origin_img_url}>" alt='<?php echo htmlspecialchars($item_recom['name']) ?>' onerror="imgError(this, 'm')"></a></div>
                            <div class="img-box">
                                <volist name="item_recom.goods_ids" id="item_recom_list" key="list_key" offset="0" length='3'>
                                    <if condition="$item_recom_list.type eq 'video' ">
                                        <a target="_blank" title="<{$item_recom_list.name|htmlspecialchars}>" href="<{$item_recom['tid']|topicDetailUrlGen}>#topicvideo" bp-data='{"event_id":"G000P001", "topic_id": "<{$item_recom['tid']}>", "group_id": "<{$item_recom['group_id']}>", "section": "<{$k}>", "position": "video<{$list_key}>"}'>
                                            <img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<{$item_recom_list.image}>" alt="<{$item_recom_list.name}>" onerror="imgError(this, 'm')">
                                            <p class="hover"><em class="icon-play"></em></p>
                                        </a>
                                        <else />
                                        <a target="_blank" title="<{$item_recom_list.name|htmlspecialchars}>" href="<{$item_recom_list['shopId'],$item_recom_list['productId']|productDetailUrlGen}>" bp-data='{"event_id":"G000P001",  "product_id":"<{$item_recom_list['productId']}>", "shop_id": "<{$item_recom_list['shopId']}>", "section": "<{$k}>", "position": "product<{$list_key}>"}'>
                                            <img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<{$item_recom_list.image}>" alt="<{$item_recom_list.name}>" onerror="imgError(this, 'm')">
                                            <p class="hover">￥<span><{$item_recom_list.price}></span></p>
                                        </a>
                                    </if>
                                </volist>
                            </div>

                            <div class="text"><span class="tag"><{$item_recom.category_name}></span><a target="_blank" href="<{$item_recom['tid']|topicDetailUrlGen}>" class="list-title" data-node="shareUrl" title="<?php echo htmlspecialchars($item_recom['name'])?>" bp-data='{"event_id":"G000P001", "topic_id": "<{$item_recom['tid']}>", "group_id": "<{$item_recom['group_id']}>", "section": "<{$k}>"}'><{$item_recom.short_name}></a>
                                <p class="gray"><{$item_recom.description}></p>
                                <div class="text-icon">
                                    <a href="javascript:;" class="icon-collect"><em class="icon iconn-10"></em><{$item_recom.voteNum}></a>
                                    <a href="javascript:;" class="a-share"><em class="icon iconn-11"></em><span><{$item_recom.sumQuantity}></span></a>
                                </div>
                            </div>
                        </div>
                    </li>
                    <?php $n++;?>
                </volist>
            </ul>
        </div>
    </div>

    <div class="index-circle">
        <div class="index-title clearfix">
            <h2 class="circle-topic">圈子话题<span>Circle topic</span></h2><a target="_blank" title="圈子话题" href="<{$group_domain}>topic/publiser" bp-data='{"event_id": "B000P006"}' data-node="publishTopic">发布话题</a>
        </div>
        <div class="index-circle-list" data-action="shareBlock">
            <ul class="clearfix">
                <notempty name="topicList.topics" >
                    <?php $g=1;?>
                    <foreach name="topicList.topics" item="topic" key="key">
                        <li modelid="<?php echo $modelPage['hqzht'].str_pad($g,4,'0',STR_PAD_LEFT); ?>" data-id="<{$topic.tid}>" data-node="shareItem">
                            <div class="mg-negative">
                                <div class="topic-tag">
                                    <a target="_blank" href="<{$topic.group_id|groupDetailUrlGen}>" title="<{$topic.group_name|htmlspecialchars}>"><em class="icon-lysy"><img onerror="imgError(this, 'g')" src="<{$pcimgpath}>/images/public/img-error.png" data-original="<notempty name="topic.group_icon"><{$topic.group_icon}><else /><{$pccsspath}>/images/public/down-logo.png</notempty>"></em><{$topic.group_name}></a>
        </div>
        <div class="img">
            <a target="_blank" title=""<{$topic.name|htmlspecialchars}>" href="<{$topic.tid|topicDetailUrlGen}>" bp-data='{"event_id":"G000P002", "url": "<{$topic.group_href}>", "topic_id": "<{$topic.tid}>", "group_id": "<{$topic.group_id}>", "position": "<{$key+1}>"}'><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<{$topic.origin_img_url}>" alt="<{$topic.name}>"></a>
        </div>
        <div class="text"><a target="_blank" title="<{$topic.name|htmlspecialchars}>" href="<{$topic.tid|topicDetailUrlGen}>" data-node="shareUrl" class="list-title"><{$topic.name}></a>
            <div class="text-icon">
                <a  href="javascript:;" class="icon-collect"><em class="icon iconn-10"></em><{$topic.voteNum}></a>
                <a href="javascript:;" class="a-share"><em class="icon iconn-11"></em><span><{$topic.sumQuantity}></span></a>
            </div>
        </div>
    </div>
    </li>
    <?php $g++;?>
    </foreach>
    </notempty>
    </ul>
</div>
</div>
<div class="index-shop">
    <div class="index-title clearfix">
        <h2 class="gg-goods">逛逛商品<span>Go shopping</span></h2><a target="_blank" title="逛商城" href="<{$main_domain_gome}>" bp-data='{"event_id": "B000P007"}'>逛商城</a>
    </div>
    <div class="index-shop-list">
        <table>
            <tr>
                <td rowspan="2" num-tag='1'>

                    <a target="_blank" bp-data='{"event_id":"G000P003", "url": "<{$productGroup['goods']['goods'][0]['url']}>", "type": "文字链", "value": "<{$productGroup['goods']['goods']['0']['url']}>" ' href="<{$productGroup['goods']['goods']['0']['url']}>"><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<{$productGroup['goods']['goods'][0]['origin_img_url']}>" width="300" height="420"></a>

			  </td>
              <td rowspan="2" num-tag='2'>
                <div class="banner banner-s">
					<ul data-node="indexSmall">
						<?php foreach($productGroup['goods']['banner'] as $ber):?>
						<li><a target="_blank" bp-data='{"event_id":"G000P003", "url": "<?=$ber['origin_img_url']?>", "type": "banner", "value": "<?=$ber['origin_img_url']?>" ' href="<?=$ber['url']?>"><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<?=$ber['origin_img_url']?>" width="437" height="220"></a></li>
						<?php endforeach;?>
					</ul>
                </div>
              </td>
              <td num-tag='3'>
					 <a target="_blank"  bp-data='{"event_id":"G000P003", "url": "<{$productGroup['goods']['goods']['2']['url']}>", "type": "文字链", "value": "<{$productGroup['goods']['goods']['2']['url']}>" ' href="<{$productGroup['goods']['goods']['2']['url']}>"><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<{$productGroup['goods']['goods'][2]['origin_img_url']}>" width="230" height="210"></a>
			  </td>
              <td num-tag='4'>
			  		<a target="_blank"  bp-data='{"event_id":"G000P003", "url": "<{$productGroup['goods']['goods']['3']['url']}>", "type": "文字链", "value": "<{$productGroup['goods']['goods']['3']['url']}>" ' href="<{$productGroup['goods']['goods']['3']['url']}>"><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<{$productGroup['goods']['goods'][3]['origin_img_url']}>" width="230" height="210"></a>
			  </td>
            </tr>
            <tr>
              <td num-tag='5'>
					 <a target="_blank"   bp-data='{"event_id":"G000P003", "url": "<{$productGroup['goods']['goods']['4']['url']}>", "type": "文字链", "value": "<{$productGroup['goods']['goods']['4']['url']}>" ' href="<{$productGroup['goods']['goods']['4']['url']}>"><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<{$productGroup['goods']['goods'][4]['origin_img_url']}>" width="230" height="210"></a>

			  </td>
              <td num-tag='6'>
					<a target="_blank" bp-data='{"event_id":"G000P003", "url": "<{$productGroup['goods']['goods']['5']['url']}>", "type": "文字链", "value": "<{$productGroup['goods']['goods']['5']['url']}>"'  href="<{$productGroup['goods']['goods'][5]['url']}>"><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<{$productGroup['goods']['goods'][5]['origin_img_url']}>" width="230" height="210"></a>
			  </td>
            </tr>
            <tr>
              <td num-tag='7'>
                <div class="list-text">
                  <ul class="clearfix">
                  		<?php if( isset($productGroup['goods']['keyword']) ): ?>
						<?php foreach($productGroup['goods']['keyword'] as $kk=> $wd):?>
							<li><a target="_blank" bp-data='{"event_id":"G000P003", "url": "<?=$wd['url']?>", "type": "文字链", "value": "<?=$wd['url']?>"' href="<?=$wd['url']?>"  title="<?=$wd['keyword']?>"><?=$wd['keyword']?></a></li>
						<?php endforeach;?>
						<?php endif;?>
				  </ul>
                </div>
              </td>
              <td num-tag='8'>
                    <a target="_blank" bp-data='{"event_id":"G000P003", "url": "<{$productGroup['goods']['goods']['1']['url']}>", "type": "文字链", "value": "<{$productGroup['goods']['goods']['1']['url']}>"' href="<{$productGroup['goods']['goods'][1]['url']}>"><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<{$productGroup['goods']['goods'][1]['origin_img_url']}>" width="438" height="210"></a>

			  </td>
              <td num-tag='9'>
				    <a target="_blank" bp-data='{"event_id":"G000P003", "url": "<{$productGroup['goods']['goods']['6']['url']}>", "type": "文字链", "value": "<{$productGroup['goods']['goods']['6']['url']}>"' href="<{$productGroup['goods']['goods'][6]['url']}>"><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<{$productGroup['goods']['goods'][6]['origin_img_url']}>" width="230" height="210"></a>
			  </td>
              <td num-tag='10'>
					 <a target="_blank" bp-data='{"event_id":"G000P003", "url": "<{$productGroup['goods']['goods']['7']['url']}>", "type": "文字链", "value": "<{$productGroup['goods']['goods']['7']['url']}>"' href="<{$productGroup['goods']['goods'][7]['url']}>"><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<{$productGroup['goods']['goods'][7]['origin_img_url']}>" width="230" height="210"></a>
			  </td>
            </tr>
          </table>
        </div>
    </div>
    <div class="index-interest" data-node="interest">
        <div class="index-title clearfix">
          <h2 class="interest-circle">兴趣圈子<span>Interest circle</span></h2><a href="<{$group_domain}>" target="_blank" bp-data='{"event_id": "B000P008"}'>更多圈子</a>
        </div>
        <div modelid="<?php echo $modelPage['hxqqz']?>" class="index-interest-list" data-action="shareBlock">
          <ul class="clearfix">
            <foreach name="productGroup.groups" item="group" key="group_key">
            <if  condition="$group_key lt 7">
            <li <if condition="$group_key lt 1">class="first"</if> data-node="shareItem" >
	            <div class="mg-negative">
	              <div class="img"><a target="_blank" title="<{$group.name|htmlspecialchars}>" href="<{$group.tid|groupDetailUrlGen}>" bp-data='{"event_id": "G000P004", "group_id": "<{$group.tid}>"}'><img src="<{$pcimgpath}>/images/public/img-error.png" data-original="<{$group.origin_img_url}>" alt="<{$group.name}>" onerror="imgError(this, 'm')"></a></div>
	              <div class="text"><span class="tag"><{$group.category_name}></span><a target="_blank" href="<{$group.tid|groupDetailUrlGen}>" data-node="shareUrl" title="<{$group.name|htmlspecialchars}>"><{$group.short_name}></a>
	                <div class="text-icon">
	                	<span class="fl"><em>成员：</em><{$group.memberQuantity}></span><span class="fl"><em>话题：</em><{$group.topicQuantity}></span>
	                </div>
	              </div>
	            </div>
            </li>
            </if>
            </foreach>
          </ul>
        </div>
    </div>

</div>

<include file="Public:footer"/>
<?php
    $csspath = 'channelPage.css';
    $jspath = '/js/conf/channelPage.js';
?>
<include file="Public:mshop_header" />
<script>
  $GLOBAL_CONFIG['shopId'] = '<{$shopId}>';
</script>

<div class="content_box">
  <div class="banner_box clearfix">
    <notempty name="list.focusPhotoListTemplet">
    <div class="banner fl" data-node="banner" >
      <ul>
        <foreach name="list.focusPhotoListTemplet" item="val" >
          <li>
            <a href="<{$val['scheme']}>" target="_blank">
              <img   <notempty name="val.imageUrl">src="<{$val['imageUrl']}>"<else />src="<{$pcimgpath}>/images/meidian/loop-default.png"</notempty>   >
            </a>
          </li>
        </foreach>
      </ul>
      <?php if($list['focusPhotoListTempletCnt'] > 1){ ?>
      <ol class="has<{$list['focusPhotoListTempletCnt']}>">
        <?php for($i=0;$i< $list['focusPhotoListTempletCnt'];$i++){ ?>
        <li <?php if($i == 0){ ?> class="on" <?php } ?> ></li>
        <?php } ?>
      </ol>
      <?php } ?>
    </div>
    <else />
      <div class="banner fl" data-node="banner" >
          <ul>
                  <li>
                      <a href="javascript:void(0)" target="_blank">
                          <img   src="<{$pcimgpath}>/images/meidian/loop-default.png"  >
                      </a>
                  </li>
          </ul>

          <ol class="has1">
              <li class="on" ></li>
          </ol>

      </div>
    </notempty>

    <empty name="mshopInfo">
        <include file="Admin/out_mshopinfo" />
    <else />
        <include file="Admin/mshopinfo" />
    </empty>
    <?php if(!empty($list['goodsTemplet'])){ ?>
        <div class="theme_box recommend">
    <h1 class="clearfix">
      <span class="fl">好货推荐</span>
      <a class="fr" target="_blank" href="<{$meidian_domain}>admin/addItem">查看更多</a>
    </h1>
    <div class="recommend_box" data-node="recommend-box" >

      <?php if($list['goodsTempletCnt'] > 1 ){ ?>
          <a class="turn_left" href="javascript:;"></a>
          <a class="turn_right" href="javascript:;"></a>
      <?php } ?>
      <div class="recommend_list_box">
        <ul data-index="0">
          <foreach name="list.goodsTemplet" item="val" >
              <li>
                  <ul class="clearfix">
                      <foreach name="val" item="item" >
                          <li>
                            <div class="item_box clearfix">
                              <a href="<{$product_item_gome}><{$item['itemId']}>-<{$item['skuId']}>.html?stid=<{$item['trId']}>&mid=<{$shopId}>" target="_blank">
                                <img onerror="imgError(this, 'm')" class="fl" src="<{$item['mainImage']|getResizeImg=###,120,120}>">
                              </a>
                              <div class="fl">
                                <p>
                                    <if condition="$item['identification'] eq 'offline'">
                                        <span class="shop_tag ">门店</span>
                                    <else />
                                        <if condition="$item['shopFlag'] eq true">
                                            <span class="rival_tag">海外购</span>
                                        </if>
                                        <if condition="$item['productTag'] eq 1">
                                            <span class="main_tag">自营</span>
                                        </if>
                                    </if>
                                  <a target="_blank" href="<{$product_item_gome}><{$item['itemId']}>-<{$item['skuId']}>.html?stid=<{$item['trId']}>&mid=<{$shopId}>" title="<{$item['name']}>">
                                    <{$item['name']}>
                                  </a>
                                </p>
                                <div class="price_box clearfix"><span class="price">￥<{$item['price']|default='0.00'|convert_price=###}></span></div>
                                <div class="shelves clearfix">
                                  <span class="ret_box">
                                    <span class="yj">佣金</span>
                                    <span class="ret">最高￥<{$item['mostCommission']|default='0.00'|convert_price=###}></span>
                                  </span>
                                  <if condition="$item['onShelfStatus'] eq 1">
                                      <span class="already_sj fr" data-itemId="<{$item['itemId']}>" data-skuId="<{$item['skuId']}>" data-identification="<{$item['identification']}>" data-status="1" data-node="single_btn" >已上架</span>
                                  <else />
                                      <span class="sj fr" data-itemId="<{$item['itemId']}>" data-skuId="<{$item['skuId']}>" data-identification="<{$item['identification']}>" data-status="0"  data-node="single_btn" >上架</span>
                                  </if>
                                </div>
                              </div>
                            </div>
                          </li>
                      </foreach>
                  </ul>
              </li>
          </foreach>

        </ul>
      </div>
      <?php if($list['goodsTempletCnt'] > 1){ ?>
          <ol class="has<{$list['goodsTempletCnt']}>">
              <?php for($i=0;$i< $list['goodsTempletCnt'];$i++){ ?>
                  <li <?php if($i == 0){ ?> class="on" <?php } ?> ></li>
              <?php } ?>
          </ol>
      <?php } ?>
      <div class="sj_btn on" data-node="sj_btn">一键上架</div>
    </div>
  </div>
    <?php } ?>
    <notempty name="list['floorPhotoTemplet']">
        <div class="ad">
            <a href="<{$list['floorPhotoTemplet']['scheme']}>" target="_blank">
                <img src="<{$list['floorPhotoTemplet']['imageUrl']}>">
            </a>
        </div>
    </notempty>
  <notempty name="list['bigSmallTemplet']">
  <div class="star_street_box clearfix">
    <div class="street_box theme_box" data-node="starStreet-box">
      <notempty name="list['bigSmallTemplet_title']">
      <h1 class="clearfix">
        <span class="fl"><{$list['bigSmallTemplet_title']}></span>
      </h1>
      </notempty>
      <div class="clearfix star_img clearfix">
      <foreach name="list['bigSmallTemplet']" item="item" key="key">
        <a href="<{$item['scheme']}>" target="_blank">
        <img class="<if condition="$key lt 1">spebig <else />spesmall</if>" src="<{$item['imageUrl']}>">
        </a>
      </foreach>
      </div>
    </div>
  </div>
  </notempty>
  <notempty name="list['floorPhotoTemplet_4']">
  <div class="star_street_box clearfix">
    <div class="street_box theme_box" data-node="starStreet-box">
      <notempty name="list['floorPhotoTemplet_4_title']">
      <h1 class="clearfix">
        <span class="fl"><{$list['floorPhotoTemplet_4_title']}></span>
      </h1>
      </notempty>
      <div class="clearfix star_img clearfix">
        <foreach name="list['floorPhotoTemplet_4']" item="item" key="key">
          <a href="<{$item['scheme']}>" target="_blank">
              <img onerror="imgError(this, 'm')" src="<{$item['imageUrl']}>">
          </a>
        </foreach>

      </div>
    </div>
  </div>
  </notempty>
  <div class="rank_shop_box clearfix">
    <div class="ranking_box theme_box fl" data-node="ranking-box" >
    </div>
    <div class="shopest_box theme_box fl">
      <h1 class="clearfix"><span class="fl"><notempty name="list['dailyPhotosTemplet_title']"><{$list['dailyPhotosTemplet_title']}><else />最美美店</notempty></span></h1>
      <notempty name="list['dailyPhotosTemplet']">
        <div class="shopest_list">
            <ul class="clearfix">
              <foreach name="list.dailyPhotosTemplet" item="val" >
                <li>
                  <a target="_blank" href="<{$val['scheme']}>">
                    <img  src="<{$val['imageUrl']}>">
                    <div class="shopest_item_detail clearfix">
                      <a target="_blank" href="/shop-<{$val['shopId']}>.html"><img class="fl" src="<{$val['icon']}>" onerror="imgError(this, 'h')">
                      <div class="fl">
                        <em><a target="_blank" href="/shop-<{$val['shopId']}>.html"><{$val['name']}></a></em>
                        <img src="<{$pcimgpath}>/images/user/level/level<{$val['level']}>.png">
                        <p><i class="up"></i><em><{$val['likeQuantity']}></em><i class="star"></i><em><{$val['collectionQuantity']}></em></p>
                      </div>
                    </div>
                  </a>
                </li>
              </foreach>
            </ul>
        </div>
      <else />
      <div class="shopest_list no_data">
            <i class="refresh"></i><span >数据加载失败，请稍后重试</span>
      </div>
      </notempty>
    </div>
  </div>
  <div class="topic_box theme_box">
    <notempty name="list['selectTopicsTemplet_title']"><h1 class="clearfix"><span class="fl"><{$list['selectTopicsTemplet_title']}></span></h1></notempty>
    <div class="topic_content">
      <ul>
        <foreach name="list.selectTopicsTemplet" item="val" >
        <li>
          <a target="_blank" href="<{$val['detailScheme']}>">
            <div class="personal">
              <img onerror="imgError(this, 'h')" src="<{$val['facePicUrl']|getResizeImg=###,40,40}>" >
              <span><{$val['nickname']}></span>
            </div>
          </a>
          <a target="_blank" href="<{$val['detailScheme']}>">
            <h4><{$val['title']|msubstr=###,0,50}></h4>
            <p><{$val['content']|string_parse_face=###,22}></p>
            <notempty name="val['imgUrlList']">
                <div class="img_box">
                  <foreach name="val['imgUrlList']" item="item" >
                      <img onerror="imgError(this, 'm')" src="<{$item|getResizeImg=###,260,146}>">
                  </foreach>
                </div>
            </notempty>
          </a>
          <div class="topic_detail clearfix">
            <em class="fl">浏览量<{$val['topicViewNum']}></em>
            <strong class="fr">
              <span class="up"><{$val['topicLikeNum']}></span>
              <span class="dialog"><{$val['topicCommentNum']}></span>
              <span class="star"><{$val['topicLikeNum']}></span>
            </strong>
          </div>
        </li>
        </foreach>

      </ul>
    </div>
  </div>
</div>
<include file="Home@Public:footer" />
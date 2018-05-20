<?php
    $csspath = 'user-goods.css';
    $jspath = '/js/conf/userGoods.js';
?>
<include file="Public:mshop_header" />
    <div class="wrap-box">
        <notempty name="focusImg">
              <div class="slider">
                <ul class="clearfix" data-node="slider">
                    <foreach name="focusImg" item="val" >
                        <li>
                            <a href="<{$val['scheme']}>" target="_blank">
                                <img src="<{$val['imageUrl']}>">
                            </a>
                        </li>
                    </foreach>
                </ul>
              </div>
        </notempty>
      <div class="user-right  mart20">
        <div class="user-goods-tabBox clearfix <?php if(empty($focusImg)){ ?> top20 <?php }?>" data-node="tabBox">
          <div class="user-goods-tab clearfix">
              <empty name="isShop">
                  <a <if condition="$tab eq 0"> class="active" </if> href="/admin/addItem?type=0">精选</a>
              <else />
                  <a <if condition="$tab eq 1"> class="active" </if> href="/admin/addItem?type=1">门店</a>
              </empty>
              
              <a <if condition="$tab eq 3"> class="active" </if> href="/admin/addItem?type=3">销量</a>
              <a <if condition="$tab eq 2"> class="active" </if> href="/admin/addItem?type=2">佣金</a>
              <a <if condition="$tab eq 4"> class="active" </if> href="/admin/addItem?type=4">人气</a>
              
          </div>
          <div class="rapid">
            <a class="rapid-putaway" href="javascript:;" data-node="rapid-putaway">一键上架</a>
          </div>
        </div>
        <div class="user-goods-content">
          <ul class="user-goods-list clearfix J-goods-list" data-node="goodsList">
            <foreach name="itemList" item="item" >
                <li>
                  <div class="clearfix user-goods-good"><a href="<{$product_item_gome}><{$item['id']}>-<{$item['skuID']}>.html?stid=<{$item['trId']}>&mid=<{$shopId}>" target="_blank"><img src="<{$item['imageUrl']|getResizeImg=###,260,260}>"></a></div>
                  <div class="clearfix user-goods-goods">
                      <if condition="$item['flag'] eq 1">
                            <span class="user-goods-main">自营</span>
                      <elseif condition="$item['flag'] eq 2"/>
                            <span class="user-goods-rival">海外购</span>
                      <elseif condition="$item['flag'] eq 3"/>
                            <span class="user-goods-shop">门店</span>
                      </if>
                      <notempty name="item.trId">
                      <a href="<{$product_item_gome}><{$item['id']}>-<{$item['skuID']}>.html?stid=<{$item['trId']}>&mid=<{$shopId}>" target="_blank" title="<{$item['name']}>"><{$item['name']}></a>
                      <else />
                      <a href="<{$product_item_gome}><{$item['id']}>-<{$item['skuID']}>.html?mid=<{$shopId}>" target="_blank" title="<{$item['name']}>"><{$item['name']}></a>
                      </notempty>
                  </div>
                  <div class="user-goods-priceBox clearfix"><span class="user-goods-price">￥<{$item['price']}> </span></div>

                    <div class="user-goods-info clearfix">
                      <notempty name="item['commission']"><span class="user-goods-ret"><span>佣金</span>
                              <if condition="$tab eq 0">
                                  <span class="user-goods-rnum">最高￥<{$item['commission']}></span>
                              <else />
                                  <span class="user-goods-rnum">最高￥<{$item['commission']|convert_price=###}></span>
                              </if>
                          </span>
                      </notempty>
                  </div>
                  <div class="up-btn">
                     <if condition="$item['onShelf'] eq 1">
                        <a class="user-goods-down J-good-sold" href="javascript:;" data-node="good-sold" data-itemId="<{$item['id']}>" data-skuId="<{$item['skuID']}>" data-identification="<{$item['identification']}>" data-status="1"> 已上架</a>
                    <else />
                        <a class="user-goods-up J-good-sold" href="javascript:;" data-node="good-sold" data-itemId="<{$item['id']}>" data-skuId="<{$item['skuID']}>" data-identification="<{$item['identification']}>" data-status="0"> 上架</a>
                    </if>
                  </div>
                </li>
            </foreach>
          </ul>        
        </div>
            
            <if condition="$isMore eq 1">
                <a class="user-goods-getMore J-goods-getMore" href="javascript:;">
                    <span class="user-goods-moreLoding none">加载中...</span>
                    <span class="user-goods-moreLogo none" data-action="retry"><span class="user-goods-moreIcon">加载失败，点击重试</span></span>
                </a>
            <else />
                <a class="user-goods-getMore user-goods-normal J-goods-getMore" href="javascript:;">没有更多商品了</a>
            </if>                
      </div>
    </div>
<script>
    $GLOBAL_CONFIG['shopId'] = '<{$shopId}>';
    $GLOBAL_CONFIG['type'] = '<{$tab}>';
</script>                      
<include file="Home@Public:footer" />
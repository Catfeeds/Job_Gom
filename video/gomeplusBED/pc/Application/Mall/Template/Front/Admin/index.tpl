<?php
    $csspath = 'shopSetting.css';
    $jspath = '/js/conf/shopSetting.js';
?>
<include file="Public:mshop_header" />
    <div class="wrap-box clearfix">
      <include file="Front/Public/left_new" />
      <div class="user-right J-right-content">
          <div class="user-shopSetting-top clearfix" data-node="bigBg" data-or="<notempty name='shopInfo.vshopBgimageUrlPc'><{$shopInfo.vshopBgimageUrlPc|getResizeImg=###,1000, 200}><else /><{$pcimgpath}>/images/meidian/bg-big<{$shopInfo.backgroundIndex}>.png</notempty>" <notempty name="shopInfo.vshopBgimageUrlPc">style="background:url(<{$shopInfo.vshopBgimageUrlPc|getResizeImg=###,1000, 200}>) 50% 0 no-repeat"<else />style="background:url(<{$pcimgpath}>/images/meidian/bg-big<{$shopInfo.backgroundIndex}>.png) 50% 0 no-repeat"</notempty> >
          <div class="user-shopSetting-tLeft">
            <div class="user-shopSetting-faceBox">
                <img onerror="imgError(this)" src="<{$shopInfo['icon']|img_double_protocol=###|getResizeImg=###,120, 120}>" class="J-shopSetting-shopLogo">
            </div>
            <if condition="$shopInfo['isStaff'] eq 1">
                <div class="user-shopSetting-icon">&nbsp;</div>
            </if>
            <div class="user-shopSetting-editInfo"> <a href="/admin/setMshop">编辑资料</a></div>
          </div>
          <div class="user-shopSetting-center">
            <div class="user-shopSetting-name J-shopSetting-shopName"><{$shopInfo['name']}></div>
              <div class="user-shopSetting-info J-shopSetting-shopInfo"><p><notempty name="shopInfo.description"><{$shopInfo['description']|htmlspecialchars}><else />欢迎光临本店，祝您购物愉快。</notempty></p></div>
            <div class="user-shopSetting-levelBox clearfix">
              <div class="user-shopSetting-levelLeft">
                  <span >美店等级：</span>
                    <if condition="($shopInfo['mshopLevel']['score'] egt 0) AND ($shopInfo['mshopLevel']['score'] lt 50)">
                        <span class="user-shopSetting-icon"><img src="<{$pcimgpath}>/images/user/level/level1.png"></span>
                    <elseif condition="($shopInfo['mshopLevel']['score'] egt 50) AND ($shopInfo['mshopLevel']['score'] lt 200)"/>
                        <span class="user-shopSetting-icon"><img src="<{$pcimgpath}>/images/user/level/level2.png"></span>
                    <elseif condition="($shopInfo['mshopLevel']['score'] egt 200) AND ($shopInfo['mshopLevel']['score'] lt 900)"/>
                        <span class="user-shopSetting-icon"><img src="<{$pcimgpath}>/images/user/level/level3.png"></span>
                    <elseif condition="($shopInfo['mshopLevel']['score'] egt 900) AND ($shopInfo['mshopLevel']['score'] lt 1800)"/>
                        <span class="user-shopSetting-icon"><img src="<{$pcimgpath}>/images/user/level/level4.png"></span>
                    <elseif condition="($shopInfo['mshopLevel']['score'] egt 1800) AND ($shopInfo['mshopLevel']['score'] lt 3600)"/>
                        <span class="user-shopSetting-icon"><img src="<{$pcimgpath}>/images/user/level/level5.png"></span>
                    <elseif condition="($shopInfo['mshopLevel']['score'] egt 3600) AND ($shopInfo['mshopLevel']['score'] lt 5400)"/>
                        <span class="user-shopSetting-icon"><img src="<{$pcimgpath}>/images/user/level/level6.png"></span>
                    <elseif condition="($shopInfo['mshopLevel']['score'] egt 5400) AND ($shopInfo['mshopLevel']['score'] lt 7200)"/>
                        <span class="user-shopSetting-icon"><img src="<{$pcimgpath}>/images/user/level/level7.png"></span>
                    <elseif condition="($shopInfo['mshopLevel']['score'] egt 7200) AND ($shopInfo['mshopLevel']['score'] lt 9000)"/>
                        <span class="user-shopSetting-icon"><img src="<{$pcimgpath}>/images/user/level/level8.png"></span>
                    <elseif condition="($shopInfo['mshopLevel']['score'] egt 9000) AND ($shopInfo['mshopLevel']['score'] lt 11800)"/>
                        <span class="user-shopSetting-icon"><img src="<{$pcimgpath}>/images/user/level/level9.png"></span>
                    <elseif condition="$shopInfo['mshopLevel']['score'] egt 10800"/>
                        <span class="user-shopSetting-icon"><img src="<{$pcimgpath}>/images/user/level/level10.png"></span>
                    </if>
                  
                  <span class="user-shopSetting-line">
                      <span style="width:<{$shopInfo['mshopLevel']['degree']}>"></span>
                  </span>
                  <span><{$shopInfo['mshopLevel']['score']}>/<{$shopInfo['mshopLevel']['rightScore']}></span>
              </div>
                  <div class="user-shopSetting-levelRight"><span class="user-shopSetting-love"><{$shopInfo['like']['userQuantity']}></span><span class="user-shopSetting-collect"><{$shopInfo['shopCollectionQuantity']['quantity']}></span><a class="user-shopSetting-share  J-shopSetting-share" href="javascript:;" share-url="<{$mshop}>" data-url="<{$myshop}>"></a></div>
            </div>
          </div>
          <div class="user-shopSetting-right">
            <div class="clearfix alter-bg">
              <a class="user-shopSetting-editbak" href="javascript:;" data-node="bgBtn">修改背景</a>
              <a class="user-shopSetting-showshop" target="_blank" href="<{$myshop}>">预览美店</a>
              <div class="change-bg none" data-node="changeBg">
                <div class="icon-triangle"></div>
                <div class="change-box">
                  <ul class="default-bg clearfix" data-node="defaultBgBox">
                    <li <if condition="$shopInfo['vshopBgimageUrlPc'] eq '' && $shopInfo['backgroundIndex'] eq 1 "> class="selected"</if> data-node="defaultBg" data-src="<{$pcimgpath}>/images/meidian/bg-big1.png"><img src="<{$pcimgpath}>/images/meidian/bg-1.png"></li>
                    <li <if condition="$shopInfo['vshopBgimageUrlPc'] eq '' && $shopInfo['backgroundIndex'] eq 2 "> class="selected"</if> data-node="defaultBg" data-src="<{$pcimgpath}>/images/meidian/bg-big2.png"><img src="<{$pcimgpath}>/images/meidian/bg-2.png"></li>
                    <li <if condition="$shopInfo['vshopBgimageUrlPc'] eq '' && $shopInfo['backgroundIndex'] eq 3 "> class="selected"</if> data-node="defaultBg" data-src="<{$pcimgpath}>/images/meidian/bg-big3.png"><img src="<{$pcimgpath}>/images/meidian/bg-3.png"></li>
                    <li <if condition="$shopInfo['vshopBgimageUrlPc'] eq '' && $shopInfo['backgroundIndex'] eq 4 "> class="selected"</if> data-node="defaultBg" data-src="<{$pcimgpath}>/images/meidian/bg-big4.png"><img src="<{$pcimgpath}>/images/meidian/bg-4.png"></li>
                    <li <if condition="$shopInfo['vshopBgimageUrlPc'] eq '' && $shopInfo['backgroundIndex'] eq 5 "> class="selected"</if> data-node="defaultBg" data-src="<{$pcimgpath}>/images/meidian/bg-big5.png"><img src="<{$pcimgpath}>/images/meidian/bg-5.png"></li>
                    <li <if condition="$shopInfo['vshopBgimageUrlPc'] eq '' && $shopInfo['backgroundIndex'] eq 6 "> class="selected"</if> data-node="defaultBg" data-src="<{$pcimgpath}>/images/meidian/bg-big6.png"><img src="<{$pcimgpath}>/images/meidian/bg-6.png"></li>
                  </ul>
                  <div class="upload clearfix">
                    <div class="upload-btn" data-action="uploadBtn">+</div>
                    <div class="upload-txt" data-action="uploadBtn" data-node="uploadTxt">自定义上传</div>
                      <notempty name="shopInfo.vshopBgimageUrlPc">
                      <img class="previewImg"  src="<{$shopInfo.vshopBgimageUrlPc|getResizeImg=###,1000, 200}>" data-src="<{$shopInfo.vshopBgimageUrlPc}>" data-node="upImg">
                      <else />
                      <img class="previewImg none" src="<{$pcimgpath}>/images/meidian/lit-bg.png" data-node="upImg">
                      </notempty>
                  </div>
                  <div class="subBox clearfix">
                    <div class="cancel" data-node="cancel">取消</div>
                    <div class="complete" data-node="complete">完成</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="user-shopSetting-codewrap clearfix"><img src="<{$shopQrCode}>"></div>
            <div class="user-shopSetting-codeNotice">扫一扫 手机逛美店</div>
          </div>
        </div>
        <div class="user-shopSetting-content">
          <div class="clearfix user-shopSetting-listNotice" data-node="user-list" ><span>销售中商品数量：</span><span class="user-shopSetting-number J-shopSetting-number"><{$totalQuantity}></span><a class="user-shopSetting-addBtn"  href="/admin/addItem">+添加更多好货商品</a></div>
          <ul class="clearfix user-shopSetting-list J-shopSetting-list">
            <foreach name="itemList" item="item" >
                <li>
                    <div class="clearfix user-shopSetting-good"><a target="_blank" href="<{$product_item_gome}><{$item['itemId']}>-<{$item['skuId']}>.html?stid=<{$item['trId']}>&mid=<{$shopInfo['id']}>"><img src="<{$item['item']['mainImage']|getResizeImg=###,260,260}>" class="J-shopSetting-goodsImg"></a></div>
                  <div class="clearfix user-shopSetting-goods">
                      <if condition="$item['item']['flag'] eq 1">
                          <span class="user-shopSetting-main">自营</span>
                      <elseif condition="$item['item']['flag'] eq 2"/>
                          <span class="user-shopSetting-rival">海外购</span>
                      <elseif condition="$item['item']['flag'] eq 3"/>
                          <span class="user-shopSetting-shop">门店</span>
                      </if>
                      <a target="_blank" href="<{$product_item_gome}><{$item['itemId']}>-<{$item['skuId']}>.html?stid=<{$item['trId']}>&mid=<{$shopInfo['id']}>" class="J-shopSetting-goodName" title="<{$item['item']['name']}>"><{$item['item']['name']}></a>
                  </div>
                  <div class="user-shopSetting-priceBox clearfix">
                      <span class="user-shopSetting-price">￥<if condition="$item['item']['salePriceString'] egt 1000000"><{$item['item']['salePriceString']/100|formatNumber=###}><else /><{$item['item']['salePriceString']|convert_price=###}> </if></span>
                      <span class="user-shopSetting-ret"> <span>佣金</span><span class="user-shopSetting-rnum">最高￥<{$item['item']['mostCommission']|convert_price=###}></span></span>
                  </div>
                  <div class="user-shopSetting-gnotice"> 
                      <span>30日销量:<if condition="$item['item']['sales'] gt 9999">9999+<else /><{$item['item']['sales']}></if></span>
                      <span class="user-shopSetting-date">上架时间:<{$item['onShelfAt']|substr=0,10|date="Y.m.d",###}></span>
                  </div>
                  <div class="clearfix">
                      <a class="user-shopSetting-delBtn J-shopSetting-delBtn" href="javascript:;" data-itemId="<{$item['itemId']}>" data-skuId="<{$item['skuId']}>" data-identification="<{$item['identification']}>" data-status="1">下架</a>
                      <a class="user-shopSetting-grayBtn" href="javascript:;"> 
                          <span class="user-shopSetting-maxSize"><{$item['category']['name']}></span>
                      </a>
                      <a class="user-shopSetting-shareBtn J-shopSetting-shareBtn" href="javascript:;" share-url="<{$product_item_gome}><{$item['itemId']}>-<{$item['skuId']}>.html?stid=<{$item['trId']}>&mid=<{$shopInfo['id']}>"> 分享</a>
                  </div>
                </li>
            </foreach>
          </ul>
          <div class="user-shopSetting-bottom clearfix ">
            <if condition="$totalQuantity gt 0">
                <div class="J-shopSetting-page"></div>
            </if>
          </div>
        </div>
        <div class="share-down J-share-sWrap">
            <span class="user-shareBox">
                <em class="user-shareRole"></em>
                <u>分享给好友</u>
                <span class="user-shareIconBox">
                    <em class="icon-weixin J-share-weixin"></em>
                    <em class="icon-qq J-share-qq"></em>
                    <em class="icon-sina J-share-sina"></em>
                    <em class="icon-qzone J-share-qzone"></em>
                </span>
            </span>
        </div>
      </div>
    </div>
<script>
    $GLOBAL_CONFIG['shopId'] = '<{$shopInfo["id"]}>';
    $GLOBAL_CONFIG['totalPageQuantity'] = '<{$totalPageQuantity}>';
    $GLOBAL_CONFIG['shopDescription'] = '<{$shopInfo["description"]}>';
</script>                      
<include file="Home@Public:footer" />
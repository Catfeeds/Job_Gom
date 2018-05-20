<div class="shop_preview fr">
  <div class="show_preview_top clearfix">
      <a href="javascript:;" class="clearfix" data-node="kt-meidian">
        <img class="fl" onerror="imgError(this, 'h')" src="<{$mshop_icon|getResizeImg=###,100,100}>">
        <empty name="shopId">
            <div class="fl not_login">
              <em>开通美店，赚钱咯!</em>
              <span>快速开店，共享好货，赚丰厚佣金。</span>
            </div>
        <else />

            <div class="fl logined_noproduct">
              <p>
                <span><{$mshopInfo['shop']['name']}></span>
                <img src="<{$pcimgpath}>/images/user/level/level<{$mshopInfo['mshopLevel']['level']}>.png">
              </p>
              <div class="progress clearfix">
                <div class="progress_info fl">
                    <span class="pro_num" style="width:<{$mshopInfo['mshopLevel']['degree']}>"></span>
                </div>
                  <span class="num fl">
                      <{$mshopInfo['mshopLevel']['score']}>/<{$mshopInfo['mshopLevel']['rightScore']}>
                  </span>
              </div>
                <if condition="($mshopInfo['shop']['onshelfItemsQuantity'] eq 0)" >
                    <em>还没有商品上架，快去添加好货分享赚钱吧。</em>
                <else />
                    <notempty name="mshopInfo['shop']['mainCategoryNames']">
                        <div class="tag_box clearfix">
                            <foreach name="mshopInfo['shop']['mainCategoryNames']" item="val" >
                                <span><{$val|str_replace='、',' ',###}></span>
                            </foreach>
                        </div>
                    </notempty>
                </if>

            </div>
        </empty>
      </a>
    </div>

  <div class="preview_box">
      <a href="javascript:;" data-node="kt-meidian">
        <ul class="clearfix">
          <li class="sell"><i class="icon icon_sell"></i>
            <p>在售商品：<span><{$mshopInfo['shop']['onshelfItemsQuantity']|default="0"}></span></p>
          </li>
          <li class="income"><i class="icon icon_income"></i>
            <p>近7天收入：<span><{$mshopInfo['account']['last7DayIncome']|default="0"|convert_price=###}>(国美币)</span></p>
          </li>
          <li class="commission"><i class="icon icon_commission"></i>
            <p>待入账佣金：<span><{$mshopInfo['account']['incomeAmount']|default="0"|convert_price=###}>(国美币)</span></p>
          </li>
          <li class="total"><i class="icon icon_total"></i>
            <p>历史总额：<span><{$mshopInfo['account']['totalAmount']|default="0"|convert_price=###}>(国美币)</span></p>
          </li>
        </ul>
      </a>
  </div>
</div>
</div>
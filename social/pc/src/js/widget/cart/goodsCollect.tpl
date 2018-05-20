<h2 class="title">我的收藏</h2>
<div class="shop-list" data-node="sliderBox">
  <a href="javascript:;" data-action="sliderLeft" class="icon iconn-8 hide"></a>
  <a href="javascript:;" data-action="sliderRight" class="icon iconn-9 {{if length == 5}}hide{{/if}}"></a>
  <div class="shop-list-scroll">
    <ul class="clearfix" data-node="sliderList">
    {{each collections as v}}
      <li>
        <a title="{{v.item.name}}" href="{{mallDomain}}item/{{v.shopId}}-{{v.itemId}}.html?csid={{csid}}" target="_blank" rel="noopenner">
          <img onerror="imgError(this)" src="{{v.item.mainImage}}">
          <div class="text">￥<span>{{v.item.salePrice}}</span>
            <p>{{v.item.name}}</p>
          </div>
          <div class="btn-box">
            <a href="javascript:;" data-action="addCart" data-shopId="{{v.shopId}}" data-itemId="{{v.itemId}}" class="pc-btn pc-btnh40 pc-bj-fc8753">加入购物车</a>
          </div>
        </a>
      </li>
    {{/each}}
    </ul>
  </div>
</div>
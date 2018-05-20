<h2 class="title">为您推荐</h2>
<div class="shop-list" data-node="sliderBox">
  <a href="javascript:;" data-action="sliderLeft" class="icon iconn-8 hide"></a>
  <a href="javascript:;" data-action="sliderRight" class="icon iconn-9 {{if length == 5}}hide{{/if}}"></a>
  <div class="shop-list-scroll">
    <ul class="clearfix" data-node="sliderList">
    {{each items as v}}
      <li>
        <a title="{{v.name}}" href="{{mallDomain}}item/{{v.shopId}}-{{v.id}}.html?csid={{csid}}" target="_blank" rel="noopenner">
          <img onerror="imgError(this)" src="{{v.mainImage}}">
          <div class="text">￥<span>{{v.salePrice}}</span>
            <p>{{v.name}}</p>
          </div>
          <div class="btn-box">
            <a href="javascript:;" data-action="addCart" data-shopId="{{v.shopId}}" data-itemId="{{v.id}}" class="pc-btn pc-btnh40 pc-bj-fc8753">加入购物车</a>
          </div>
        </a>
      </li>
    {{/each}}
    </ul>
  </div>
  <div class="shop-list-tab" data-node="sliderTabDot"></div>
</div>
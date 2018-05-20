<div class="pop-shopcar" style="width: 480px;" data-node="quikAddBox">
  <em data-action="sliderLeft" class="icon icon-left hide">&#xe970;</em>
  <em data-action="sliderRight" class="icon icon-right {{if images.length == 1}}hide{{/if}}">&#xe98c;</em>
  <div class="pop-shopcar-scroll">
    <ul data-node="sliderList">
      {{each images as img}}
      <li><img onerror="imgError(this)" src="{{img}}"></li>
      {{/each}}
    </ul>
  </div>
  <div class="pop-shopcar-title">{{name}}</div>
  <div class="pop-shopcar-price" data-node="quikAddPrice">
    <p>价格：<span><em>￥</em>{{skus[0].salePrice}}</span></p>
    {{if skus[0].salePrice != skus[0].price}}
    <p class="del">原价：￥{{skus[0].price}}</p>
    {{/if}}
  </div>
  <div class="pop-shopcar-max" data-node="skusAttrs">
    {{each skusAttrs as v key}}
    <dl class="pop-shopcar-class clearfix">
      <dt>{{key}}：</dt>
      <dd>
        {{each v as vv}}
        <a href="javascript:;" data-val="{{vv}}" {{each skus[0].attributes as av}}
          {{if av.value === vv && av.name === key}}class="active"{{/if}}
        {{/each}}>{{vv | substrLen:10}}</a>
        {{/each}}
      </dd>
    </dl>
    {{/each}}
  </div>
</div>
{{each da as v idx}}
    {{if idx < 4}}
    <li data-node="goodsData" data-id="{{v.product_id}}"><!-- data-id="商品id" -->

		<div class="backgroundImg-lit" style="width:160px;height:160px">
            <a href="{{v._product_url}}" target="_blank">
			  <img data-original="{{v.cmsImage}}">
            </a>
		</div>

        <a class="item-s-f-a overflow-one" href="{{v._product_url}}" target="_blank" title="{{v.cmsName}}">
            {{v.cmsName}}
        </a>
        <p class="item-s-f-money" data-node="moneyBox">
            {{if v.mostRebate > 0}}
            <span class="item-b-o-rebate" data-node="returnMoney"> <i>返利</i></span>
            {{/if}}
            {{if v.salePrice}}<em>¥</em>{{/if}}
            <span class="item-b-o-price" data-node="goodsPrice">{{v.salePrice}}</span>
        </p>
    </li>
    {{/if}}
{{/each}}

{{each goods as good}}
<li>
	<a href="{{aSrc}}item/{{good.shopId}}-{{good.id}}.html?csid={{csid}}" target="_blank" class="img"><img src="{{strImg}}" alt=""  data-original="{{good.mainImage}}" onerror="imgError(this)" width="218" height="218" ></a>
	<div class="text">
		<a href="{{aSrc}}item/{{good.shopId}}-{{good.id}}.html?csid={{csid}}" title="{{good.name}}" target="_blank">
		{{if good.promotionMarks.itemProspectiveRebateAmount}}<span>返利</span>{{/if}}
		{{good.name}}
		</a>
		<div class="price"><span>￥{{good.salePrice/100}}</span>
		{{if good.discount}}
		<del>{{good.price/100}}</del>{{/if}}
		</div>
		
		<p>{{good.saleQuantity}}人付款</p>
	</div>
</li>
{{/each}}
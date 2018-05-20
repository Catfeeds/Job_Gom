<ul class="clearfix">
	{{each data}}
		<li>
			{{if $value.item.rebateFlag && $value.item.discountFlag}}
				<em class="icon-fan">返</em>
			{{else}}
			
				{{if $value.item.rebateFlag}}  
					<em class="icon-fan">返</em>
	            {{/if}} 
				{{if $value.item.discountFlag}}  
					<em class="icon-fan icon-jiang">降</em>
	            {{/if}} 
			{{/if}}
			<a href="{{domian}}item/{{shopId}}-{{$value.itemId}}.html?csid={{csid}}" bp-data="{'event_id':'G000P018', 'shop_id': '{{$value.item.shopId}}','product_id': '{{$value.itemId}}'}" target="_blank" >
				<img src="{{$value.item.mainImage}}" alt="{{$value.item.name}}"  onerror="imgError(this)">
			</a>
            <div class="text">￥<span>{{$value.item.salePrice}}</span>
                <p><a href="{{domian}}item/{{shopId}}-{{$value.itemId}}.html?csid={{csid}}" bp-data="{'event_id':'G000P018', 'shop_id': '{{$value.item.shopId}}','product_id': '{{$value.itemId}}'}" title="{{$value.item.name}}">{{$value.item.name}}</a></p>
            </div>
        </li>
	{{/each}}
</ul>
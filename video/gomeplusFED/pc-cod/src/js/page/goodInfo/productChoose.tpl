<ul class="clearfix" data-node="lastBanner">
	{{each data}}
	<li>
		<a target="_blank" href="{{domian}}item/{{$value.shopId}}-{{$value.id}}.html?csid={{csid}}" bp-data='{"event_id": "G000P019", "shop_id": "{{$value.shopId}}", "product_id": "{{$value.id}}"}'>
			<img src="{{$value.mainImage}}" alt="{{$value.name}}">
	  		<div class="text">￥<span>{{$value.salePrice}}</span>
	    		<p title="{{$value.name}}">{{$value.name}}</p>
	  		</div>
	  	</a>
	</li>
	{{/each}}
</ul>
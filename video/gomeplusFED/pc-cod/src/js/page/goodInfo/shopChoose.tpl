<ul class="clearfix">
	{{each data}}
	    <li>             
	        <a target="_blank" href="{{domian}}item/{{shopId}}-{{$value.itemId}}.html?csid={{csid}}" bp-data="{'event_id':'G000P018', 'shop_id': '{{$value.item.shopId}}','product_id': '{{$value.itemId}}'}">
	        	<img src="{{$value.item.mainImage}}" alt="{{$value.item.name}}">
	            <div class="text">￥<span>{{$value.item.salePrice}}</span>
	                <p title="{{$value.item.name}}">{{$value.item.name}}</p>
	              </div>
	        </a>
	    </li> 
	{{/each}}
</ul>
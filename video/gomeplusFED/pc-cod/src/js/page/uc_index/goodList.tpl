<ul class="clearfix" data-node="dataList" page="{{list.page}}">
{{each list as value}}
<li id="{{value.id}}">
    <div class="mg-negative">
    	<a href="{{list.mallDomain}}product/{{value.shopId}}-{{value.id}}.html" target="_blank"><img src="{{value.mainImage}}" onerror="imgError(this)"></a>	
		<div class="btn-box">
			<a href="{{list.mallDomain}}product/{{value.shopId}}-{{value.id}}.html" target="_blank" class="pc-btn pc-btnh40">立即购买</a>
			<a href="{{list.mallDomain}}product/{{value.shopId}}-{{value.id}}.html" target="_blank" class="pc-btn pc-btnh40 pc-bj-fc8753">加入购物车</a>
		</div>
		<div class="text">
		  <a href="{{list.mallDomain}}product/{{value.shopId}}-{{value.id}}.html" target="_blank">
			￥<span>{{value.salePrice}}</span>
			<p>{{value.name}}</p>
		  </a>
		</div>
	</div>  
</li>
{{/each}}
</ul>
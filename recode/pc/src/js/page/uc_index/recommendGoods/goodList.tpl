{{each list as value}}
<li modelid="{{value.modelId}}">
    <div class="mg-negative">
    	<a href="{{value.purl}}" target="_blank" title="{{value.pn}}"><img src="{{value.iurl}}" alt="{{value.pn}}" onerror="imgError(this)"></a>
		<div class="btn-box">
			<a href="{{value.purl}}" target="_blank" class="pc-btn pc-btnh40">立即购买</a>
			<a href="{{value.purl}}" target="_blank" class="pc-btn pc-btnh40 pc-bj-fc8753">加入购物车</a>
		</div>
		<div class="text">
		  <a href="{{value.purl}}" target="_blank">
			￥<span>{{value.price}}</span>
			<p>{{value.pn}}</p>
		  </a>
		</div>
	</div>
</li>
{{/each}}

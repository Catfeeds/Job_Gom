<div data-node="listItemBox">
	<div data-node="goodsItem" class="publish-item hover-dele">
		<em data-action="removeItem" data-pid="{{data.sku.item.id}}" data-actiontype="addGoods" class="icon"></em>
		<a href="{{data.url}}" target="_blank" class="img-out">
			<img src="{{data.sku.image}}">
		</a>
		<div class="publish-cont">
	  		<h3 class="pub-tl">
	  			<a href="{{data.url}}" target="_blank">{{data.sku.item.name}}</a>
	  		</h3>
	  		<div class="pub-row">
	  			<span class="red">￥</span><strong class="money-inf">{{data.sku.price}}</strong>
	  		</div>
	  		<a href="{{data.url}}" target="_blank" class="scan-more">查看详情</a>
		</div>
	</div>
	<textarea data-action="textBox" data-node="goodsDesc" data-info='{"type":"item","text":"","id":"{{data.sku.item.id}}","kid":"", "shopId": "{{data.shopId}}"}' placeholder="输入描述（选填，字数不限）" class="publish-input"></textarea>
</div>
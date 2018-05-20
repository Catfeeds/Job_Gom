<p><br/></p>
<div data-node="gmp-ebox" class="card-box" contenteditable="false">
	<div data-type="insertGoods" data-pid="{{data.sku.item.id}}" data-goodsinfo='{"PId":"{{data.sku.item.id}}","img":"{{data.sku.image}}","link":"{{data.url}}","price":"{{data.sku.price}}", "shopId": "{{data.shopId}}", "title":"{{data.sku.item.name}}"}' data-info='{"type":"item","text":"","id":"{{data.sku.item.id}}","kid":"", "shopId": "{{data.shopId}}"}'  class="publish-item">
		<a href="{{data.url}}" class="img-out">
			<img src="{{data.sku.image}}"  onerror="imgError(this)">
		</a>
		<div class="publish-cont">
	  		<h3 class="pub-tl">
	  			<a href="{{data.url}}">{{data.sku.item.name}}</a>
	  		</h3>
	  		<div class="pub-row">
	  			<span class="red">￥</span><strong class="money-inf">{{data.sku.price}}</strong>
	  		</div>
	  		<a href="{{data.url}}" target="_blank" class="scan-more">查看详情</a>
		</div>
	</div>
	<div class="cover">&nbsp;</div>
</div>
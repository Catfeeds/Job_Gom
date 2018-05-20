{{each changed as v i}}
<div data-node="listItemBox">
	<div data-node="goodsItem" class="publish-item hover-dele">
		<em data-action="removeItem" data-pid="{{v.PId}}" data-actiontype="addGoods" class="icon"></em>
		<a href="{{v.link}}" target="_blank" class="img-out">
			<img src="{{v.img}}">
		</a>
		<div class="publish-cont">
	  		<h3 class="pub-tl">
	  			<a href="{{v.link}}" target="_blank">{{v.title}}</a>
	  		</h3>
	  		<div class="pub-row">
	  			<span class="red">￥</span><strong class="money-inf">{{v.price}}</strong>
	  		</div>
	  		<a href="{{v.link}}" target="_blank" class="scan-more">查看详情</a>
		</div>
	</div>
	<textarea data-action="textBox" data-node="goodsDesc" data-info='{"type":"item","text":"","id":"{{v.PId}}","kid":"", "shopId": "{{v.shopId}}"}' placeholder="输入描述（选填，字数不限）" class="publish-input"></textarea>
</div>
{{/each}}
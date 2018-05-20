{{each list as v i}}
<p><br/></p>
<div data-node="gmp-ebox" class="card-box" contenteditable="false">
	<div data-type="insertGoods" data-pid="{{v.PId}}" data-info='{"type":"item","text":"","id":"{{v.PId}}","kid":"", "shopId": "{{v.shopId}}"}'  class="publish-item">
		<a href="javascript:void(0);" class="img-out">
			<img src="{{v.img}}">
		</a>
		<div class="publish-cont">
	  		<h3 class="pub-tl">
	  			<a href="javascript:void(0);">{{v.title}}</a>
	  		</h3>
	  		<div class="pub-row">
	  			<span class="red">￥</span><strong class="money-inf">{{v.price}}</strong>
	  		</div>
	  		<a href="{{v.link}}" target="_blank" class="scan-more">查看详情</a>
		</div></div><div class="cover">iii</div></div>
{{/each}}
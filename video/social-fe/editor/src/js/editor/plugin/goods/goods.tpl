{{each list as v i}}<p>&nbsp;<br></p><div data-node="gmp-ebox" class="card-box" contenteditable="false">
	<div 
		data-type="insertGoods" 
		data-skuId="{{v.skuId}}" 
		data-pid="{{v.PId}}" 
		data-info='{"type":"item","text":"","id":"{{v.PId}}","kid":"", "shopId": "{{v.shopId}}","skuId":"{{v.skuId}}"}' {{if v.shopTag}}
		data-rec-shoptag="1" 
		data-identification = "{{v.identification}}"
		{{/if}}		
		 class="publish-item">
		<a href="{{v.link}}" class="img-out">
			<img src="{{v.img}}" data-node="goodsPic">
		</a>
		<div class="publish-cont">
	  		<h3 class="pub-tl">
	  			<a href="{{v.link}}">{{v.title}}</a>
	  		</h3>
	  		<div class="pub-row">
	  			<span class="red">￥</span><strong class="money-inf">{{v.price}}</strong>
	  		</div>
	  		<!-- {{if v.rebate}}
	  		<div class="pub-row">
	  			<div class="fan">
	  				<em class="icon-fan"></em>
	  				<span>最高返{{v.rebate}}国美币</span>
	  			</div>
	  		</div>
	  		{{/if}} -->
	  		<a href="{{v.link}}" target="_blank" class="scan-more">查看详情</a>
		</div></div><div class="cover">&nbsp;</div></div>{{/each}}

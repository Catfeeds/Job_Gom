
{{each data}}
   	<li>
   		{{ if data[$index].isRebate && data[$index].isDiscount }}
   			<em class="icon-fan">返</em>
   		{{else}}

   			{{ if data[$index].isRebate  }}

   				<em class="icon-fan">返</em>
   			{{/if}}
   			<!-- {{ if data[$index].isDiscount  }}

               <em class="icon-fan icon-jiang">降</em>
            {{/if}} -->

   		{{/if}}
	    <div class="mg-negative">
	    	<a href="{{hostName}}{{data[$index].id}}-{{data[$index].skuId}}.html?mid={{shopId}}" target="_blank" title="{{data[$index].title}}">
	    		<img src={{data[$index].img}} alt="{{data[$index].title}}" onerror="imgError(this)">
	    	</a>
	      	<div class="btn-box">
	      		<a href="{{hostName}}{{data[$index].id}}-{{data[$index].skuId}}.html?mid={{shopId}}" target="_blank" class="pc-btn pc-btnh40">立即购买</a>
	      		<a href="{{hostName}}{{data[$index].id}}-{{data[$index].skuId}}.html?mid={{shopId}}" target="_blank" class="pc-btn pc-btnh40 pc-bj-fc8753">加入购物车</a>
	      </div>
	      <div class="text">￥<span>{{data[$index].price}}</span>
	        <p title="{{data[$index].title}}">
            <a target="_blank" href="{{hostName}}{{data[$index].id}}-{{data[$index].skuId}}.html?mid={{shopId}}">{{data[$index].title}}</a>
            </p>
	      </div>
	    </div>
  	</li>
{{/each}}

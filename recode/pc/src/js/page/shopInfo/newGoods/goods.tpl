{{each data as group}}
	<li>
      <a target="_blank" href="{{hostName}}{{group.id}}-{{group.skuId}}.html?mid={{shopId}}">
      {{ if group.isRebate && group.isDiscount }}
         <em class="icon-fan">返</em>
      {{else}}

         {{ if group.isRebate  }}

            <em class="icon-fan">返</em>
         {{/if}}

         <!-- {{ if group.isDiscount  }}
            <em class="icon-fan icon-jiang">降</em>
         {{/if}} -->

      {{/if}}
      <div class="mg-negative">
         <a href="{{hostName}}{{group.id}}-{{group.skuId}}.html?mid={{shopId}}" target="_blank"　title="{{group.title}}">
            <img src={{group.img}} alt="{{group.title}}"  onerror="imgError(this)">
         </a>
            <div class="btn-box">
               <a href="{{hostName}}{{group.id}}-{{group.skuId}}.html?mid={{shopId}}" target="_blank" class="pc-btn pc-btnh40">立即购买</a>
               <a href="{{hostName}}{{group.id}}-{{group.skuId}}.html?mid={{shopId}}" target="_blank" class="pc-btn pc-btnh40 pc-bj-fc8753">加入购物车</a>
         </div>
         <div class="text">￥<span>{{group.price}}</span>
           <p title="{{group.title}}">
            <a target="_blank" href="{{hostName}}{{group.id}}-{{group.skuId}}.html?mid={{shopId}}">{{group.title}}</a>
            </p>
         </div>
       </div>
  	</li>
{{/each}}


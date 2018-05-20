

{{if isMy}}
	{{each myTickets}}
		<li class=" bg-pink success">
			<em class="icon-quan">券</em>
			<p>￥<span>{{myTickets[$index].money}}</span></p>
			<p>满<strong>{{myTickets[$index].usageRule.minAmount}}</strong>元可用 限该店铺</p>
			<div class="quan-time">有效期：{{myTickets[$index].effectiveStartTime}}－{{myTickets[$index].effectiveEndTime}}</div>
			<a href="javascript:;" >领取成功</a>
		</li>
	{{/each}}
{{else}}
	{{each ticketList}}
		<li class=" bg-pink">
			<em class="icon-quan">券</em>
			<p>￥<span data-node="ticketMoney">{{ticketList[$index].money}}</span></p>
			<p>满<strong data-node="ticketMin">{{ticketList[$index].usageRule.minAmount}}</strong>元可用 限该店铺</p>
			<div class="quan-time">有效期：<span data-node="ticketStart">{{ticketList[$index].effectiveStartTime}}</span>－<span data-node="ticketEnd">{{ticketList[$index].effectiveEndTime}}</span></div>
			<a href="javascript:;" data-id={{ticketList[$index].batchSn}} data-action="getTicket">点击领取<em class="icon">&#xea57;</em></a>
			<div class="small-mask" data-action="getSuccess">领取成功</div>
		</li>
	{{/each}}
{{/if}}
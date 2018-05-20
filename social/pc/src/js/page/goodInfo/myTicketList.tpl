
{{each myTickets}}
	<li data-node="{{myTickets[$index].batchSn}}">
        <h4>{{shopName}}</h4>
        <p><span>{{myTickets[$index].batch.money}}</span>元
        
        <em style="display:{{myTickets[$index].show}}"><span data-node="mTicketNum">{{myTickets[$index].couponsQuantity}}</span>张</em>

        </p>
        <p>消费<strong>{{myTickets[$index].batch.usageRule.minAmount}}</strong>元可用</p>
        <div class="quan-time">有效期：<span data-node="mStart">{{myTickets[$index].validStartTime}}</span>—<span data-node="mEnd">{{myTickets[$index].validEndTime}}</span></div><em class="icon-quan"></em>
    </li>
{{/each}}
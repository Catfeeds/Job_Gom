{{each redPackList as v}}
<li class="padd-bon20">
  <div class="ticket-mn">￥<strong>{{v.money}}</strong></div>
  <div class="ticket-tip volume-margin8">
    <p>满{{v.baseMoney}}元可用</p><span>{{v.bTime}} - {{v.eTime}}</span>
  </div><a data-action="getTicket" data-ticketid="{{v.id}}" href="javascript:;" class="btn-ticket">领取</a>
</li>
{{/each}}
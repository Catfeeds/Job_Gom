{{ if redList.length > 0 }}
    {{each redList}}

        <li>
            <div class="ticket-mn">￥<strong>{{redList[$index].money}}</strong></div>
            <div class="ticket-tip">
                <p>满{{redList[$index].baseMoney}}元可用</p><span>{{redList[$index].redPackBegin}}-{{redList[$index].redPackEnd}}</span>
            </div><a href="javascript:;" class="btn-ticket" data-redId={{redList[$index].id}} data-action="getRed">领取</a>
        </li>

    {{/each}}
{{ /if }}
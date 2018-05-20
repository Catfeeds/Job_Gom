<ul>
    {{each list as item index}}
        <li data-id="{{item.id}}">
            <a href="{{item.landingPageUrl}}" target="_blank">
                <h3>
                    <strong title="{{item.title}}" class="fl">{{item.short_title}}</strong>
                    <span class="fr"><i class="icon icon-time"></i><span>
                    </span>{{item.createTime}}</span>
                </h3>
                <div>
                    <span title="{{item.description}}" href="http://www.atguat.com.cn/ga2">{{item.description}}</span>
                </div>
            </a>
        </li>
    {{/each}}
</ul>
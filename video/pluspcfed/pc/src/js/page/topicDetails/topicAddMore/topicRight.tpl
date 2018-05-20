<div class="topic-right topic-absolute" data-topicRT= {{id}}>
    <div class="topic-r-t" modelid="{{htqzxxmodule}}">
    <!--modelid="{{htqzxxmodule}}"-->
        {{#topicRT}}
    </div>
    <div class="topic-position" data-node="topic_xi">
        <div class="topic-r-b" data-node="hot_topics">
         <!--modelid="{{htrmhtmodule}}"-->
            <div class="clearfix topic-right-tab" data-node="topic-tab">
                <a href="javascript:;" class="{{if showTab}}active{{/if}}" data-index="0">热门话题</a>
                {{if showTab}}
                    <a href="javascript:;" data-index="1">话题推荐</a>
                {{/if}}
            </div>
            <ul data-node="topic-tab-list">
                {{#hotTopicUl}}
            </ul>
            {{if showTab}}
                <ul style="display:none;"  data-node="topic-tab-list">
                    {{each tabList as value index}}  
                    <li>
                        <a target="_blank" title="{{value.name}}" href="{{topicDomain}}{{value.id}}.html">
                            {{if value.picture}}
                                <img src="{{value.picture}}" alt="{{value.name}}" onerror="imgError(this, 'g')">
                            {{/if}}
                            <p>{{value.name}}</p>
                            <div class="text-icon">
                                <dfn>{{value.pageviewText}}</dfn>
                            </div>
                        </a>
                    </li>
                    {{/each}}  
                </ul>
            {{/if}}
        </div>
        <div class="next-page" data-node="next-page" data-get-next-topic ={{id}} style="display: none" modelid="{{htxyymodule}}">
            <p><span class="f12" data-node="times"></span>下一篇</p>
            <a></a>
        </div>
    </div>

</div>

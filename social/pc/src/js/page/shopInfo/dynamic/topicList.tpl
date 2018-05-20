{{each list as value}}
<li>
    <a href="{{list.groupDomain}}topic/{{value.topid}}.html" target="_blank">{{value.title}}</a>
    {{if value.text !== ""}}
       <p><a href="{{list.groupDomain}}topic/{{value.topid}}.html" target="_blank">{{#value.text | truncateByteLen:'238'}}</a></p>
    {{/if}}   
    {{if value.images.length !== 0}}
    <dl class="clearfix">
       {{each value.images as imgs i}}
       <dd>
           <a href="{{list.groupDomain}}topic/{{value.topid}}.html" target="_blank">
              <img src="{{imgs.url}}" alt="" onerror="imgError(this,'l')"> 
              {{if imgs.type !== "image"}} 
                  {{if imgs.type == "item"}}
                  <em class="icon icon-goods"></em>
                  {{else if imgs.type == "video"}}
                  <em class="icon icon-video"></em>
                  {{/if}}
              {{/if}}    
              {{if value.count > 3 && i == 2}}
                <em class="icon icon-num">{{value.count}}</em>
              {{/if}}      
           </a>
       </dd>
       {{/each}}
    </dl> 
    {{/if}}    
    <div class="clearfix">
        <div class="fl">
           <span class="m0">{{value.time}}</span>
           <span>来自圈子：</span>
           <a href="{{list.groupDomain}}circle/{{value.groupid}}.html" target="_blank">{{value.groupName}}</a>
           <span class="name">
            <a><img src="{{list.shopicon}}">{{list.shopname}}</a>
          </span>
        </div>
        <div class="fr">
           <span><em class="iconn-56"></em>{{value.likeQuantity}}</span>
           <span><em class="iconn-11"></em>{{value.replyQuantity}}</span>
           <span><em class="iconn-57"></em>{{value.topicCollectionQuantity}}</span>
        </div>
    </div>                       
</li>
{{/each}}

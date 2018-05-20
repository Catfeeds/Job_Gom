
<dl class="{{dlShowBorder }} ">
    <dt>
        <a href="{{UserId}}" target="_blank">
            {{if isExpert}} <em class="icon-daren"></em>{{/if}}
        <img src="{{userPic}}" onerror="imgError(this, 'g')">
        </a>
        
    </dt>
    <dd data-ddList="{{backTopicId}}">
        
        <div class="circle-comments-title"   data-topicType={{topicType}} data-htId={{backTopicId}}  data-tid={{topicId}}>        
            <a href="{{UserId}}" target="_blank">{{username}}</a>           
            <span>{{times}}</span>
            <a href="javascript:;" class="fr"  data-node="secondCom_Key" data-comId="{{backTopicId}}"  data-replayUser={{username}} data-publish="1">回复</a>  
        </div>
        <div class="first-comment">
            
             <p class="clearfix">{{#content}}</p>  
             
             
             {{if topicType=="1"}}
              <div class="reply-details merchant">
                  <div class="reply-picture">
                      <img src="{{itemsPic}}" onerror="imgError(this, 'g')">
                  </div>
                  <div class="reply-contxt">
                      <p>{{itemShopNameItem}}</p>
                      <p class="price-numb">￥<span>{{itemPrice}}</span></p>
                  </div>
                <a href="{{mall_domain}}item/{{itemShopId}}-{{shopId}}.html"  target="_blank" class="see-details pc-btn pc-btnw105 pc-btnh40" data-shopId={{shopId}} data-itemShopId={{itemShopId}} data-node="checkDetailMsg">查看详情</a>
              </div>  
             {{/if}}
             {{if topicType=="2"}}
             <div class="reply-details merchant">
               <div class="reply-picture"><img src="{{shopPic}}" onerror="imgError(this, 'g')"></div>
               <div class="reply-contxt">
                 <p> {{itemShopName}}
                     {{if redPackage}}
                     <span class="topic-label">优惠券</span>
                     {{/if}}
                 </p>
               </div>
               <a href="{{mall_domain}}shop-{{itemShopId}}.html" class="see-details pc-btn pc-btnw105 pc-btnh40"  data-shopId={{shopId}}  data-itemShopId={{itemShopId}} data-node="checkDetailMsg">进入店铺</a>
             </div>
             {{/if}}
              {{#imageStr}} 
        </div>
        
        <div class="comments-box {{showSecComm}}">
        {{if !isFirstCom}}
        {{each secondReply as value i}}
        <div class="comments-s"  data-topicType={{topicType}} data-htId={{backTopicId}}  data-tid={{topicId}}>
            <a href="{{value.SenUserId}}" target="_blank" data-replyUserId={{value.replyUserId}}>{{value.replyUserName}}</a>
            {{if value.replayToPub}}
            ：<span>回复</span>
            {{/if}}
            <a href="{{value.threeUserId}}" target="_blank" data-replyCommentId ={{value.replyCommentId}}>{{value.beReplyUserName}}:</a>
            <span data-replyCommentId={{value.replyCommentId}}>{{#value.content}}</span>

            <a href="javascript:;" class="hf-btn fr" data-getTopicId={{backTopicId}} data-node="secondCom_Key" data-replayUser={{value.replyUserName }} data-publish="0" data-comId="{{value.parentCommentId}}" data-replyCommentId ={{value.replyCommentId}} data-replyUserId={{value.replyUserId}} data-imId={{imId}}>回复</a>
        </div>
        {{/each}}
         {{/if}} 
        </div>
       
      
    </dd>
</dl>

{{if !isFirstCom}}
    {{if showMall}}
<a href="javascript:;" class="comments-more"  data-node="showMoreList" data-groupId={{groupId}} data-imId={{imId}} data-topicType={{topicType}} data-htId={{backTopicId}}  data-tid={{topicId}} data-tootlePages={{replyCommentNum}} data-currentPage= {{currentPage}}  data-pageSize={{pageSize}}>查看回复...</a>

    {{/if}}
{{/if}}


<a class="pack-up" style="display: none" data-node="hideComBox" data-parentTopicIdBtn={{backTopicId}}>收起</a>
<div class="text-field-box  clearfix secondText margin-width" style="display: none" data-parentTopicId={{backTopicId}}>
    <div class="topic-user-head">
        {{if userIsExpert}} <em class="icon-daren"></em>{{/if}}
         <img src="{{currUserImg}}" onerror="imgError(this, 'g')">
    </div>
    <div class="topic-publish-content">
        <textarea placeholder="说点什么吧…" class="textarea-bx secondT" data-node="textarea-bx"></textarea>
        <div class="publish-face-bx">
            <p class="icon-face" data-node="smilies_Face"><em class="iconn-27"></em> 表情</p>
            <a href="javascript:;" class="pc-btn pc-btnh30 pc-btnw105" data-node="a_secondComBtn" data-getTopicId={{backTopicId}}>发布</a>
        </div>
    </div>
</div>






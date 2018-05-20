<div class="comments-s"   data-topicType={{topicType}} data-htId={{backTopicId}}  data-tid={{topicId}}>
    <a href="{{SenUserId}}" target="_blank" data-replyUserId="{{replyUserId}}">{{replyUserName}}</a>
        {{if replayToPub}}
        	
        ：<span>回复</span>
        <a href="{{threeUserId}}" target="_blank" data-replyCommentId ="{{replyCommentId}}">{{beReplyUserName}}</a> 
       		
        {{/if}}
        <span data-replyCommentId={{replyCommentId}}>：{{#content}}</span>

        <a href="javascript:;" class="fr" data-node="secondCom_Key"  data-getTopicId={{backTopicId}} data-replayUser={{replyUserName}} data-publish="0" data-comId="{{parentCommentId}}" data-replyCommentId="{{replyCommentId}}" data-imId="{{imId}}" data-replyUserId={{replyUserId}} >回复</a>
     
</div>

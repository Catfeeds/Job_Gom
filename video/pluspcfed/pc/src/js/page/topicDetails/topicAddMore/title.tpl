<div class="bjfff" data-node="tiles" data-title ={{id}}  modelid="{{htxqmodule}}">
	{{if coverPic}}
	<div class="topic-cover"><img src={{coverPic}}></div>
	{{/if}}
    <div class="topic-title0">
        <h1>
            {{if isUpper}}<em class="set-top" data-node="topic-top">置顶</em> {{/if}}
            {{if isEssence}}<em class="set-spark" data-node="topic-high">精品</em> {{/if}}
            {{if style}}<em class="set-access">专访</em> {{/if}}
            <span data-node="topic-title">{{#topicName}}</span>
        </h1>
        <p class="topic-source" data-node="likewrap">
            {{if isMeihao}}
                <span class="fl source-title" >
                   <img onerror="imgError(this, 'h')" src={{facePicUrl}} alt="">{{nickName}}
                </span >                
                <span class="fl icon-meihao">{{iconMeihao}}</span>
            {{else}}
                <a class="fl source-title" href="{{UserId}}"  target="_blank">
                    <img onerror="imgError(this, 'h')" src={{facePicUrl}} alt="">{{nickName}}
                </a> 
                {{if isExpertSign}}            
                    <span class="fl icon-expert">{{iconExpert}}</span>
                {{/if}}                
            {{/if}}
            <span class="fl">{{lastReplyTime}}</span>
            <span class="fr">
                <!--9c2--><em class="icon-discuss"></em>
                <span class="topic-count" data-node="topic-allNum">{{allNum}}</span>
            </span>

            <span class="fr">
                <!--9c2--><em class="icon-like"></em>
                <span class="topic-count" data-node="topiclinke">{{userQuantity}}</span>
            </span>
            <!--
                点赞数
            -->

            </a>
        </p>
    </div>
    <div class="topic-conter" data-conter-ul ={{id}} >
        <ul class="source-lef-list" data-node="ulFloat" data-surl="{{extImagesLst}}" data-spic="{{extSpic}}" data-stitle="{{extStitle}}" data-content="{{share_text}}"  >
        <!--modelid="{{jctjmodule}}"-->
            <li modelid="{{jctjmodule}}0001"><a href="javascript:void(0)" data-node="wx"><em class="icon-weixin"></em><span>微信</span></a></li>
            <li modelid="{{jctjmodule}}0002"><a href="javascript:void(0)" data-node="wb"><em class="icon-weibo"></em><span>微博</span></a></li>
            <li modelid="{{jctjmodule}}0003"><a href="javascript:void(0)" data-node="qq"><em class="icon-qq"></em><span>QQ</span></a></li>
            <li modelid="{{jctjmodule}}0004"><a href="javascript:void(0)" data-node="qzone"><em class="icon-qzone"></em><span>QQ空间</span></a></li>
            <li modelid="{{jctjmodule}}0005">
                <a href="javascript:void(0)" data-id="{{id}}" data-node="praiseClick" data-type="1" data-praise="{{dataParise}}" class="{{isLike}}">
                <em class="icon-like-big {{isLike}} "></em><span>{{isLikeName}}</span></a></li>
            <li modelid="{{jctjmodule}}0006">
                <a href="javascript:void(0)" data-node="collect" data-status="{{userCollectionStatu}}" class="{{userCollection}}">
                <em class="icon-collect-big {{userCollection}}" ></em><span>{{userCollectionName}}</span></a></li>
            <li modelid="{{jctjmodule}}0007"><a data-action="goComment" href="javascript:;"><em class="icon-discuss-big"></em><span>评论</span></a></li>
            {{if mshopFlag == 1}}
            <li><a href={{mshopUrl}} target="_blank"><em class="icon-meidian-big"></em><span>美店</span></a></li>
            {{/if}}
        </ul>
        <div class="source-right-box">
            {{#html}}
        </div>
    </div>

    <div class="topic-operate">
        {{if isGroupOwn}}
            {{if isUpper}}
                <a data-node="userTopic-topHigh" href="javascript:;" title="取消置顶" data-ac="0" data-type="0">取消置顶</a>
            {{else}} 
                <a data-node="userTopic-topHigh" href="javascript:;" title="置顶" data-ac="0" data-type="1">置顶</a>
            {{/if}}
            <em class="line"></em>
            {{if isEssence}}
                <a data-node="userTopic-topHigh" href="javascript:;" title="取消加精" data-ac="1" data-type="0" >取消加精</a>
            {{else}}
                <a data-node="userTopic-topHigh" href="javascript:;" title="加精" data-ac="1" data-type="1" >加精</a>
            {{/if}}
            <em class="line"></em>
        {{/if}}
        {{if showReport}}
            <a data-action="topic-report" href="javascript:;" title="举报该话题">举报</a>
        {{/if}}
        {{if is_del && showReport}}
            <em class="line"></em>
        {{/if}}
    	{{if is_del}}
    		<a data-node="userTopic-del" href="javascript:;" title="删除该话题">删除</a>
    	{{/if}}
    </div>
</div>

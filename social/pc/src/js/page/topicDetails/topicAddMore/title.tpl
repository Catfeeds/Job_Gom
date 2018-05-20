<div class="bjfff" data-node="tiles" data-title ={{id}} >
    <div class="topic-title0">
        <h1>
            {{if isUpper}}<em class="set-top">置顶</em> {{/if}}
            {{if isEssence}}<em class="set-spark">精品</em> {{/if}}
            {{if style}}<em class="set-access">专访</em> {{/if}}
            {{#topicName}}
        </h1>
        <p class="topic-source" data-node="likewrap">
            <a href="{{UserId}}"  target="_blank">
                <img onerror="imgError(this, 'h')" src={{facePicUrl}} alt="">{{nickName}}
            </a>
            <span>来自圈子：</span>
            <a href={{extGroupUrl}} target="_blank">{{groupCircleName}}</a>

            <span>{{lastReplyTime}}</span>
            <span class="fr">
                <!--9c2--><em class="iconn-11"></em>
                <span class="topic-count">{{allNum}}</span>
            </span>

            <span class="fr">
                <!--9c2--><em class="iconn-10"></em>
                <span class="topic-count">{{userQuantity}}</span>
            </span>
            <!--
                点赞数
            -->

            </a>
        </p>
    </div>
    <div class="topic-conter" data-conter-ul ={{id}} >
        <ul class="source-lef-list" data-node="ulFloat" data-surl="{{extImagesLst}}" data-spic="{{extSpic}}" data-stitle="{{extStitle}}" data-content="{{share_text}}">
            <li><a href="javascript:void(0)" data-node="wx"><em class="iconn-30"></em><span>微信</span></a></li>
            <li><a href="javascript:void(0)" data-node="wb"><em class="iconn-31"></em><span>微博</span></a></li>
            <li><a href="javascript:void(0)" data-node="qq"><em class="iconn-32"></em><span>QQ</span></a></li>
            <li><a href="javascript:void(0)" data-node="qzone"><em class="iconn-33"></em><span>QQ空间</span></a></li>
            <li>
                <a href="javascript:void(0)" data-id="{{id}}" data-node="praiseClick" data-type="1" data-praise="{{dataParise}}" class="{{isLike}}">
                <em class="iconn-34 {{isLike}} "></em><span>{{isLikeName}}</span></a></li>
            <li>
                <a href="javascript:void(0)" data-node="collect" data-status="{{userCollectionStatu}}" class="{{userCollection}}">
                <em class="iconn-57 {{userCollection}}" ></em><span>{{userCollectionName}}</span></a></li>
            <li><a data-action="goComment" href="javascript:;"><em class="iconn-36"></em><span>评论</span></a></li>
        </ul>
        <div class="source-rig-box">
                {{#html}}
		</div>
    </div>
</div>

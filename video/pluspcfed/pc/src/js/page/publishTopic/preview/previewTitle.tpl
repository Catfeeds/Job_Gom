<h1>
    {{topicName}}
</h1>
<p class="preview-source" data-node="likewrap">
    {{ if !channelName}}

    <a href="{{UserUrl}}"  target="_blank">
        <img onerror="imgError(this, 'h')" src={{facePicUrl}} alt="">{{nickName}}
    </a>

    {{else}}

    <a href="{{UserUrl}}"  target="_blank">
        <img onerror="imgError(this, 'h')" src={{facePicUrl}} alt="">{{nickName}}
    </a>
    
    {{/if}}

    <span>{{nowTime}}</span>
    <!-- <span class="fr">
        9c2<em class="iconn-11"></em>
        <span class="topic-count">0</span>
    </span>
    <span class="fr">
        9c2<em class="iconn-10"></em>
        <span class="topic-count">0</span>
    </span> -->
    <!--
        点赞数
    -->
    </a>
</p>

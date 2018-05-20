<?php
    $csspath = 'released.css';
    $jspath = '/js/conf/talent_released.js';
?>
<include file="Platform/expert_header" />
<div class="talent clearfix">
    <include file="Platform/expert_left" />
    <div class="released">
        <div class="released-cont">
            <div class="released-title">已发话题</div>
            <notempty name="topicList.topics">
            <ul class="released-list" data-node="releasedList">
                <li class="list-top clearfix">
                    <div class="list-title">标题</div>
                    <div class="list-time">发布时间</div>
                    <div class="list-time">修改时间</div>
                    <div class="list-operate">操作</div>
                </li>
                <foreach name="topicList.topics" item="list">
                <li class="list-li clearfix" data-groupId="<{$list['groupId']}>" data-topicId="<{$list['id']}>" data-node="topicItem">
                    <div class="list-title"> <a href="<{$list['id']|topicDetailUrlGen}>" target="_blank"><{$list['name']}></a></div>
                    <div class="list-time">
                        <div class="time-day"><{$list['createTime']|substr=###,0,10|date="Y-m-d",###}></div>
                        <div class="time-second"><{$list['createTime']|substr=###,0,10|date="H:i",###}></div>
                    </div>
                    <div class="list-time">
                        <div class="time-day"><{$list['updateTime']|substr=###,0,10|date="Y-m-d",###}></div>
                        <div class="time-second"><{$list['updateTime']|substr=###,0,10|date="H:i",###}></div>
                    </div>
                    <div class="list-operate">
                        <div><a href="javascript:void(0);" data-src="/expert/publish?tid=<{$list['id']}>&from=1" target="_blank" data-node="editorTopic">编辑</a></div>
                        <div><a href="javascript:void(0);" data-action="delTopic">删除</a></div>
                        <div class="operate"><a class="operate-check" href="javascritp:;">查看数据
                                <div class="check-hover">                                           <span class="hover-browse"><em class="browse">浏览量</em>
                        <p class="browse-count"><{$list['pageview']|default=0|formatNum}></p></span><span class="hover-share clearfix"><em class="share">分享</em>
                        <p class="share-count"><{$list['topicShareQuantity']|default=0|formatNum}></p></span><span class="hover-praise clearfix"><em class="praise">点赞</em>
                        <p class="praise-count"><{$list['like']['userQuantity']|default=0|formatNum}></p></span><span class="hover-discusse clearfix"><em class="discusse">评论</em>
                        <p class="discuss-count"><{$list['replyQuantity']+$list['subReplyQuantity']|formatNum}></p></span><span class="hover-collect clearfix"><em class="collect">收藏</em>
                        <p class="collect-count"><{$list['topicCollectionQuantity']|default=0|formatNum}></p></span></div></a></div>
                    </div>
                </li>
                </foreach>
            </ul>
            <div class="page-btn"><{$topicList['linkUrl']}></div>
            <else/>
            <ul class="released-list" data-node="noTopic">
                <li class="list-li">
                    <p class="no-topic">你还没相关话题哦，赶紧“<a href="/expert/publish" target="_blank">发布话题</a><span>”吧</span></p>
                </li>
            </ul>
            </notempty>
        </div>
    </div>
</div>
<include file="Platform/expert_footer" />